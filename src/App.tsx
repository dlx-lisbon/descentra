import React, { useState } from 'react';
import Emoji from 'react-emoji-render';
import styled from 'styled-components';

import 'rsuite/dist/styles/rsuite-default.css';

import Box from '3box';
import {
    Avatar,
    Button,
    ButtonToolbar,
    Col,
    Container,
    Content,
    ControlLabel,
    Divider,
    Drawer,
    FlexboxGrid,
    Footer,
    Form,
    FormControl,
    FormGroup,
    Grid,
    Header,
    Icon,
    Input,
    InputGroup,
    List,
    Nav,
    Navbar,
    Panel,
    Row,
    Sidebar,
    Tag,
    TagGroup,
} from 'rsuite';


interface IPostInfo {
    id: number;
    title: string;
    author: string;
    date: string;
    intro: string;
}


function SinglePostItem(props: { info: IPostInfo, openPost: (value: React.SetStateAction<number>) => void }) {
    const mainPanelStyle = {
        display: 'inline-block',
        margin: '50px auto',
        maxWidth: '700px',
        width: '100%',
    };
    const ImagePost = styled.div`
        max-height: 240px,
        object-fit: cover,
        overflow: hidden,
        width: 100%,
    `;
    const PostContainer = styled.div`
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        cursor: pointer;
    `;

    const sendToMeetupId = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.openPost(props.info.id);
        event.preventDefault();
    };

    return (
        <PostContainer onClick={sendToMeetupId}>
            <Panel shaded={true} bordered={true} bodyFill={true} style={mainPanelStyle}>
                <ImagePost>
                    <img src="/img/posts/p2.jpg" alt="presenting" style={{ width: '100%' }} />
                </ImagePost>
                <Panel header={props.info.title} >
                    <div className="show-grid">

                        <FlexboxGrid align="middle">
                            <FlexboxGrid.Item colspan={3}>
                                <div style={{ lineHeight: 0 }}>
                                    <Avatar circle={true} src="/img/blog/c1.jpg" />
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={18}>
                                <div style={{ lineHeight: 1.5 }}>
                                    <p><b>{props.info.author}</b></p>
                                    <p><Icon icon="calendar-check-o" />{props.info.date}</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                    <p style={{ margin: '20px 0px' }}>{props.info.intro}</p>
                    <Button>Continue reading</Button>
                </Panel>
            </Panel>
        </PostContainer>
    );
}

