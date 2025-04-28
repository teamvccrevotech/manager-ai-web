export const SORT_LIST = [
  {value: "lastUsed", name: "workspace.lastUsed"},
  {value: "createdDate", name: "workspace.createdDate"},
  {value: "alphabet", name: "workspace.alphabet"},
]
export interface SearchObject {
  orderBy?: string;
  pageSize?: number;
  pageIndex?: number;
  isAsc?: boolean;
  searchAgent?: string;
}

export const LANGUAGE_OPTIONS = [
  {value: "vi", name: "Tiếng Việt", flag: "fi fi-vn"},
  {value: "en", name: "English", flag: "fi fi-us"}
]
