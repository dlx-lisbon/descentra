import React, { useEffect, useState, Suspense } from 'react';
import { startIpfsInstance } from './helpers/ipfsFactory';
import PostModel from './helpers/orbitdb/PostModel';
import { store } from './helpers/orbitdb/store';
import { IMeetupInfo, IPostInfo, INavbarItem } from './interfaces';
import MeetupModel from './helpers/orbitdb/MeetupModel';
import { Drawer, Typography } from '@material-ui/core';
import Navbar from './components/navbar/Navbar';
import StackGrid, { transitions, easings } from "react-stack-grid";
import moment from 'moment';
import 'moment/locale/pt';
import { ethers } from 'ethers';


const Profile = React.lazy(() => import('./components/drawers/Profile'));
const NewPost = React.lazy(() => import('./components/drawers/admin/NewPost'));
const NewMeetup = React.lazy(() => import('./components/drawers/admin/NewMeetup'));
const Practice = React.lazy(() => import('./components/drawers/Practice'));
const Post = React.lazy(() => import('./components/drawers/Post'));
const Meetup = React.lazy(() => import('./components/drawers/Meetup'));

const columnWidth = 350;

export default function App() {
    // loading
    const [loadingPostModel, setLoadingPostModel] = useState<boolean>(true);
    const [, setReplicatingProgress] = useState<number>(0);
    // orbitdb
    const [, setIpfs] = useState<any>(undefined);
    const [postModel, setPostModel] = useState<PostModel>();
    const [meetupModel, setMeetupModel] = useState<MeetupModel>();
    // drawers and modals
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [practice, openPractice] = useState<boolean>(false);
    const [newPost, openNewPost] = useState<boolean>(false);
    const [newMeetup, openNewMeetup] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPostInfo[]>([] as any);
    const [openPost, setOpenPost] = useState<IPostInfo>();
    // const [meetups, setMeetups] = useState<[IMeetupInfo]>([] as any);
    const [openMeetup, setOpenMeetup] = useState<IMeetupInfo>();

    useEffect(() => {
        const fetchData = async () => {
            const ipfsInstance = await startIpfsInstance();
            setIpfs(ipfsInstance);
            if (process.env.REACT_APP_ORBITDB_POST_NAME === undefined) {
                setLoadingPostModel(false);
                alert('process.env.REACT_APP_ORBITDB_POST_NAME is not defined!');
                return;
            }
            const { postsDb, meetupsDb } = await store(ipfsInstance, process.env.REACT_APP_ORBITDB_POST_NAME);
            const postM = new PostModel(
                postsDb,
                (progress) => console.log(progress),
                (progress) => setReplicatingProgress(progress),
            );
            postM.subscribe(() => setPosts(postM.records));
            postsDb.load();
            const meetupM = new MeetupModel(
                meetupsDb,
                (progress) => console.log(progress),
                (progress) => setReplicatingProgress(progress),
            );
            // meetupM.subscribe(() => setMeetups(meetupM.records));
            meetupsDb.load();
            setLoadingPostModel(false);
            setPostModel(postM);
            setMeetupModel(meetupM);
        };
        fetchData();
    }, []);

    const navbarItems: INavbarItem[] = [
        {
            key: 'novo-conteudo',
            loginRequired: true,
            onlyAdmin: true,
            onClick: () => openNewPost(true),
            children: (<>
                <span role="img" aria-label="memo">📝</span>
                &nbsp;Novo Conteúdo
            </>),
        },
        {
            key: 'novo-meetup',
            loginRequired: true,
            onlyAdmin: true,
            onClick: () => openNewMeetup(true),
            children: (<>
                <span role="img" aria-label="memo">🤖</span>
                &nbsp;Novo Meetup
            </>),
        },
        {
            key: 'praticar',
            loginRequired: false,
            onlyAdmin: false,
            onClick: () => openPractice(true),
            children: (<>
                <span role="img" aria-label="flexed-biceps">💪</span>
                &nbsp;Praticar
            </>),
        },
        {
            key: 'kudos',
            loginRequired: true,
            onlyAdmin: false,
            onClick: () => openKudos(true),
            children: (<>
                <span role="img" aria-label="hatching-chick">🐣</span>
                &nbsp;Kudos
            </>),
        },
    ]

    const handleClickOpenPost = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOpenPost(posts.find(el => el._id === event.currentTarget.id));
        event.preventDefault();
    }

    const transition = transitions['fadeDown'];
    return (
        <React.Fragment>
            <Navbar items={navbarItems} onAvatarClick={() => openProfile(true)} />
            <div style={{ textAlign: 'center' }}>
                <img alt="loading fish" src="img/sardy.webp" style={{ maxWidth: '100%', margin: '6% 0px' }} />
            </div>
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
                        return <div
                            key={c._id}
                            id={c._id}
                            style={{ height: 250, width: columnWidth }}
                            onClick={handleClickOpenPost}
                        >
                            {c.coverImage !== undefined && <div style={{
                                background: `url("${c.coverImage}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: `${columnWidth}px auto`,
                                backgroundPosition: 'center',
                                height: '200px'
                            }} />}
                            <Typography variant="h2" component="h2" gutterBottom>
                                {c.title}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom style={{ color: 'grey' }}>
                                by {authorAddress.substr(0, 7)}...{authorAddress.substr(35, 42)}, {moment(c.date).fromNow()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>{c.content.slice(0, c.content.indexOf('.') + 1)}</Typography>
                        </div>
                    })}

                </StackGrid>
            </div>
            {
                loadingPostModel && <Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>
            }
            {/* <Grid item xs={12} sm={12} md={6}>
                {posts.map((c) => <ContentPost key={c._id} content={c} onClick={(id) => setOpenPost(
                    posts.find(el => el._id === id)
                )} />)}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                {meetups.map((c) => <ContentMeetup key={c._id} content={c} onClick={(id) => setOpenMeetup(
                    meetups.find(el => el._id === id)
                )} />)}
            </Grid> */}
            <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                <NewPost
                    show={newPost}
                    setShow={openNewPost}
                    postModel={postModel}
                />
            </Suspense>
            <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                <NewMeetup
                    show={newMeetup}
                    setShow={openNewMeetup}
                    meetupModel={meetupModel}
                />
            </Suspense>
            <Drawer anchor="bottom" open={kudos} onClose={() => openKudos(false)}>
                Em construção
            </Drawer>
            <Drawer anchor="bottom" open={profile} onClose={() => openProfile(false)}>
                <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                    <Profile />
                </Suspense>
            </Drawer>
            <Drawer anchor="bottom" open={practice} onClose={() => openPractice(false)}>
                <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                    <Practice />
                </Suspense>
            </Drawer>
            <Drawer anchor="bottom" open={!!openPost || false} onClose={() => setOpenPost(undefined)}>
                <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                    {!!openPost && <Post close={() => setOpenPost(undefined)} content={openPost as IPostInfo} />}
                </Suspense>
            </Drawer>
            <Drawer anchor="bottom" open={!!openMeetup || false} onClose={() => setOpenMeetup(undefined)}>
                <Suspense fallback={<Typography variant="overline" display="block" gutterBottom>A carregar....</Typography>}>
                    {!!openMeetup && <Meetup content={openMeetup as IMeetupInfo} />}
                </Suspense>
            </Drawer>
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
        </React.Fragment>
    );
}
