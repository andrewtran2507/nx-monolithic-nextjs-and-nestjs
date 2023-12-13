'use client';
import React, { FC, useEffect, useState, MouseEvent, memo } from 'react';
import { useRouter } from 'next/navigation';
import './index.scss';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import BoltTwoTone from '@mui/icons-material/BoltTwoTone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClassIcon from '@mui/icons-material/Class';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { TMenuItem } from './type';
import { pageList, drawerWidth, typoSX, arrBreadcrumbs } from './data';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MenuRenderer: FC<{
  data: TMenuItem[] | [];
  handleClickNavMenu: Function;
  handleOnMouseEnter: Function;
  menuId: string;
}> = ({ data, handleClickNavMenu, handleOnMouseEnter, menuId }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {data.map((page: TMenuItem) => (
        <Button
          className={`btn-menu-item ${menuId === page.id ? 'active' : ''}`}
          key={page?.id}
          onClick={handleClickNavMenu(page)}
          sx={{ my: 2, color: 'white', display: 'block' }}
          size="small"
          onMouseEnter={handleOnMouseEnter(page)}
        >
          {page?.name}
        </Button>
      ))}
    </Box>
  );
};

const MenuMobileRenderer: FC<{
  data: TMenuItem[] | null;
  handleClickNavMenu: Function;
  menuId: string;
}> = ({ data, handleClickNavMenu, menuId }) => {
  return (
    <List>
      {data &&
        data?.map(({ id, name, url, child }) => (
          <div key={id}>
            <ListItem
              disablePadding
              className={`${!child ? 'm-child-item' : 'm-parent-item'} ${menuId === id ? 'active' : ''}`}
            >
              <ListItemButton
                onClick={handleClickNavMenu({ id, name, url, child })}
              >
                <ListItemIcon>
                  {child && child?.length > 0 ? (
                    <ClassIcon />
                  ) : (
                    <KeyboardDoubleArrowLeftIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
            {child && child?.length > 0 && <MenuMobileRenderer data={child} handleClickNavMenu={handleClickNavMenu} menuId={menuId} />}
          </div>
        ))}
    </List>
  );
};

type THeaderCMPProps = {
  open: boolean;
  setOpen: Function;
  childMenuData: TMenuItem[] | null;
  setChildMenuData: Function;
  menuId: string;
  setMenuId: Function;
};

export function HeaderCMP({
  open,
  setOpen,
  childMenuData,
  setChildMenuData,
  menuId,
  setMenuId,
}: THeaderCMPProps) {
  const theme = useTheme();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenNavMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleClickNavMenu =
    (data: TMenuItem) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setMenuId(data.id);
    };

  const handleOnMouseEnter =
    (data: TMenuItem) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (
        data?.child &&
        !childMenuData?.find(
          (d) => d.id === (data?.child as TMenuItem[])[0]?.id,
        )
      ) {
        setChildMenuData(data?.child);
      }
    };
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (menuId) {
      const data = arrBreadcrumbs.find((d) => d.id === menuId);
      if (data?.url) {
        router.push(`/${data && data?.url}`);
      }
    }
  }, [menuId]);
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        className="app-bar-header"
        position="fixed"
        color="warning"
        open={open}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BoltTwoTone sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{ ...typoSX }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <BoltTwoTone sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ...typoSX,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              LOGO
            </Typography>
            <MenuRenderer
              menuId={menuId}
              data={pageList}
              handleClickNavMenu={handleClickNavMenu}
              handleOnMouseEnter={handleOnMouseEnter}
            />

            <Box sx={{ flexGrow: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://haucrafts.com/static/images/products/tui-wayuu-phong-cach-peru-16-mau-sac/IMG_3770.jpg"
              />
            </Box>
          </Toolbar>
        </Container>
        {childMenuData && childMenuData?.length > 0 && (
          <div className="child-menu">
            <Divider className="divide" light={true} />
            <MenuRenderer
              menuId={menuId}
              data={childMenuData}
              handleClickNavMenu={handleClickNavMenu}
              handleOnMouseEnter={handleOnMouseEnter}
            />
          </div>
        )}
      </AppBar>
      <Drawer
        className="app-drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {!isLoading && <MenuMobileRenderer data={pageList} menuId={menuId} handleClickNavMenu={handleClickNavMenu} />}
      </Drawer>
    </Box>
  );
}

export default HeaderCMP;
