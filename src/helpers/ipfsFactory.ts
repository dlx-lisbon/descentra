import IPFS from 'ipfs';


// Configuration for IPFS instance
const ipfsConfig = {
    repo: process.env.REACT_APP_IPFS_REPO,
    EXPERIMENTAL: {
        pubsub: true,
    },
    config: {
        Addresses: {
            Swarm: [
                // Use IPFS dev signal server
                // Websocket:
                // '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
                // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
                // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                // WebRTC:
                process.env.REACT_APP_LIBP2P_WEBRTC_STAR,
                // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
                // Use local signal server
                // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
            ],
        },
    },
};

export async function startIpfsInstance(): Promise<any> {
    return new Promise((resolve, reject) => {
        // Create IPFS instance
        const ipfs = new IPFS(ipfsConfig);

        ipfs.on('error', (e: any) => reject(e));
        ipfs.on('ready', async () => resolve(ipfs));
    });
}