function Meetup() {
    const ImagePost = styled.div`
        max-height: 240px,
        object-fit: cover,
        overflow: hidden,
        width: 100%,
    `;
    const PostContainer = styled.div`
        max-width: 900px;
        padding: 50px 80px;
    `;

    return (
        <PostContainer>
            <ImagePost>
                <img src="/img/posts/p2.jpg" alt="presenting" style={{ width: '100%' }} />
            </ImagePost>
            <h2>Lorem ipsum dolor sit amet</h2>
            <TagGroup>
                <Tag color="red">Red</Tag>
                <Tag color="orange">Orange</Tag>
                <Tag color="yellow">Yellow</Tag>
                <Tag color="green">Green</Tag>
                <Tag color="cyan">Cyan</Tag>
                <Tag color="blue">Blue</Tag>
                <Tag color="violet">Violet</Tag>
            </TagGroup>
            <br />
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={3}>
                    <div style={{ lineHeight: 0 }}>
                        <Avatar circle={true} src="/img/blog/c1.jpg" />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={18}>
                    <div style={{ lineHeight: 1.5 }}>
                        <p><b>ORGANIZED BY</b></p>
                        <p>publishers name</p>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <p style={{ margin: '20px 0px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; In hac habitasse platea dictumst. Mauris scelerisque
                pharetra orci, eu tempus purus malesuada nec. Integer elit
                nulla, convallis sit amet sapien non, convallis faucibus erat.
                Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in
                velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.
            </p>
            <Grid>
                <Row className="show-grid">
                    <Col xs={8}>
                        <p><Icon icon="calendar" />&nbsp;13 Jan, 2037</p>
                        <p><Icon icon="clock-o" />&nbsp;18h30</p>
                        <p><Icon icon="map-marker" />&nbsp;Tropical Insland</p>
                    </Col>
                    <Col xs={12}>
                        <img
                            src="https://www.edenbeing.com/wp-content/uploads/2019/09/runners-high-featured-image-500x500.jpg"
                            alt="random map"
                            height="200px"
                        />
                    </Col>
                </Row>
            </Grid>
            <Button>Join</Button>
            <Divider>Participants</Divider>
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                </Row>
            </Grid>
        </PostContainer>
    );
}

function Chat() {
    const [loadingAccount, setLoadingAccount] = React.useState(false);
    const [connectedToChat, setConnectedToChat] = React.useState(false);
    const [profile, setProfile] = React.useState(undefined as any);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [messageToSend, setMessageToSend] = React.useState('');
    const [ghostThreadChat, setGhostThreadChat] = React.useState(undefined as any);

    const loadUserBox = async () => {
        await (window as any).ethereum.enable();
        const userAddress = (window as any).ethereum.selectedAddress;
        const box = await Box.openBox(userAddress, (window as any).ethereum);
        await box.syncDone;
        return box;
    };

    const loadSpace = async (box: any) => {
        const space = await box.openSpace('dlx');
        await space.syncDone;
        return space;
    };

    const loadChat = async (space: any) => {
        const thread = await space.joinThread('dlxOpenChat', {
            ghost: true,
        });
        setChatMessages(await thread.getPosts(20));
        thread.onUpdate(async () => {
            const newMessages = await thread.getPosts();
            setChatMessages(newMessages);
        });
        thread.onNewCapabilities((event: any, did: any) => console.log(did, event, ' the chat'));
        const userList = await thread.listMembers();
        setGhostThreadChat(thread);
        setOnlineUsers(userList);
    };

    const connectToChat = (event: React.SyntheticEvent<Element, Event>) => {
        const fetchData = async () => {
            setLoadingAccount(true);
            const box = await loadUserBox();
            setProfile(await box.public.all());
            const space = await loadSpace(box);
            await loadChat(space);
            setLoadingAccount(false);
            setConnectedToChat(true);
        };
        fetchData();
        event.preventDefault();
    };

    const welcomeMessage = () => {
        if (profile !== undefined) {
            return `Welcome, ${profile.name}`;
        }
    };

    const sendMessage = (event: React.SyntheticEvent<Element, Event>) => {
        ghostThreadChat.post(messageToSend);
        setMessageToSend('');
        event.preventDefault();
    };

    const handleInputMessageToSend = (value: any, event: React.SyntheticEvent<HTMLElement, Event>) => {
        setMessageToSend(value);
    };

    const renderChatMessage = () => (
        chatMessages.map((item: { author: string, message: string, timestamp: number }, index) =>
            <List.Item key={index} index={index}>
                From: {item.author} - {item.message}
            </List.Item>,
        )
    );

    const renderOnlineUsers = () => (
        onlineUsers.map((item: { author: string, message: string, timestamp: number }, index) =>
            <List.Item key={index} index={index}>
                From: {item.author} - {item.message}
            </List.Item>,
        )
    );

    const renderChat = () => {
        if (loadingAccount) {
            return 'Loading...';
        }
        if (connectedToChat) {
            return (
                <div>
                    {welcomeMessage()}
                    <br />
                    <br />
                    <List>{renderChatMessage()}</List>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Message</ControlLabel>
                            <FormControl
                                name="messageToSend"
                                value={messageToSend}
                                onChange={handleInputMessageToSend}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={sendMessage}>Send</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                    Online Users
            <List>{renderOnlineUsers()}</List>
                </div>
            );
        } else {
            return (
                <Button onClick={connectToChat}>Open Chat</Button>
            );
        }
    };

    return (
        <div style={{ margin: '5%' }}>
            {renderChat()}
        </div>
    );
}

function Kudos() {
    return (
        <Grid fluid={true} style={{ padding: '50px' }}>
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
            <br />
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
        </Grid>
    );
}

function Profile() {
    return (
        <>
            {/* full detailed kudos */}
        </>
    );
}


export default function App() {
    const [chat, openChat] = useState(false);
    const [kudos, openKudos] = useState(false);
    const [profile, openProfile] = useState(false);
    const [post, openPost] = useState(-1);

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
                            src="/img/clown-fish.svg"
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
                                    src="/img/blog/c1.jpg"
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
                            <Chat />
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
                            <Kudos />
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
                            <Profile />
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
                            <Meetup />
                        </Drawer.Body>
                    </Drawer>
                </Content>
                <Sidebar width={400}>
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
            <Footer
                style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px', }}
            >
                DLX 2020 <Emoji text=":ok_hand:" />
            </Footer>
        </Container>
    );
}
