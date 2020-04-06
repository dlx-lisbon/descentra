import React, { useEffect, useState } from 'react';
import ContentPost from './components/content/ContentPost';
import { startIpfsInstance } from './helpers/ipfsFactory';
import PostModel from './helpers/orbitdb/PostModel';
import { store } from './helpers/orbitdb/store';
import { IMeetupInfo, IPostInfo } from './interfaces';
import MeetupModel from './helpers/orbitdb/MeetupModel';
import ContentMeetup from './components/content/ContentMeetup';
import { Grid, Container, CssBaseline, makeStyles } from '@material-ui/core';
import Navbar, {NavbarItem} from './components/navbar/Navbar';

// const Profile = React.lazy(() => import('./components/drawers/Profile'));
// const NewContent = React.lazy(() => import('./components/drawers/NewContent'));
// const NewMeetup = React.lazy(() => import('./components/drawers/NewMeetup'));
// const Practice = React.lazy(() => import('./components/drawers/Practice'));
// const Post = React.lazy(() => import('./components/drawers/Post'));

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
    // drawers and modals
    // const [kudos, openKudos] = useState<boolean>(false);
    const [, openProfile] = useState<boolean>(false);
    // const [mintKudo, openMintKudo] = useState<boolean>(false);
    // const [practice, openPractice] = useState<boolean>(false);
    // const [newContent, openNewContent] = useState<boolean>(false);
    // const [newMeetup, openNewMeetup] = useState<boolean>(false);
    // open post
    const [, setOpenPost] = useState<string>('');
    const [, setIsOpenPost] = useState<boolean>(false);
    // blockchain variables
    // const [userSigner, setUserSigner] = useState<ethers.providers.JsonRpcSigner>(undefined as any);
    // const [dlxInstance, setDLXInstance]
    //     = useState<ethers.Contract & DLXInstance>(undefined as any);
    // const [kudosCoreInstance, setKudosInstance]
    //     = useState<ethers.Contract & KudosInstance>(undefined as any);
    // const [usingProvider, setUsingProvider] = useState<any>(undefined);
    // posts
    const [posts, setPosts] = useState<[IPostInfo]>([] as any);
    const [meetups, setMeetups] = useState<[IMeetupInfo]>([] as any);
    const [, setIpfs] = useState<any>(undefined);
    const [, setPostModel] = useState<PostModel>(undefined as any);
    const [, setMeetupModel] = useState<MeetupModel>(undefined as any);

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

    const handleOpenPost = (id: string) => {
        setOpenPost(id);
        setIsOpenPost(true);
    };

    const navbarItems: NavbarItem[] = [
        { 
            onClick: () => {},
            children: (<>
                <span role="img" aria-label="memo">📝</span>
                Novo Conteúdo
            </>),
        },
        { 
            onClick: () => {},
            children: (<>
                <span role="img" aria-label="memo">🤖</span>
                Novo Meetup
            </>),
        },
        { 
            onClick: () => {},
            children: (<>
                <span role="img" aria-label="flexed-biceps">💪</span>
                Praticar
            </>),
        },
        { 
            onClick: () => {},
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
                <Navbar items={navbarItems} />
                <Grid container spacing={3}>
                    {
                        loadingPostModel && (
                            <Grid item xs={6}>
                                <img alt="loading fish" width="80%" src="img/fish_loading.gif" />
                            </Grid>
                        )
                    }
                    <Grid item xs={12} sm={12} md={6}>
                        {posts.map((c) => <ContentPost key={c._id} content={c} onClick={handleOpenPost} />)}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {meetups.map((c) => <ContentMeetup key={c._id} content={c} onClick={handleOpenPost} />)}
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth='xl' style={{ height: '35px', backgroundColor: 'black', color: 'white', padding: '5px' }}>
                DLX 2020 <span role="img" aria-label="ok-hand">👌</span>
            </Container>
        </React.Fragment>
    );
}
