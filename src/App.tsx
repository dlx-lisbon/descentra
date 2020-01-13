import { ethers } from 'ethers';
import ipfsClient from 'ipfs-http-client';
import React, { Suspense, useEffect, useState } from 'react';
import Emoji from 'react-emoji-render';

import 'rsuite/dist/styles/rsuite-default.css';

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

import MeetupCoreJSON from 'dlx-contracts/build/contracts/MeetupCore.json';
import { MeetupCoreInstance } from 'dlx-contracts/types/truffle-contracts/index';
import { IMeetupInfo, IMeetupIPFSData } from './interfaces';
import SinglePostItem from './SinglePostItem';

const Kudos = React.lazy(() => import('./Kudos'));
const Profile = React.lazy(() => import('./Profile'));
const Chat = React.lazy(() => import('./Chat'));
const NewContent = React.lazy(() => import('./NewContent'));
const Meetup = React.lazy(() => import('./Meetup'));

const ipfs = ipfsClient(process.env.REACT_APP_IPFS_URL);


export default function App() {
    // drawers and modals
    const [loadingContent, setLoadingContent] = useState<boolean>(true);
    const [chat, openChat] = useState<boolean>(false);
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [newContent, openNewContent] = useState<boolean>(false);
    // open post
    const [openMeetup, setOpenMeetup] = useState<number>(-1);
    const [isOpenMeetup, setIsOpenMeetup] = useState<boolean>(false);
    // blockchain variables
    const [userSigner, setUserSigner] = useState<ethers.providers.JsonRpcSigner>(undefined as any);
    const [meetupCoreInstance, setMeetupCoreInstance]
        = useState<ethers.Contract & MeetupCoreInstance>(undefined as any);
    const [meetups, setMeetups] = useState<Map<number, IMeetupInfo>>(new Map());


    useEffect(() => {
        const fetchData = async () => {
            const customHttpProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

            // We connect to the Contract using a Provider, so we will only
            // have read-only access to the Contract
            const network = await customHttpProvider.getNetwork();
            const meetupCoreContract = new ethers.Contract(
                // TODO: improve next line
                (MeetupCoreJSON.networks as any)[network.chainId].address,
                MeetupCoreJSON.abi,
                customHttpProvider,
            ) as ethers.Contract & MeetupCoreInstance;
            setMeetupCoreInstance(meetupCoreContract);

            setUserSigner(customHttpProvider.getSigner(0));

            const totalMeetups = (await meetupCoreContract.totalMeetups()).toNumber();
            const loadingMeetups: Map<number, IMeetupInfo> = new Map();
            for (let m = totalMeetups - 1; m >= 0; m -= 1) {
                const meetup = await meetupCoreContract.meetups(m);
                const ipfsData = JSON.parse((await ipfs.cat(meetup[3])).toString()) as IMeetupIPFSData;
                loadingMeetups.set(m, {
                    author: 'ze',
                    date: meetup[1].toNumber(),
                    description: ipfsData.description,
                    id: m,
                    location: ipfsData.location,
                    seats: meetup[2].toNumber(),
                    status: meetup[0].toNumber(),
                    title: ipfsData.title,
                });
            }
            setMeetups(loadingMeetups);
            setLoadingContent(false);
        };
        fetchData();
    }, []);

    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
    };

    const handleOpenMeetup = (id: number) => {
        setOpenMeetup(id);
        setIsOpenMeetup(true);
    };

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
                                    src="img/blog/c1.jpg"
                                />
                            </span>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Container style={{ width: '100%', maxWidth: '1300px', margin: 'auto' }}>
                <Content>
                    {loadingContent && <p>Loading content...</p>}
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
                                <Chat />
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
                                <Kudos />
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
                            <Drawer.Title>Profile</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Profile />
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
                        <Icon icon="edit" /> New Content
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
                            style={{ display: 'inline-block', width: 350 }}
                        >
                            <img alt="placeholder" src="https://via.placeholder.com/350x240" height="240" />
                            <Panel header="RSUITE">
                                <p>
                                    <small>
                                        A suite of React components, sensible UI design,
                                        and a friendly development experience.
                                    </small>
                                </p>
                            </Panel>
                        </Panel>
                    </div>
                </Sidebar>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
                <NewContent
                    show={newContent}
                    setShow={openNewContent}
                    meetupCore={meetupCoreInstance}
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
