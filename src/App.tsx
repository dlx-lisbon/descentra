import { Drawer, Typography } from '@material-ui/core';
import { ethers } from 'ethers';
import moment from 'moment';
import 'moment/locale/pt';
import React, { Suspense, useEffect, useState } from 'react';
import StackGrid, { easings, transitions } from 'react-stack-grid';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/Auth';
import { startIpfsInstance } from './helpers/ipfsFactory';
import PostModel from './helpers/orbitdb/PostModel';
import { store } from './helpers/orbitdb/store';
import { INavbarItem, IPostInfo } from './interfaces';

const Profile = React.lazy(() => import('./components/drawers/Profile'));
const NewPost = React.lazy(() => import('./components/drawers/admin/NewPost'));
const Practice = React.lazy(() => import('./components/drawers/Practice'));
const Post = React.lazy(() => import('./components/drawers/Post'));

const columnWidth = 350;

export default function App() {
    // loading
    const [loadingPostModel, setLoadingPostModel] = useState<boolean>(true);
    const [, setReplicatingProgress] = useState<number>(0);
    // orbitdb
    const [, setIpfs] = useState<any>(undefined);
    const [postModel, setPostModel] = useState<PostModel>();
    // drawers and modals
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [practice, openPractice] = useState<boolean>(false);
    const [newPost, openNewPost] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPostInfo[]>([] as any);
    const [openPost, setOpenPost] = useState<IPostInfo>();

    useEffect(() => {
        const fetchData = async () => {
            const ipfsInstance = await startIpfsInstance();
            setIpfs(ipfsInstance);
            if (process.env.REACT_APP_ORBITDB_POST_NAME === undefined) {
                setLoadingPostModel(false);
                alert('process.env.REACT_APP_ORBITDB_POST_NAME is not defined!');
                return;
            }
            const { postsDb } = await store(ipfsInstance, process.env.REACT_APP_ORBITDB_POST_NAME);
            const postM = new PostModel(
                postsDb,
                (progress) => console.log(progress),
                (progress) => setReplicatingProgress(progress)
            );
            postM.subscribe(() => setPosts(postM.records));
            postsDb.load();
            setLoadingPostModel(false);
            setPostModel(postM);
        };
        fetchData();
    }, []);

    const navbarItems: INavbarItem[] = [
        {
            key: 'novo-conteudo',
            loginRequired: true,
            onlyAdmin: true,
            onClick: () => openNewPost(true),
            children: (
                <>
                    <span role="img" aria-label="memo">
                        📝
                    </span>
                    &nbsp;Novo Conteudo
                </>
            ),
        },
        {
            key: 'praticar',
            loginRequired: false,
            onlyAdmin: false,
            onClick: () => openPractice(true),
            children: (
                <>
                    <span role="img" aria-label="flexed-biceps">
                        💪
                    </span>
                    &nbsp;Praticar
                </>
            ),
        },
        {
            key: 'kudos',
            loginRequired: true,
            onlyAdmin: false,
            onClick: () => openKudos(true),
            children: (
                <>
                    <span role="img" aria-label="hatching-chick">
                        🐣
                    </span>
                    &nbsp;Kudos
                </>
            ),
        },
    ];

    const handleClickOpenPost = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOpenPost(posts.find((el) => el._id === event.currentTarget.id));
        event.preventDefault();
    };

    const transition = transitions['fadeDown'];
    return (
        <AuthProvider>
            <Navbar items={navbarItems} onAvatarClick={() => openProfile(true)} />
            {!loadingPostModel && (
                <div
                    style={{
                        textAlign: 'center',
                        margin: '100px 10% 5% 10%',
                    }}
                >
                    <h1 style={{ fontFamily: 'Caveat', fontWeight: 'lighter', fontSize: '5em' }}>Bem-vindo ao dlx</h1>
                </div>
            )}
            <div>
                <StackGrid
                    duration={480}
                    columnWidth={columnWidth}
                    gutterWidth={5}
                    gutterHeight={5}
                    easing={easings.quartOut}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                    rtl={false}
                >
                    {posts.map((c) => {
                        const authorAddress = ethers.utils.verifyMessage(c.slug, c.author);
                        return (
                            <div
                                key={c._id}
                                id={c._id}
                                style={{ height: 250, width: columnWidth }}
                                onClick={handleClickOpenPost}
                            >
                                {c.coverImage !== undefined && (
                                    <div
                                        style={{
                                            background: `url("${c.coverImage}")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: `${columnWidth}px auto`,
                                            backgroundPosition: 'center',
                                            height: '200px',
                                        }}
                                    />
                                )}
                                <Typography variant="h2" component="h2" gutterBottom>
                                    {c.title}
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom style={{ color: 'grey' }}>
                                    by {authorAddress.substr(0, 7)}...{authorAddress.substr(35, 42)},{' '}
                                    {moment(c.date).fromNow()}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {c.content.slice(0, c.content.indexOf('\n') + 1)}
                                </Typography>
                            </div>
                        );
                    })}
                </StackGrid>
            </div>
            {loadingPostModel && (
                <div style={{ textAlign: 'center', margin: '10%' }}>
                    <img alt="loading fish" src="img/sardy.webp" style={{ maxWidth: '50%' }} />
                    <Typography variant="h5" component="h5" gutterBottom>
                        dlx é um meetup sobre blockchain ⛓️. Maioritariamente ethereum ⛏️. E as outras coisas todas 🥞
                        ...
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom>
                        A carregar....
                    </Typography>
                </div>
            )}
            <Suspense fallback={''}>
                <NewPost show={newPost} setShow={openNewPost} postModel={postModel} />
            </Suspense>
            <Drawer anchor="bottom" open={kudos} onClose={() => openKudos(false)}>
                Em construção
            </Drawer>
            <Drawer anchor="bottom" open={profile} onClose={() => openProfile(false)}>
                <Suspense
                    fallback={
                        <Typography variant="overline" display="block" gutterBottom>
                            A carregar....
                        </Typography>
                    }
                >
                    <Profile />
                </Suspense>
            </Drawer>
            <Suspense fallback={''}>{practice && <Practice close={() => openPractice(false)} />}</Suspense>
            <Suspense fallback={''}>
                {!!openPost && <Post close={() => setOpenPost(undefined)} content={openPost as IPostInfo} />}
            </Suspense>
            {/* <Container maxWidth='xl' style={{
                height: '35px',
                backgroundColor: 'black',
                color: 'white',
                padding: '5px',
                bottom: 0,
                position: 'fixed',
            }}>
                DLX 2020 <span role="img" aria-label="ok-hand">👌</span>
            </Container> */}
        </AuthProvider>
    );
}
