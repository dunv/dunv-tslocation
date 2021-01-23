import QueryString from 'qs';

export interface Modify {
    add?: QueryString.ParsedQs;
    remove?: string[];
}
