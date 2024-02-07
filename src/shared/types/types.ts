export type IUser = {
  id: number;
  public_repos: number;
  followers: number;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  login: string;
  name: string;
  html_url: string;
  location: string | null;
  twitter_username: string | null;
};

export type IRepo = {
  id: number;
  stargazers_count: number;
  language: string;
  contributors_url: string;
  name: string;
  full_name: string;
  description: string;
  owner: { login: string };
};

export type ISearchEntity = IRepo | IUser;

export type ISearchListItem = {
  listItemSvgIcon?: Svg;
  onListItemClick: SearchItemOnClickCallback;
};

export type SearchItemOnClickCallback = (
  name: string,
  element: ISearchEntity
) => void;

export type SearchList = ISearchEntity[];

export type Svg = React.FC<React.SVGProps<SVGSVGElement>>;

export type CustomError = {
  status: number;
  message: string;
};

export type ComplexError = Error | CustomError | null;
