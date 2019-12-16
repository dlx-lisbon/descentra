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
    Nav,
    Navbar,
    Sidebar,
} from 'rsuite';
import About from './Components/Sidebar/About';
import Pool from './Components/Sidebar/Pool';

const Home = lazy(() => import('./routes/Home'));
const Meetup = lazy(() => import('./routes/Meetup'));
const Chat = lazy(() => import('./routes/Chat'));
const Kudos = lazy(() => import('./routes/Kudos'));
const Profile = lazy(() => import('./routes/Profile'));


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
                            alt="some clown fish"
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
            <Container style={{ width: '100%', maxWidth: '1300px', margin: 'auto' }}>
                <Content>
                    <BrowserRouter>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact={true} path="/" component={Home} />
                                <Route path="/meetup" component={Meetup} />
                                <Route path="/chat" component={Chat} />
                                <Route path="/kudos" component={Kudos} />
                                <Route path="/profile" component={Profile} />
                            </Switch>
                        </Suspense>
                    </BrowserRouter>
                </Content>
                <Sidebar width={400}>
                    <About />
                    <Pool />
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
