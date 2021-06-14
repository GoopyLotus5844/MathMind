import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Button } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { change_theme } from '../actions/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    spacer: theme.mixins.toolbar,
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
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
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export const PageWrapper = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const theme_type = useSelector(state => state.theme);
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getThemeIcon = () => {
        if (theme_type == 'dark')
            return <Brightness7Icon />
        else
            return <Brightness4Icon style={{ color: '#FFF' }} />
    }

    const updateTheme = () => {
        if (theme_type == 'light') {
            dispatch(change_theme('dark'));
            localStorage.setItem("theme", 'dark');
        }
        else {
            dispatch(change_theme('light'));
            localStorage.setItem('theme', 'light');
        }
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        MathMind
                    </Typography>
                    <IconButton onClick={updateTheme}>{getThemeIcon()}</IconButton>
                    <Button variant="contained" onClick={() => history.push("/account/google-login")}>Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
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
                    <ListItem button key={"PracticeButton"} onClick={() => history.push("/")}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary={"Practice"} />
                    </ListItem>
                    <ListItem button key={"StatsButton"} onClick={() => history.push("/stats")}>
                        <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                        <ListItemText primary={"Stats"} />
                    </ListItem>
                    <ListItem button key={"SettingsButton"} onClick={() => history.push("/")}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.spacer}/>
                {props.children}
            </main>
        </div>
    );
}