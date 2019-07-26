///<reference path='../typings/references.ts' />

class ChannelSubscription {
    private name: string;
    private channel: Channel;

    constructor(name: string, channel: Channel) {
        this.name = name;
        this.channel = channel;
    }

    /**
     *
     * @param pattern
     * @param cb
     */
    public on(pattern: string, cb: Function): Map<String, String> {
        if (this.channel.isGlobSubscriber(pattern)) {
            this.channel.addGlobSubscriber(pattern, cb);
        } else {
            if (!this.channel.hasTopic(pattern)) {
                this.channel.createTopic(pattern);
            }
        }

        let subscriptionIds: Map<String, String> = {};
        this.channel.getTopics(pattern).forEach((t) => {
            subscriptionIds[t.name] = t.subscribe(cb);
        });

        return subscriptionIds;
    }


    /**
     *
     * @param pattern
     * @param subscriptionId
     */
    public unsubscribe(pattern: string, subscriptionId: string): void {
        if (!this.channel.hasTopic(pattern)) {
            return;
        }

        this.channel.getTopics(pattern).forEach((t) => {
            t.unsubscribe(subscriptionId);
        });
    }


    /**
     *
     * @param topicName
     * @param data
     */
    public send(topicName: string, ...data: any[]): void {
        this.deliver(false, topicName, ...data);
    }

    /**
     *
     * @param topicName
     * @param data
     */
    public sendSync(topicName: string, ...data: any[]): void {
        this.deliver(true, topicName, ...data);
    }

    /**
     *
     * @param deliverSync
     * @param topicName
     * @param data
     */
    private deliver(deliverSync: boolean, topicName: string, ...data: any[]): void {
        let topic: Topic | null = this.channel.getTopic(topicName);

        if (Assert.isUndefinedNullOrEmpty(topic)) {
            topic = this.channel.createTopic(topicName);
        }

        if (Route.getUrlParam('log') || Route.getUrlParam('pubsub')) {
            console.log(`%c [PubSub] ${this.channel.name} ${this.name}: [${topic.name}]: `, 'background: #222; color: #70cc41', data);
        }

        if (deliverSync) {
            topic.publishSync(...data);
        } else {
            topic.publish(...data);
        }
    }

    /**
     *
     * @param topic
     * @returns {{[topicName: string]: Message[]}}
     */
    public getHistory(topic: string): { [topicName: string]: Message[] } {
        const history: { [topicName: string]: Message[] } = {};

        console.info("Topics with pattern:", topic, this.channel.getTopics(topic));

        this.channel.getTopics(topic).forEach((t) => {
            if (!history[t.name]) {
                history[t.name] = [];
            }

            history[t.name] = t.getHistory();
        });

        return history;
    }
}
