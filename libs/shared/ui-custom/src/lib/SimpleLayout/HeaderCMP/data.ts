import { TBreadcrumbsItem } from "../../AppBreadcrumbs/type";
import { TMenuItem } from "./type";

const pageList: TMenuItem[] = [
  {
    id: 'db5f4a3e-9953-11ee-b9d1-0242ac120002',
    name: 'Menu 1',
    url: '',
    child: [{
      id: 'db5f4d36-9953-11ee-b9d1-0242ac120002',
      name: 'M1 Child 1',
      url: '',
    }, {
      id: 'db5f4e6c-9953-11ee-b9d1-0242ac120002',
      name: 'M1 Child 2',
      url: '',
    },{
      id: 'db5f4f8e-9953-11ee-b9d1-0242ac120002',
      name: 'M1 Child 3',
      url: '',
    }]
  },
  {
    id: 'db5f50b0-9953-11ee-b9d1-0242ac120002',
    name: 'Menu 2',
    url: '',
    child: [{
      id: 'db5f5560-9953-11ee-b9d1-0242ac120002',
      name: 'M2 Child 1',
      url: '',
    }, {
      id: 'db5f5786-9953-11ee-b9d1-0242ac120002',
      name: 'M2 Child 2',
      url: '',
    },{
      id: 'db5f58e4-9953-11ee-b9d1-0242ac120002',
      name: 'M2 Child 3',
      url: '',
    }]
  },
  {
    id: 'db5f5a56-9953-11ee-b9d1-0242ac120002',
    name: 'Menu 3',
    url: '',
    child: [{
      id: 'db5f5c7c-9953-11ee-b9d1-0242ac120002',
      name: 'M3 Child 1',
      url: '',
    }, {
      id: 'db5f5e0c-9953-11ee-b9d1-0242ac120002',
      name: 'M3 Child 2',
      url: '',
    },{
      id: 'db5f5f2e-9953-11ee-b9d1-0242ac120002',
      name: 'M3 Child 3',
      url: '',
    }]
  }
];

const drawerWidth = 180;

const typoSX = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};


const onBreadcrumbsData = (menu: TMenuItem[]) => {
  let arrBreadcrumbs: TBreadcrumbsItem[] = [];
  let textP = '',
    text = '';

  const getBreadcrumbsData = (data: TMenuItem[]) => {
    data.map((d: TMenuItem) => {
      const item: TBreadcrumbsItem = {
        id: d.id,
        path: '',
        url: '',
      };
      if (d.child && d.child.length > 0) {
        textP = !textP ? d.name : `${textP}, ${d.name}`;
        item.path = textP;
        getBreadcrumbsData(d.child);
        textP = textP
          .split(', ')
          .splice(0, textP.split(', ').length - 1)
          .join(', ');
      } else {
        text = `${textP}, ${d.name}`;
        item.path = text;
      }
      item.url = `feature/${item.path?.toLowerCase().replace(', ', '/').replace(/ /g, '-')}/${item.id}`;
      arrBreadcrumbs.push(item);
    });
  };
  getBreadcrumbsData(menu);
  return arrBreadcrumbs;
};

const arrBreadcrumbs = onBreadcrumbsData(pageList);

async function getPostIdList() {
  return arrBreadcrumbs.map(data => ({
    params: {
      slug: data.url?.replace('feature/', '')?.split('/')
    }
  }))
}

export {
  pageList,
  drawerWidth,
  typoSX,
  onBreadcrumbsData,
  arrBreadcrumbs,
  getPostIdList
};
