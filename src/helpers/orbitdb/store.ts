import OrbitDB from 'orbit-db';

// Configuration for the database
const dbConfig = {
    // If database doesn't exist, create it
    create: true,
    // Don't wait to load from the network
    sync: false,
    // Load only the local version of the database
    // localOnly: true,
    // Allow anyone to write to the database,
    // otherwise only the creator of the database can write
    accessController: {
        write: ['*'],
    },
};

export async function store(ipfs: any, namespace: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            // Create an OrbitDB instance
            const orbitdb = await OrbitDB.createInstance(ipfs);
            // Open (or create) database
            const postsDb = await orbitdb.docs(`${namespace}.posts`, dbConfig);
            const meetupsDb = await orbitdb.docs(`${namespace}.meetups`, dbConfig);

            resolve({ postsDb, meetupsDb });
        } catch (e) {
            reject(e);
        }
    });
}
