// import { ethers } from 'ethers';
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

// import ContentMeetup from './components/content/ContentMeetup';
import ContentPost from './components/content/ContentPost';
// import DLXABI from './helpers/contracts/abi/DLX.json';
// import KudosABI from './helpers/contracts/abi/Kudos.json';
// import NetworkDevAddress from './helpers/contracts/network/development.json';
// import NetworkGoerliAddress from './helpers/contracts/network/goerli.json';
// import { DLXInstance, KudosInstance } from './helpers/contracts/types/index';
import { startIpfsInstance } from './helpers/ipfsFactory';
import PostModel from './helpers/orbitdb/PostModel';
import { store } from './helpers/orbitdb/store';
import { IPostInfo } from './interfaces';

// const Kudos = React.lazy(() => import('./components/drawers/Kudos'));
const Profile = React.lazy(() => import('./components/drawers/Profile'));
const NewContent = React.lazy(() => import('./components/drawers/NewContent'));
// const Meetup = React.lazy(() => import('./components/drawers/Meetup'));
// const MintKudo = React.lazy(() => import('./components/drawers/MintKudo'));
const Practice = React.lazy(() => import('./components/drawers/Practice'));
const Post = React.lazy(() => import('./components/drawers/Post'));


export default function App() {
    // loading
    const [loadingPostModel, setLoadingPostModel] = useState<boolean>(true);
    // drawers and modals
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [mintKudo, openMintKudo] = useState<boolean>(false);
    const [practice, openPractice] = useState<boolean>(false);
    const [newContent, openNewContent] = useState<boolean>(false);
    // open post
    const [openPost, setOpenPost] = useState<string>('');
    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
    // blockchain variables
    // const [userSigner, setUserSigner] = useState<ethers.providers.JsonRpcSigner>(undefined as any);
    // const [dlxInstance, setDLXInstance]
    //     = useState<ethers.Contract & DLXInstance>(undefined as any);
    // const [kudosCoreInstance, setKudosInstance]
    //     = useState<ethers.Contract & KudosInstance>(undefined as any);
    // const [usingProvider, setUsingProvider] = useState<any>(undefined);
    // posts
    const [posts, setPosts] = useState<[IPostInfo]>([] as any);
    const [ipfs, setIpfs] = useState<any>(undefined);
    const [postModel, setPostModel] = useState<PostModel>(undefined as any);


    useEffect(() => {
        const fetchData = async () => {
            // const injectedEthereumMetamask = (window as any).ethereum;
            // let provider;
            // // setup provider
            // if (injectedEthereumMetamask !== undefined) {
            //     await injectedEthereumMetamask.enable();
            //     provider = new ethers.providers.Web3Provider(injectedEthereumMetamask);
            //     setUserSigner(provider.getSigner(0));
            //     setUsingProvider(injectedEthereumMetamask);
            // } else {
            //     provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            // }
            // // setup contracts
            // const networkId = (await provider.getNetwork()).chainId;
            // const dlxContract = new ethers.Contract(
            //     networkId === 5 ? NetworkGoerliAddress.DLX : NetworkDevAddress.DLX,
            //     DLXABI,
            //     provider,
            // ) as ethers.Contract & DLXInstance;
            // setDLXInstance(dlxContract);
            // const kudosCoreContract = new ethers.Contract(
            //     networkId === 5 ? NetworkGoerliAddress.Kudos : NetworkDevAddress.Kudos,
            //     KudosABI,
            //     provider,
            // ) as ethers.Contract & KudosInstance;
            // setKudosInstance(kudosCoreContract);
            // setup orbitdb
            const ipfsInstance = await startIpfsInstance();
            setIpfs(ipfsInstance);
            if (process.env.REACT_APP_ORBITDB_POST_NAME === undefined) {
                setLoadingPostModel(false);
                alert('process.env.REACT_APP_ORBITDB_POST_NAME is not defined!');
                return;
            }
            const dbContentPost = await store(ipfsInstance, process.env.REACT_APP_ORBITDB_POST_NAME);
            const postM = new PostModel(dbContentPost, async () => {
                setLoadingPostModel(false);
                setPosts(postM.posts);
            });
            postM.subscribe(() => setPosts(postM.posts));
            setPostModel(postM);
        };
        fetchData();
    }, []);

    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
    };

    const handleOpenPost = (id: string) => {
        setOpenPost(id);
        setIsOpenPost(true);
    };

    const userAvatarSrc = 'img/unknown_user.svg';

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
                                onClick={() => openPractice(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":muscle:  Praticar" />
                                </Nav.Item>
                            </span>
                            {/* <span
                                onClick={() => openMintKudo(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":construction_worker:  Mint Kudo" />
                                </Nav.Item>
                            </span> */}
                            <span
                                onClick={() => openKudos(true)}
                            >
                                <Nav.Item>
                                    <Emoji text=":hatching_chick:  Kudos" />
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
                    {(loadingPostModel) && <img src="img/fish_loading.gif" />}
                    {posts.map((c) => <ContentPost key={c._id} content={c} onClick={handleOpenPost} />)}
                    <Drawer full={true} placement={'bottom'} show={kudos} onHide={() => openKudos(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Kudos</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            Em construção!
                            {/* <Suspense fallback={<div>A carregar...</div>}>
                                <Kudos
                                    kudosCore={kudosCoreInstance}
                                    userSigner={userSigner}
                                    ipfs={ipfs}
                                />
                            </Suspense> */}
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openKudos(false)} appearance="subtle">
                                Fechar
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer
                        full={true}
                        placement={'bottom'}
                        show={practice}
                        onHide={() => openPractice(false)}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Praticar</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>A carregar...</div>}>
                                <Practice />
                            </Suspense>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openPractice(false)} appearance="subtle">
                                Fechar
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer full={true} placement={'bottom'} show={profile} onHide={() => openProfile(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Perfil</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>A carregar...</div>}>
                                <Profile />
                            </Suspense>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={() => openProfile(false)} appearance="subtle">
                                Fechar
                            </Button>
                        </Drawer.Footer>
                    </Drawer>
                    <Drawer full={true} placement={'bottom'} show={isOpenPost} onHide={() => setIsOpenPost(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Post</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Suspense fallback={<div>A carregar...</div>}>
                                <Post content={posts.find((p) => p._id === openPost)!} />
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
            <Suspense fallback={<div>A carregar...</div>}>
                <NewContent
                    show={newContent}
                    setShow={openNewContent}
                    postModel={postModel}
                />
            </Suspense>
            {/* <Suspense fallback={<div>A carregar...</div>}>
                <MintKudo
                    show={mintKudo}
                    setShow={openMintKudo}
                    kudosCore={kudosCoreInstance}
                    userSigner={userSigner}
                    ipfs={ipfs}
                />
            </Suspense> */}
            <Footer
                style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px' }}
            >
                DLX 2020 <Emoji text=":ok_hand:" />
            </Footer>
        </Container>
    );
}
