import React, { useEffect, useState, Suspense } from 'react';
import ContentPost from './components/content/ContentPost';
import { startIpfsInstance } from './helpers/ipfsFactory';
import PostModel from './helpers/orbitdb/PostModel';
import { store } from './helpers/orbitdb/store';
import { IMeetupInfo, IPostInfo } from './interfaces';
import MeetupModel from './helpers/orbitdb/MeetupModel';
import ContentMeetup from './components/content/ContentMeetup';
import { Grid, Container, CssBaseline, makeStyles, Drawer } from '@material-ui/core';
import Navbar, {NavbarItem} from './components/navbar/Navbar';

const Profile = React.lazy(() => import('./components/drawers/Profile'));
const NewContent = React.lazy(() => import('./components/drawers/NewContent'));
const NewMeetup = React.lazy(() => import('./components/drawers/NewMeetup'));
const Practice = React.lazy(() => import('./components/drawers/Practice'));
const Post = React.lazy(() => import('./components/drawers/Post'));
const Meetup = React.lazy(() => import('./components/drawers/Meetup'));

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: 0,
  },
}));

export default function App() {
    const classes = useStyles()
    // loading
    const [loadingPostModel, setLoadingPostModel] = useState<boolean>(true);
    const [, setReplicatingProgress] = useState<number>(0);
    // orbitdb
    const [, setIpfs] = useState<any>(undefined);
    const [postModel, setPostModel] = useState<PostModel>(undefined as any);
    const [meetupModel, setMeetupModel] = useState<MeetupModel>(undefined as any);
    // drawers and modals
    const [kudos, openKudos] = useState<boolean>(false);
    const [profile, openProfile] = useState<boolean>(false);
    const [practice, openPractice] = useState<boolean>(false);
    const [newContent, openNewContent] = useState<boolean>(false);
    const [newMeetup, openNewMeetup] = useState<boolean>(false);
    const [posts, setPosts] = useState<[IPostInfo]>([] as any);
    const [openPost, setOpenPost] = useState<IPostInfo>();
    const [meetups, setMeetups] = useState<[IMeetupInfo]>([] as any);
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
            await postsDb.load();
            const meetupM = new MeetupModel(
                meetupsDb,
                (progress) => console.log(progress),
                (progress) => setReplicatingProgress(progress),
            );
            meetupM.subscribe(() => setMeetups(meetupM.records));
            await meetupsDb.load();
            setLoadingPostModel(false);
            setPostModel(postM);
            setMeetupModel(meetupM);
        };
        fetchData();
    }, []);

    const navbarItems: NavbarItem[] = [
        {
            onClick: () => openNewContent(true),
            children: (<>
                <span role="img" aria-label="memo">📝</span>
                Novo Conteúdo
            </>),
        },
        {
            onClick: () => openNewMeetup(true),
            children: (<>
                <span role="img" aria-label="memo">🤖</span>
                Novo Meetup
            </>),
        },
        {
            onClick: () => openPractice(true),
            children: (<>
                <span role="img" aria-label="flexed-biceps">💪</span>
                Praticar
            </>),
        },
        {
            onClick: () => openKudos(true),
            children: (<>
                <span role="img" aria-label="hatching-chick">🐣</span>
                Kudos
            </>),
        },
    ]

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='xl' className={classes.root}>
                <Navbar items={navbarItems}  onAvatarClick={() => openProfile(true)} />
                <Grid container spacing={0}>
                    {
                        loadingPostModel && (
                            <Grid item xs={6}>
                                <img alt="loading fish" width="80%" src="img/fish_loading.gif" />
                            </Grid>
                        )
                    }
                    <Grid item xs={12} sm={12} md={6}>
                        {posts.map((c) => <ContentPost key={c._id} content={c} onClick={(id) => setOpenPost(
                            posts.find(el => el._id === id)
                        )} />)}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {meetups.map((c) => <ContentMeetup key={c._id} content={c} onClick={(id) => setOpenMeetup(
                            meetups.find(el => el._id === id)
                        )} />)}
                    </Grid>
                </Grid>
                <Suspense fallback={<div>A carregar...</div>}>
                    <NewContent
                        show={newContent}
                        setShow={openNewContent}
                        postModel={postModel}
                    />
                </Suspense>
                <Suspense fallback={<div>A carregar...</div>}>
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
                    <Suspense fallback={<div>A carregar...</div>}>
                        <Profile />
                    </Suspense>
                </Drawer>
                <Drawer anchor="bottom" open={practice} onClose={() => openPractice(false)}>
                    <Suspense fallback={<div>A carregar...</div>}>
                        <Practice />
                    </Suspense>
                </Drawer>
                <Drawer anchor="bottom" open={!!openPost || false} onClose={() => setOpenPost(undefined)}>
                    <Suspense fallback={<div>A carregar...</div>}>
                        {!!openPost && <Post content={openPost as IPostInfo} />}
                    </Suspense>
                </Drawer>
                <Drawer anchor="bottom" open={!!openMeetup || false} onClose={() => setOpenMeetup(undefined)}>
                    <Suspense fallback={<div>A carregar...</div>}>
                        {!!openMeetup && <Meetup content={openMeetup as IMeetupInfo} />}
                    </Suspense>
                </Drawer>
            </Container>
            <Container maxWidth='xl' style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px' }}>
                DLX 2020 <span role="img" aria-label="ok-hand">👌</span>
            </Container>
        </React.Fragment>
    );
}
