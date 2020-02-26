import { ethers } from 'ethers';
import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import React, { Suspense, useEffect, useState } from 'react';
import Emoji from 'react-emoji-render';


import 'rsuite/dist/styles/rsuite-default.css';

import ThreeBox from '3box';
import {
    Avatar,
    Button,
    Container,
    Content,
    Drawer,
    Footer,
    Header,
    Icon,
    Input,
    InputGroup,
    Nav,
    Navbar,
    Panel,
    Sidebar,
} from 'rsuite';

import DLXABI from './contracts/abi/DLX.json';
import KudosABI from './contracts/abi/Kudos.json';
import NetworkDevAddress from './contracts/network/development.json';
import { DLXInstance, KudosInstance } from './contracts/types/index';
import { IMeetupInfo, IOrbitMeetupInfo } from './interfaces';
import SinglePostItem from './SinglePostItem';

const Kudos = React.lazy(() => import('./Kudos'));
const Profile = React.lazy(() => import('./Profile'));
const Chat = React.lazy(() => import('./Chat'));
const NewContent = React.lazy(() => import('./NewContent'));
const Meetup = React.lazy(() => import('./Meetup'));
const MintKudo = React.lazy(() => import('./MintKudo'));


export default function App() {
    // drawers and modals
    const [loadingContent, setLoadingContent] = useState<boolean>(true);
    const [chat, openChat] = useState<boolean>(false);
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [user3box, setUser3Box] = useState<any>(undefined);
    const [user3boxProfile, setUser3BoxProfile] = useState<any>(undefined);
    const [mintKudo, openMintKudo] = useState<boolean>(false);
    const [newContent, openNewContent] = useState<boolean>(false);
    // open post
    const [openMeetup, setOpenMeetup] = useState<number>(-1);
    const [isOpenMeetup, setIsOpenMeetup] = useState<boolean>(false);
    // blockchain variables
    const [userSigner, setUserSigner] = useState<ethers.providers.JsonRpcSigner>(undefined as any);
    const [dlxInstance, setDLXInstance]
        = useState<ethers.Contract & DLXInstance>(undefined as any);
    const [kudosCoreInstance, setKudosInstance]
        = useState<ethers.Contract & KudosInstance>(undefined as any);
    const [meetups, setMeetups] = useState<Map<number, IMeetupInfo>>(new Map());
    const [usingProvider, setUsingProvider] = useState<any>(undefined);
    const [orbitdb, setOrbitdb] = useState<any>(undefined);
    const [dlxorbitdb, setDlxOrbitdb] = useState<any>(undefined);
    const [ipfs, setIpfs] = useState<any>(undefined);


    useEffect(() => {
        const fetchData = async () => {
            const injectedEthereumMetamask = (window as any).ethereum;
            let provider;
            const currentIpfs = await IPFS.create();
            const currentOrbitdb = await OrbitDB.createInstance(currentIpfs);
            if (injectedEthereumMetamask !== undefined) {
                await injectedEthereumMetamask.enable();
                provider = new ethers.providers.Web3Provider(injectedEthereumMetamask);
                setUserSigner(provider.getSigner(0));
                setUser3BoxProfile(await ThreeBox.getProfile(injectedEthereumMetamask.selectedAddress));
                // setUser3Box(await loadUserThreeBox(injectedEthereumMetamask));
                setUsingProvider(injectedEthereumMetamask);
            } else {
                provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
            }
            setIpfs(currentIpfs);
            setOrbitdb(currentOrbitdb);
            // const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

            // We connect to the Contract using a Provider, so we will only
            // have read-only access to the Contract
            const dlxContract = new ethers.Contract(
                NetworkDevAddress.DLX,
                DLXABI,
                provider,
            ) as ethers.Contract & DLXInstance;
            setDLXInstance(dlxContract);
            const kudosCoreContract = new ethers.Contract(
                NetworkDevAddress.Kudos,
                KudosABI,
                provider,
            ) as ethers.Contract & KudosInstance;
            setKudosInstance(kudosCoreContract);

            const db = await currentOrbitdb.keyvalue('test.local.dlx.meetups');
            await db.load();
            setDlxOrbitdb(db);

            const totalContents = (await dlxContract.totalContents()).toNumber();
            const loadingMeetups: Map<number, IMeetupInfo> = new Map();
            for (let m = totalContents - 1; m >= 0; m -= 1) {
                const meetup = await dlxContract.contents(m);
                const orbitMeetup = db.get(m.toString()) as IOrbitMeetupInfo;
                loadingMeetups.set(m, {
                    author: await ThreeBox.getProfile(meetup[0]),
                    date: orbitMeetup.date,
                    description: orbitMeetup.description,
                    id: m,
                    location: orbitMeetup.location,
                    status: await dlxContract.meetupCanceled(m),
                    title: orbitMeetup.title,
                });
            }
            setMeetups(loadingMeetups);
            setLoadingContent(false);
        };
        fetchData();
    }, []);

    const loadUserThreeBox = async (provider: any) => {
        const box = await ThreeBox.openBox(provider.selectedAddress, provider);
        await box.syncDone;
        return box;
    };

    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
    };

    const handleOpenMeetup = (id: number) => {
        setOpenMeetup(id);
        setIsOpenMeetup(true);
    };

    const userAvatarSrc = user3boxProfile !== undefined && user3boxProfile.image !== undefined ?
        'https://ipfs.io/ipfs/' + user3boxProfile.image[0].contentUrl['/'] : 'img/unknown_user.svg';

    return (
        <Container>
            <Header>
                <Navbar>
                    <Navbar.Header>
                        <img
                            src="img/clown-fish.svg"
                            alt="some clown fish"
                            onClick={closeAll}
                            height={60}
                            style={{ padding: '5px 30px 5px 20px', cursor: 'pointer' }}
                        />
                        <span>Bem-vindo ao DLX</span>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight={true} style={{ height: '60px' }}>
                            <span
                                onClick={() => openMintKudo(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":construction_worker:  Mint Kudo" />
                                </Nav.Item>
                            </span>
                            <span
                                onClick={() => openKudos(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":hatching_chick:  Kudos" />
                                </Nav.Item>
                            </span>
                            <span
                                onClick={() => openChat(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":ghost:  Chat" />
                                </Nav.Item>
                            </span>
                            <span
                                onClick={() => openProfile(true)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Avatar
                                    style={{ margin: '10px' }}
                                    circle={true}
                                    src={userAvatarSrc}
                                />
                            </span>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Container style={{ width: '100%', maxWidth: '1300px', margin: 'auto' }}>
                <Content>
                    {loadingContent && <img src="img/fish_loading.gif" />}
                    {Array.from(meetups.values()).map((meetup) => <SinglePostItem
                        key={meetup.id}
                        info={meetup}
                        onClick={handleOpenMeetup}
                    />)}
                    <Drawer placement={'right'} show={chat} onHide={() => openChat(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Chat</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Chat
                                    threeBox={user3box}
                                />
                            </Suspense>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openChat(false)} appearance="subtle">
                                Close
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer full={true} placement={'bottom'} show={kudos} onHide={() => openKudos(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Kudos</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Kudos
                                    kudosCore={kudosCoreInstance}
                                    userSigner={userSigner}
                                    ipfs={ipfs}
                                />
                            </Suspense>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openKudos(false)} appearance="subtle">
                                Close
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer full={true} placement={'bottom'} show={profile} onHide={() => openProfile(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Perfil</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Profile
                                    threeBoxProfile={user3boxProfile}
                                />
                            </Suspense>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openProfile(false)} appearance="subtle">
                                Close
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer full={true} placement={'bottom'} show={isOpenMeetup} onHide={() => setIsOpenMeetup(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Post</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Meetup meetupData={meetups.get(openMeetup)!} />
                            </Suspense>
                        </Drawer.Body>
                    </Drawer>
                </Content>
                <Sidebar width={400}>
                    <Button
                        color="blue"
                        block={true}
                        style={{ margin: '50px 0px', width: '350px' }}
                        onClick={() => openNewContent(true)}
                    >
                        <Icon icon="edit" />Novo Conteudo
                    </Button>
                    <InputGroup style={{ margin: '50px 0px', width: '350px' }} size="lg" inside={true}>
                        <Input placeholder="Procurar por uma publicação" />
                        <InputGroup.Button><Icon icon="search" /></InputGroup.Button>
                    </InputGroup>
                    <div style={{ margin: '50px 0px' }}>
                        <Panel
                            shaded={true}
                            bordered={true}
                            bodyFill={true}
                            style={{ display: 'inline-block', margin: '0px 0px 50px 0px', width: '350px' }}
                        >
                            <Panel header="POOL">
                                <p>
                                    <small>
                                        Isto é uma pool sobre batatas e outras coisas variadas!
                                    </small>
                                </p>
                            </Panel>
                            <img alt="placeholder" src="https://via.placeholder.com/350x240" height="240" />
                        </Panel>
                        <Panel
                            shaded={true}
                            bordered={true}
                            bodyFill={true}
                            style={{ display: 'inline-block', margin: '0px 0px 50px 0px', width: '350px' }}
                        >
                            <Panel header="MEMBROS">
                                <p>
                                    <small>
                                        Lista completa de membros. Participa aqui!
                                    </small>
                                </p>
                            </Panel>
                            <img alt="placeholder" src="https://via.placeholder.com/350x240" height="240" />
                        </Panel>
                    </div>
                </Sidebar>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
                <NewContent
                    show={newContent}
                    setShow={openNewContent}
                    dlx={dlxInstance}
                    userSigner={userSigner}
                    dlxorbitdb={dlxorbitdb}
                />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <MintKudo
                    show={mintKudo}
                    setShow={openMintKudo}
                    kudosCore={kudosCoreInstance}
                    userSigner={userSigner}
                    ipfs={ipfs}
                />
            </Suspense>
            <Footer
                style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px' }}
            >
                DLX 2020 <Emoji text=":ok_hand:" />
            </Footer>
        </Container>
    );
}
