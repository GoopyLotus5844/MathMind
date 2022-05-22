import React from "react";
import {
    Drawer,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../actions/index";
import { ThemeType } from "../definitions/ThemeType";
import { ReduxState } from "../definitions/ReduxState";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop: "5rem",
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const PageWrapper = (props: Props) => {
    const themeType = useSelector((state: ReduxState) => state.theme);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getThemeIcon = () => {
        if (themeType === ThemeType.Light) return <Brightness7Icon />;
        else return <Brightness4Icon style={{ color: "#FFF" }} />;
    };

    const updateTheme = () => {
        dispatch(
            changeTheme(
                themeType === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
            )
        );
        if (themeType === ThemeType.Light) localStorage.setItem("theme", "1");
        else localStorage.setItem("theme", "0");
    };

    return (
        <div>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        MathMind
                    </Typography>
                    <IconButton onClick={updateTheme}>
                        {getThemeIcon()}
                    </IconButton>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/account/google-login")}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon></ChevronLeftIcon>
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        key={"PracticeButton"}
                        onClick={() => navigate("/")}
                    >
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Practice"} />
                    </ListItem>
                    <ListItem
                        button
                        key={"StatsButton"}
                        onClick={() => navigate("/stats")}
                    >
                        <ListItemIcon>
                            <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Stats"} />
                    </ListItem>
                    <ListItem
                        button
                        key={"SettingsButton"}
                        onClick={() => navigate("/")}
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>{props.children}</Main>
        </div>
    );
};
