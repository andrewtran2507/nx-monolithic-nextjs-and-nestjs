import { TMenuItem } from "../SimpleLayout/HeaderCMP/type";

export type TAppBreadcrumbs = {
  childMenuData: TMenuItem[] | null;
  menuId: string;
};

export type TBreadcrumbsItem = {
  id: string;
  path: string;
  url?: string;
};
