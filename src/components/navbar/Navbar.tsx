import { makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, AppBar, Toolbar, Typography, Avatar, IconButton, Button } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import React from "react";

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
    const [collapseEl, setCollapseEl] = React.useState(null);

    const handleClick = (event: any) => {
        setCollapseEl(event.currentTarget);
    };

    const handleClose = () => {
        setCollapseEl(null);
    };

    const closeAll = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        window.location.reload();
        event.preventDefault();
    };

    const userAvatarSrc = 'img/unknown_user.svg';

    return (
        <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
                <img
                    className={classes.logo}
                    src="img/clown-fish.svg"
                    alt="some clown fish"
                    onClick={closeAll}
                />
                <Typography variant="h6" color="inherit" noWrap >
                    Bem-vindo ao DLX
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    {props.items.map((navItem: NavbarItem) => (
                        <Button key={navItem.key} onClick={navItem.onClick}>
                            {navItem.children}
                        </Button>
                    ))}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={collapseEl}
                    keepMounted
                    open={Boolean(collapseEl)}
                    onClose={handleClose}
                >
                    {props.items.map((navItem: NavbarItem) => (
                        <MenuItem key={navItem.key} onClick={() => {
                            handleClose()
                            navItem.onClick()
                        }}>
                            {navItem.children}
                        </MenuItem>
                    ))}
                </Menu>
                <Avatar onClick={props.onAvatarClick} src={userAvatarSrc} />
            </Toolbar>
        </AppBar>
    );
}
