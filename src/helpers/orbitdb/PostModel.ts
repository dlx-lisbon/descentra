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
    constructor(
        db: any,
        loading: (progress: number) => void,
        replicating: (progress: number) => void,
    ) {
        this.readyOrReplicated = false;
        this.db = db;
        this.posts = [] as any;
        this.onChanges = [] as any;
        // When the database was loaded and is ready to use,
        // refresh our data model and set the state to ready
        this.db.events.on('ready', (dbname: any, heads: any) => {
            loading(100);
            this.inform();
        });
        // When a remote peer updated the posts, refresh our data model
        this.db.events.on('replicated', (address: string) => {
            replicating(100);
            this.inform();
        });
        // Emitted before replicating a part of the database with a peer.
        this.db.events.on('replicate', (address: string) => {
            replicating(0);
        });
        // Emitted while replicating a database.
        // * address is id of the database that emitted the event.
        // * hash is the multihash of the entry that was just loaded.
        // * entry is the database operation entry.
        // * progress is the current progress.
        // * have is a map of database pieces we have.
        this.db.events.on(
            'replicate.progress',
            (address: string, hash: string, entry: any, progress: number, have: number) => {
                console.log('replicate.progress', address, hash, entry, progress, have);
                replicating((progress / have) * 100);
            });
        // Emitted before loading the database.
        this.db.events.on('load', (dbname: string) => {
            loading(0);
        });
        // Emitted while loading the local database, once for each entry.
        // * dbname is the name of the database that emitted the event.
        // * hash is the multihash of the entry that was just loaded.
        // * entry is the database operation entry.
        // * progress is a sequential number starting from 0 upon calling load().
        this.db.events.on(
            'load.progress',
            (address: string, hash: string, entry: any, progress: number, total: number) => {
                console.log('load.progress', address, hash, entry, progress, total);
                loading((progress / total) * 100);
            });
        // Emitted when a new peer connects via ipfs pubsub.
        // * peer is a string containing the id of the new peer
        this.db.events.on('peer', (peer: string) => console.log('peer', peer));
        // also event 'write', (address: any, entry: any, heads: any)
        // also event 'closed', (dbname: any)
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
