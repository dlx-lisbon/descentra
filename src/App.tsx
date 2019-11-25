import React, { lazy, Suspense } from 'react';
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
    return (
        <Container>
            <Header>
                <Navbar>
                    <Navbar.Header>
                        <img src="/img/clown-fish.svg" height={60} style={{ padding: '5px 30px 5px 20px' }} />
                        <span>Bem-vindo ao DLX</span>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight={true} style={{ height: '60px' }}>
                            <Nav.Item icon={<Icon icon="comments-o" />} >Chat</Nav.Item>
                            <Avatar style={{ margin: '10px' }} circle={true} src="/img/blog/c1.jpg" />
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
