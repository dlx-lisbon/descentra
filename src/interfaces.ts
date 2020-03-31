interface IContentInfo {
    _id?: string;
    title: string;
    author: string;
    date: number;
    coverImage?: string;
}
export interface IPostInfo extends IContentInfo {
    content: string;
}
export interface IMeetupInfo extends IContentInfo {
    status: boolean;
    description: string;
    location: string;
}
