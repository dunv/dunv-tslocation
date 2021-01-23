import { useHistory, useLocation } from 'react-router-dom';
import { assignParams, parseParams } from './helpers';
import { Modify } from './types';

export const useAssignParams = (): ((modify: Modify) => void) => {
    const history = useHistory();
    const location = useLocation();
    return (modify: Modify): void => {
        history.push(`${location.pathname}?${assignParams(location.search, modify)}`);
    };
};

export const useStringParam = (key: string): string | undefined => {
    const location = useLocation();
    const params = parseParams(location.search);
    if (params[key]) {
        return params[key] as string;
    }
    return undefined;
};

export const useNumberParam = (key: string): number | undefined => {
    const location = useLocation();
    const params = parseParams(location.search);
    if (params[key]) {
        const parsed = Number(params[key]);
        if (isNaN(parsed)) {
            return undefined;
        }
        return parsed;
    }
    return undefined;
};
