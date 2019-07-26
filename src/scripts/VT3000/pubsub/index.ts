///<reference path='../typings/references.ts' />

class PubSub {

    /**
     *
     * @type {Array}
     */
    private static channels: Channel[] = [];

    /**
     *
     */
    private static defaultChannel: Channel;

    /**
     *
     */
    private static ensureDefaultChannel(): void {
        if (Assert.isNotUndefinedNullOrEmpty(PubSub.defaultChannel)) {
            return;
        }

        PubSub.defaultChannel = new Channel("#global");

        this.channels.push(PubSub.defaultChannel);
    }

    /**
     *
     * @param channelName
     * @returns {Channel}
     */
    static createChannel(channelName: string): Channel {
        let channel = PubSub.getChannel(channelName);

        if (channel !== null) {
            return channel;
        }

        channel = new Channel(channelName);

        PubSub.channels.push(channel);

        return channel;
    }

    /**
     *
     * @param channelName
     * @returns
     */
    static join(channelName: string): ChannelSubscription {
        PubSub.ensureDefaultChannel();

        if (Assert.isUndefinedNullOrEmpty(channelName)) {
            channelName = "#global";
        }

        if (!channelName.startsWith("#")) {
            channelName = "#" + channelName;
        }

        let channel = PubSub.getChannel(channelName);

        if (Assert.isUndefinedNullOrEmpty(channel)) {
            channel = PubSub.createChannel(channelName);
        }

        const token = "@" + StringUtils.uuid();

        return channel.joinAs(token);
    }

    /**
     *
     * @param name
     * @returns {any}
     */
    static getChannel(name: string): Channel | null {
        PubSub.ensureDefaultChannel();

        let channels = PubSub.channels.filter((c) => {
            return c.name === name;
        });

        if (channels.length > 0) {
            return channels[0];
        }

        return null;
    }

    /**
     *
     * @param name
     * @returns {boolean}
     */
    static hasTopic(name: string): boolean {
        PubSub.ensureDefaultChannel();

        return PubSub.defaultChannel.hasTopic(name);
    }

    /**
     *
     * @param name
     * @returns {Topic}
     */
    static get(name: string): Topic {
        PubSub.ensureDefaultChannel();

        return PubSub.defaultChannel.getTopic(name);
    }

    /**
     *
     * @param name
     * @returns {Topic}
     */
    static register(name: string): Topic {
        PubSub.ensureDefaultChannel();

        if (PubSub.hasTopic(name)) {
            return PubSub.get(name);
        }

        let topic = new Topic(name);
        topic.instanceId = StringUtils.uuid();

        PubSub.defaultChannel.addTopic(topic);

        return topic;
    }

    /**
     *
     * @param name
     * @param data
     */
    static send(name: string, data: any) {
        PubSub.ensureDefaultChannel();

        this.register(name).publish(data);
    }

    /**
     *
     * @param name
     * @param cb
     * @returns {Topic}
     */
    static on(name: string, cb: Function): Topic {
        PubSub.ensureDefaultChannel();

        let topic: Topic | null = PubSub.get(name);
        if (topic === null) {
            topic = PubSub.register(name);
        }

        topic.subscribe(cb);

        return topic;
    }

    /**
     *
     * @param name
     * @param id
     * @returns {boolean}
     */
    static off(name: string, id: string): boolean {
        PubSub.ensureDefaultChannel();

        let topic: Topic | null = PubSub.get(name);
        if (topic === null) {
            // ignore non-existing topic
            return true;
        }

        return topic.unsubscribe(id);
    }

    /**
     *
     * @param name
     * @returns {Message[]}
     */
    static history(name: string) {
        PubSub.ensureDefaultChannel();

        let topic = PubSub.get(name);

        return topic.getHistory();
    }

    /**
     *
     * @returns {Channel[]}
     */
    static channelList(): Channel[] {
        return PubSub.channels;
    }
}
