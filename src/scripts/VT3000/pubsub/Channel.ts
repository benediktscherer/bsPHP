///<reference path='../typings/references.ts' />

class Channel {

    private tokens: ChannelSubscription[] = [];
    private topics: Topic[] = [];
    private globSubscribers: { [s: string]: Function[] } = {};

    public name: string = "#global";

    constructor(name: string) {
        if (!name.startsWith("#")) {
            name = "#" + name;
        }

        this.name = name;
    }

    /**
     *
     * @param name
     * @returns {boolean}
     */
    public hasTopic(name: string): boolean {
        return this.topics.some(t => t.name === name);
    }

    /**
     *
     * @param name
     */
    public joinAs(name: string): ChannelSubscription {
        const subscription: ChannelSubscription = new ChannelSubscription(name, this);

        this.tokens.push(subscription);

        if (Route.getUrlParam('log') || Route.getUrlParam('pubsub')) {
            console.log(`%c [PubSub] ${this.name} ${name} joined the channel`, 'background: #222; color: #52bad5');
        }

        return subscription;
    }

    /**
     *
     * @param token
     */
    public leave(token: string) {
        //TODO
    }

    /**
     *
     * @param name
     */
    public getTopic(name: string): Topic | null {
        const topics = this.getTopics(name);

        if (topics.length === 0) {
            return null;
        }

        return topics[0];
    }

    /**
     *
     * @param pattern
     */
    public getTopics(pattern: string): Topic[] {
        return this.topics.filter((t) => {
            return StringUtils.glob(t.name, pattern);
        });
    }

    /**
     *
     * @param name
     */
    public createTopic(name: string): Topic | null {
        if (this.hasTopic(name)) {
            return null;
        }

        let topic = new Topic(name);
        topic.instanceId = StringUtils.uuid();

        this.addTopic(topic);

        return topic;
    }

    /**
     *
     * @param topic
     */
    public addTopic(topic: Topic): void {
        if (this.hasTopic(topic.name)) {
            return;
        }

        this.topics.push(topic);

        Object.keys(this.globSubscribers).forEach((pattern: string) => {
            const callbacks = this.globSubscribers[pattern];
            if (StringUtils.glob(topic.name, pattern)) {
                callbacks.forEach((cb) => {
                    topic.subscribe(cb);
                });
            }
        });
    }

    /**
     *
     * @param pattern
     * @returns {boolean}
     */
    public isGlobSubscriber(pattern: string) {
        if (Assert.isUndefinedNullOrEmpty(pattern)) {
            return false;
        }

        return pattern.indexOf("*") > -1;
    }

    /**
     *
     * @param pattern
     * @param cb
     */
    public addGlobSubscriber(pattern: string, cb: Function) {
        if (!this.globSubscribers[pattern]) {
            this.globSubscribers[pattern] = [];
        }

        this.globSubscribers[pattern].push(cb);
    }
}
