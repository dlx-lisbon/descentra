// orbitdb store structure
interface IContentInfo {
    _id?: string;
    slug: string;
    title: string;
    author: string;
    date: number;
    coverImage?: string;
}

export interface IPostInfo extends IContentInfo {
    content: string;
}

export interface INavbarItem {
    key: string;
    loginRequired: boolean;
    onlyAdmin: boolean;
    onClick: () => void;
    children: React.ReactNode;
}
