import { Menu, MenuItem, AppBar, Toolbar, Typography, Avatar, IconButton, Button } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import React from "react";

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


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

export interface NavbarItem {
    key: string;
    onClick: () => void
    children: React.ReactNode
}

export interface NavbarProps {
    items: NavbarItem[]
    onAvatarClick: () => void
}

export default function Navbar(props: NavbarProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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

    const userAvatarSrc = 'img/unknown_user.svg';
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
                    {props.items.map((navItem: NavbarItem) => (
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
                <Avatar onClick={props.onAvatarClick} src={userAvatarSrc} />
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
                    {props.items.map((navItem: NavbarItem) => (
                        <ListItem button key={navItem.key}>
                            <ListItemText primary={navItem.children} onClick={navItem.onClick} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
}
