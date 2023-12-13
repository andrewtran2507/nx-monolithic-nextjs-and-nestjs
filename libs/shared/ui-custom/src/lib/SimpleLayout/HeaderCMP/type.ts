export interface TMenuItem {
  id: string;
  name: string;
  url: string;
  child?: TMenuItem[];
};
