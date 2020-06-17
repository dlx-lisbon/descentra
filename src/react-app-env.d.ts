/// <reference types="react-scripts" />

declare module 'truffle-contract';
declare module 'web3';
declare module '3box';
declare module 'react-emoji-render';
declare module 'date-format';
declare module 'react-stack-grid';

declare global {
    interface Window {
        Ipfs: any;
        OrbitDB: any;
    }
}

// let OrbitDB = window.OrbitDB;
// let Ipfs = window.Ipfs;
