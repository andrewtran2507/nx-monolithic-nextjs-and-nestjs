import React, { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { TMenuItem } from '../SimpleLayout/HeaderCMP/type';
import { arrBreadcrumbs, onBreadcrumbsData, pageList } from '../SimpleLayout/HeaderCMP/data';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
}

type TAppBreadcrumbs = {
  childMenuData: TMenuItem[] | null;
  menuId: string;
};

type TBreadcrumbsItem = {
  id: string;
  path: string;
  url?: string;
};

export default function AppBreadcrumbs({
  childMenuData,
  menuId,
}: TAppBreadcrumbs) {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumbsItem[]>([]);

  useEffect(() => {
    setBreadcrumbs(arrBreadcrumbs);
  }, []);

  const breadcrumbsItem = useMemo(() => {
    if (menuId) {
      const data = breadcrumbs?.find(data => data.id === menuId);
      return data ? data?.path?.split(', ') : null;
    }
  }, [menuId, breadcrumbs]);

  return (
    <div
      className="app-breadcrumbs-cus"
      role="presentation"
      onClick={handleClick}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {
          breadcrumbsItem && breadcrumbsItem.map((catalog: string) => (<div key={`${catalog}`}><StyledBreadcrumb component="a" href="#" label={`${catalog}`} /></div>))
        }
      </Breadcrumbs>
    </div>
  );
}
