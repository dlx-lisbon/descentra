import { IPostInfo } from '../../interfaces';

export default class PostModel {
    public readyOrReplicated: boolean;
    public db: any;
    public posts: [IPostInfo];
    public onChanges: [() => void];

    // Generic "model" object. You can use whatever
    // framework you want. For this application it
    // may not even be worth separating this logic
    // out, but we do this to demonstrate one way to
    // separate out parts of your application.
    constructor(db: any, callbackWhenReady: any) {
        this.readyOrReplicated = false;
        this.db = db;
        this.posts = [] as any;
        this.onChanges = [] as any;
        // When the database was loaded and is ready to use,
        // refresh our data model and set the state to ready
        this.db.events.on('ready', () => {
            if (!this.readyOrReplicated) {
                this.getAll();
                this.readyOrReplicated = true;
                callbackWhenReady();
            }

        });
        // When a remote peer updated the posts, refresh our data model
        this.db.events.on('replicated', () => {
            if (!this.readyOrReplicated) {
                this.getAll();
                this.readyOrReplicated = true;
                callbackWhenReady();
            }
        });
    }

    public getAll() {
        this.posts = this.db.query((e: any) => true) || [];
    }

    public subscribe(onChange: () => void) {
        this.onChanges.push(onChange);
    }

    public async inform() {
        this.getAll();
        this.onChanges.forEach((cb: any) => { cb(); });
    }

    // tslint:disable-next-line: variable-name
    public async add(author: string, content: string, date: number, title: string) {
        const result = await this.db.put({
            _id: this.uuid(),
            author,
            content,
            date,
            title,
        });
        this.inform();
        return result;
    }

    // tslint:disable-next-line: variable-name
    public async find(_id: number) {
        return await this.db.get(_id);
    }

    // tslint:disable-next-line: variable-name
    public async destroy(_id: number) {
        await this.db.del(_id);
        this.inform();
    }

    public uuid() {
        /*jshint bitwise:false */
        let i, random;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            // eslint-disable-next-line no-mixed-operators
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }

        return uuid;
    }
}
