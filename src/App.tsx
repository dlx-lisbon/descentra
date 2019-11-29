import React, { lazy, Suspense } from 'react';
import Emoji from 'react-emoji-render';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';

import {
    Avatar,
    Container,
    Content,
    Footer,
    Header,
    Icon,
    Nav,
    Navbar,
    Sidebar,
} from 'rsuite';
import News from './Components/Sidebar/News';

const Home = lazy(() => import('./routes/Home'));
const Meetup = lazy(() => import('./routes/Meetup'));
const Chat = lazy(() => import('./routes/Chat'));


export default function App() {
    const goToChat = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        window.location.href = '/chat';
        event.preventDefault();
    };

    const goToKudos = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        window.location.href = '/kudos';
        event.preventDefault();
    };

    const goToProfile = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        window.location.href = '/profile';
        event.preventDefault();
    };

    const goToMain = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.href = '/';
        event.preventDefault();
    };

    return (
        <Container>
            <Header>
                <Navbar>
                    <Navbar.Header>
                        <img
                            src="/img/clown-fish.svg"
                            onClick={goToMain}
                            height={60}
                            style={{ padding: '5px 30px 5px 20px', cursor: 'pointer' }}
                        />
                        <span>Bem-vindo ao DLX</span>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight={true} style={{ height: '60px' }}>
                            <span
                                onClick={goToKudos}
                            >
                                <Nav.Item>
                                    <Emoji text=":hatching_chick:  Kudos" />
                                </Nav.Item>
                            </span>
                            <span onClick={goToChat}>
                                <Nav.Item>
                                    <Emoji text=":ghost:  Chat" />
                                </Nav.Item>
                            </span>
                            <span onClick={goToProfile} style={{ cursor: 'pointer' }}>
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
            <Container>
                <Content>
                    <BrowserRouter>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact={true} path="/" component={Home} />
                                <Route path="/meetup" component={Meetup} />
                                <Route path="/chat" component={Chat} />
                            </Switch>
                        </Suspense>
                    </BrowserRouter>
                </Content>
                <Sidebar width={400}>
                    <News />
                </Sidebar>
            </Container>
            <Footer>Footer</Footer>
        </Container>
    );
}
