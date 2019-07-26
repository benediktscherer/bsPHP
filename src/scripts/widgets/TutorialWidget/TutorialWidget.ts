///<reference path='../../VT3000/typings/references.ts' />

class TutorialWidget extends BaseWidget {

    private channel: PubSub;

    public init(): Q.Promise<boolean> {
        const deferred = Q.defer<boolean>();

        this.channel = PubSub.join('#channel-name-identifier');
        this.channel.on('channel-topic-identifier', (resp) => {
            console.log('Your Widget recieved a Message by PubSub', resp);
        });

        this.handleContent();

        deferred.resolve(true);
        return deferred.promise;
    }


    /**
     * render template and send Message in PubSub
     */
    public handleContent() {
        let data = {
            text: '(Hier wird ein Widget ausgegeben.)'
        };

        this.getTemplate("view.html", data).then((t: JQuery) => {
            this.config.container.html(t);

            this.channel.send('channel-top-identifier', {date: 'Hello World.'});
        });
    }
}