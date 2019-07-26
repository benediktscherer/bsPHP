///<reference path='../typings/references.ts' />

class Topic {

    private static readonly MAX_LAST_MESSAGES = 10;

    private _instanceId: string;
    private _name: string;
    private _subscribers: Subscriber[] = [];
    private _messages: Message[] = [];

    constructor(name) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get subscribers(): Subscriber[] {
        return this._subscribers;
    }

    set instanceId(instanceId: string) {
        this._instanceId = instanceId;
    }

    get instanceId(): string {
        return this._instanceId;
    }

    public getHistory() {
        return this._messages;
    }

    private addMessage(data?: any) {
        const message: Message = {
            id: StringUtils.uuid(),
            data: data,
            sendAt: new Date().getTime()
        };

        this._messages.push(message);

        if (this._messages.length > Topic.MAX_LAST_MESSAGES) {
            this._messages.splice(this._messages.length - 1, 1);
        }
    }

    private send(data) {
        this._subscribers.forEach(s => {
            setTimeout(() => {
                this.addMessage(data);
            }, 0);

            s.callback.apply(this, data);
        });
    }

    private deliver(sync, ... data: any[]) {
        if (sync) {
            this.send(data);
        } else {
            setTimeout(() => {
                this.send(data);
            }, 0);
        }
    }

    public subscribe(cb: Function): string {
        const id = StringUtils.uuid();

        this._subscribers.push({
            id: id,
            callback: cb
        });

        return id;
    }

    public unsubscribe(id: string): boolean {
        const subscriberIdx: number = _.findIndex(this.subscribers, s => s.id === id);

        if (subscriberIdx === -1) {
            return false;
        }

        this.subscribers.splice(subscriberIdx, 1);

        return true;
    }

    public publish(... data: any[]): void {
        this.deliver(false, ... data);
    }

    public publishSync(... data: any[]): void {
        this.deliver(true, ... data);
    }

    public clearSubscribers(): void {
        this._subscribers = [];
    }
}
