import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import HeaderCMP from './HeaderCMP';
import FooterCMP from './FooterCMP';
import { drawerWidth } from './HeaderCMP/data';
import { TMenuItem } from './HeaderCMP/type';
import Box from '@mui/material/Box';
import { AppBreadcrumbs } from '@fe-app/shared-ui';
import { useRouter } from 'next/router';

const Main = styled('main')<{
  open?: boolean;
  isShowChild?: boolean;
}>(({ theme, open, isShowChild }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  marginTop: isShowChild ? 99 : 33,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>('');
  const [childMenuData, setChildMenuData] = useState<TMenuItem[] | null>(null);

  useEffect(() => {
    let rMenuId = router.asPath.split('/');
    setMenuId(rMenuId[rMenuId?.length - 1]);
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <HeaderCMP
        open={open}
        setOpen={setOpen}
        childMenuData={childMenuData}
        setChildMenuData={setChildMenuData}
        menuId={menuId}
        setMenuId={setMenuId}
      />
      <Main open={open} isShowChild={childMenuData && childMenuData?.length > 0 ? true : false}>
        <AppBreadcrumbs childMenuData={childMenuData} menuId={menuId} />
        {children}
      </Main>
      <FooterCMP />
    </Box>
  );
}
