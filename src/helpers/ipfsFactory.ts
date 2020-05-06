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
                // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
                // Use local signal server
                // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
                // obernardovieira node
                '/ip4/188.166.203.82/tcp/20000/wss/p2p-webrtc-star/p2p/QmZaJSvFPLGqXvVv6NYZKCZkVKnVeUc5CMZYGhfkZ4ouqF',
                // bootstrap nodes
                '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                '/dnsaddr/bootstrap.libp2p.io/ipfs/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                '/dnsaddr/bootstrap.libp2p.io/ipfs/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
                '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                '/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                '/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                '/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
                '/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
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
