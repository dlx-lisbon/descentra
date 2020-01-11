import { ethers } from 'ethers';
import React, { useEffect, useState, Suspense } from 'react';
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
import SinglePostItem from './SinglePostItem';

const Kudos = React.lazy(() => import('./Kudos'));
const Profile = React.lazy(() => import('./Profile'));
const Chat = React.lazy(() => import('./Chat'));
const NewContent = React.lazy(() => import('./NewContent'));
const Meetup = React.lazy(() => import('./Meetup'));


// TODO: duplicated! solve this
interface IPostInfo {
    id: number;
    title: string;
    author: string;
    date: string;
    intro: string;
}



export default function App() {
    // drawers and modals
    const [chat, openChat] = useState<boolean>(false);
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [newContent, openNewContent] = useState<boolean>(false);
    // open post
    const [post, openPost] = useState<number>(-1);
    // blockchain variables
    const [userSigner, setUserSigner] = useState<ethers.providers.JsonRpcSigner>(undefined as any);
    const [meetupCoreInstance, setMeetupCoreInstance]
        = useState<ethers.Contract & MeetupCoreInstance>(undefined as any);


    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:8545';
            const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

            // We connect to the Contract using a Provider, so we will only
            // have read-only access to the Contract
            const network = await customHttpProvider.getNetwork();
            setMeetupCoreInstance(new ethers.Contract(
                // TODO: improve next line
                (MeetupCoreJSON.networks as any)[network.chainId].address,
                MeetupCoreJSON.abi,
                customHttpProvider,
            ) as ethers.Contract & MeetupCoreInstance);

            setUserSigner(customHttpProvider.getSigner(0));
            // const storageValue = await meetupCoreInstance.meetups();

            // Set provider and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            // this.setState({ provider: customHttpProvider, simpleStorageInstance, userSigner, storageValue });
        };
        fetchData();
    }, []);

    const someFakePostInfo: IPostInfo[] = [{
        id: 1,
        author: 'Jane',
        date: '13 Nov, 2020',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante\
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia\
        Curae; In hac habitasse platea dictumst. Mauris scelerisque\
        pharetra orci, eu tempus purus malesuada nec. Integer elit\
        nulla, convallis sit amet sapien non, convallis faucibus erat.\
        Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in\
        velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.',
        title: 'Lorem ipsum dolor sit amet',
    }, {
        id: 2,
        author: 'Jane',
        date: '13 Nov, 2020',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante\
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia\
        Curae; In hac habitasse platea dictumst. Mauris scelerisque\
        pharetra orci, eu tempus purus malesuada nec. Integer elit\
        nulla, convallis sit amet sapien non, convallis faucibus erat.\
        Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in\
        velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.',
        title: 'Lorem ipsum dolor sit amet',
    }];



    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
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
                    {someFakePostInfo
                        .map((postInfo) => (<SinglePostItem
                            key={postInfo.id}
                            info={postInfo}
                            openPost={openPost}
                        />))
                    }
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
                    <Drawer full={true} placement={'bottom'} show={post !== -1} onHide={() => openPost(-1)}>
                        <Drawer.Header>
                            <Drawer.Title>Post</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Meetup />
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
                <NewContent show={newContent} setShow={openNewContent} />
            </Suspense>
            <Footer
                style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px' }}
            >
                DLX 2020 <Emoji text=":ok_hand:" />
            </Footer>
        </Container>
    );
}
