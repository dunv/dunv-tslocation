import QueryString, { parse as qsParse, stringify as qsStringify } from 'qs';

/**
 * Lightweight helper for reading url-params
 * (for usage with the history library -> react-router-dom)
 * @param search from history.location.search
 */
export const parseParams = (search: string): QueryString.ParsedQs => {
    if (search.startsWith('?')) search = search.substring(1);
    return qsParse(search, { strictNullHandling: true });
};

/**
 * Lightweight helper for modifying url-params
 * @param search from history.location.search
 * @param newParams new params to set
 */
export const assignParams = (
    search: string,
    modify?: {
        add?: QueryString.ParsedQs;
        remove?: string[];
    }
): string => {
    const params = parseParams(search);
    if (modify?.add) {
        Object.assign(params, modify.add);
    }
    if (modify?.remove) {
        modify.remove.forEach((param) => delete params[param]);
    }
    return qsStringify(params);
};
