import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Grid,
  ListItemDecorator,
  ListItemContent,
  Box,
  ListItemButton,
} from '@mui/joy';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useState } from 'react';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Keys from '../pages/keys';

enum PagesEnum {
  Home,
  Staff,
  Keys,
  Locks,
  Settings,
}

type Tab = {
  title: string;
  pageName: PagesEnum;
  key: number;
};

const tabs: Array<Tab> = [
  { title: 'Главная', pageName: PagesEnum.Home, key: 0 },
  { title: 'Персонал', pageName: PagesEnum.Staff, key: 1 },
  { title: 'Ключи', pageName: PagesEnum.Keys, key: 2 },
  { title: 'Замки', pageName: PagesEnum.Locks, key: 3 },
  { title: 'Настройки', pageName: PagesEnum.Settings, key: 4 },
];

function getIcon(tab: PagesEnum) {
  switch (tab) {
    case PagesEnum.Home:
      return <HomeRoundedIcon />;
    case PagesEnum.Staff:
      return <GroupsRoundedIcon />;
    case PagesEnum.Keys:
      return <VpnKeyRoundedIcon />;
    case PagesEnum.Locks:
      return <LockRoundedIcon />;
    case PagesEnum.Settings:
      return <SettingsRoundedIcon />;

    default:
      break;
  }
}

// function getPage(tab: PagesEnum) {
//   switch (tab) {
//     case PagesEnum.Home:
//       return <Home />;
//     case PagesEnum.Staff:
//       return <GroupsRoundedIcon />;
//     case PagesEnum.Keys:
//       return <Keys />;
//     case PagesEnum.Locks:
//       return <LockRoundedIcon />;
//     case PagesEnum.Settings:
//       return <SettingsRoundedIcon />;

//     default:
//       break;
//   }
// }

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Root() {
  const [tab, setTab] = useState<PagesEnum>(PagesEnum.Home);

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          ) : (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            height: '100vh',
          }}
        >
          {tabs.map((tab) => {
            return (
              <ListItem
                key={tab.key}
                disablePadding
                sx={
                  tab.pageName === PagesEnum.Settings
                    ? {
                        position: 'absolute',
                        bottom: 6,
                        display: 'block',
                      }
                    : {
                        display: 'block',
                      }
                }
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  disabled={false}
                  selected={false}
                  variant="plain"
                  onClick={() => {
                    setTab(tab.pageName);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(tab.pageName)}
                  </ListItemIcon>
                  <ListItemText primary={tab.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Keys/>
      </Box>
    </Box>
  );
}
