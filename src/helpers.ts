import { parse as qsParse, stringify as qsStringify } from 'qs';
import { Params } from './models';

/**
 * Lightweight helper for reading url-params
 * (for usage with the history library -> react-router-dom)
 * @param search from history.location.search
 */
export const parseParams = (search: string): Params => {
    if (search.startsWith('?')) search = search.substring(1);
    return qsParse(search, { strictNullHandling: true });
};

/**
 * Lightweight helper for modifying url-params
 * @param search from history.location.search
 * @param newParams new params to set
 */
export const assignParams = (search: string, newParams: Params): string => {
    const params = parseParams(search);
    Object.assign(params, newParams);
    return qsStringify(params);
};
