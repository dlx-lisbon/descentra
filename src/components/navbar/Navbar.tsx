import {
    AppBar,
    Toolbar,
    Avatar,
    IconButton,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import makeBlockie from 'ethereum-blockies-base64';
import {
    INavbarItem,
} from "../../interfaces";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        right: 0,
    },
    grow: {
        flexGrow: 1,
    },
    logo: {
        height: 60,
        paddingRight: '1rem'
    },
    toolbar: {
        flexWrap: "wrap",
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appBar: {
        display: 'contents',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    burgerOpenMenuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

export interface NavbarProps {
    items: INavbarItem[];
    onAvatarClick: () => void;
}

export default function Navbar(props: NavbarProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const [loggedin, setLoggedin] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userBlockie, setUserBlockie] = useState<string>('img/unknown_user.svg');

    useEffect(() => {
        const verifyLoggedIn = () => {
            try {
                if ((window as any).ethereum !== undefined &&
                    (window as any).ethereum.selectedAddress !== null) {
                    setUserBlockie(makeBlockie((window as any).ethereum.selectedAddress));
                    setLoggedin(true);
                    setIsAdmin(true); // TODO: check if is admin
                }
            } catch (error) {
                //
            }
        }
        verifyLoggedIn();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
    };

    const navItems = props.items.filter(
        (item) => (item.loginRequired === false || (item.loginRequired === true && loggedin)) &&
            (item.onlyAdmin === false || (item.onlyAdmin === true && isAdmin === true))
    );

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
            color="default"
            elevation={0}
        >
            <Toolbar>
                <div className={classes.sectionDesktop}>
                    <img
                        className={classes.logo}
                        src="img/clown-fish.svg"
                        alt="some clown fish"
                        onClick={closeAll}
                    />
                    {navItems.map((navItem: INavbarItem) => (
                        <Button
                            key={navItem.key}
                            style={{ textTransform: 'none' }}
                            onClick={navItem.onClick}
                        >
                            {navItem.children}
                        </Button>
                    ))}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classes.burgerOpenMenuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className={classes.grow} />
                <Avatar onClick={props.onAvatarClick} src={userBlockie} />
            </Toolbar>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {navItems.map((navItem: INavbarItem) => (
                        <ListItem button key={navItem.key}>
                            <ListItemText primary={navItem.children} onClick={navItem.onClick} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
}
