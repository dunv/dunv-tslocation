import { LocationProps, Params } from './models';
import { History, createBrowserHistory, LocationDescriptorObject } from 'history';
import { parse as qsParse, stringify as qsStringify } from 'qs';

export class LocationStore {
    private static instance: LocationStore;
    private _history: History;

    private constructor() {
        this._history = createBrowserHistory();
    }

    public static get(): LocationStore {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new LocationStore();
        return this.instance;
    }

    public getParams(): Params {
        let { search } = this._history.location;
        if (search[0] === '?') {
            search = search.slice(1);
        }
        return qsParse(search, { strictNullHandling: true });
    }

    private syncHistory(path: string | null, params?: Params): void {
        if (!path) {
            path = this._history.location.pathname;
        }
        if (!params) {
            params = this.getParams();
        }

        const newLocation: LocationDescriptorObject = {
            pathname: path,
            search: qsStringify(params),
        };

        this._history.push(newLocation);
    }

    public setPath(path: string): void {
        this.syncHistory(path);
    }

    public setParam(key: string, value: string): void {
        const params = this.getParams();
        params[key] = value;
        this.syncHistory(null, params);
    }

    public setParams(newParams: Params): void {
        const params = this.getParams();
        Object.assign(params, newParams);
        this.syncHistory(null, params);
    }

    public unsetParam(key: string): void {
        const params = this.getParams();
        delete params[key];
        this.syncHistory(null, params);
    }

    public unsetParams(removedParams: Params): void {
        const params = this.getParams();
        Object.keys(removedParams).forEach((key: string) => {
            delete params[key];
        });
        this.syncHistory(null, params);
    }

    public setPathAndUnsetParam(path: string, key: string): void {
        const params = this.getParams();
        delete params[key];
        this.syncHistory(path, params);
    }

    public setPathAndUnsetParams(path: string, removedParams: Params): void {
        const params = this.getParams();
        Object.keys(removedParams).forEach((key: string) => {
            delete params[key];
        });
        this.syncHistory(path, params);
    }

    public setPathAndSetParam(path: string, key: string, value: string): void {
        const params = this.getParams();
        params[key] = value;
        this.syncHistory(path, params);
    }

    public setPathAndSetParams(path: string, newParams: Params): void {
        const params = this.getParams();
        Object.assign(params, newParams);
        this.syncHistory(path, params);
    }

    public get history(): History {
        return this._history;
    }

    public get props(): LocationProps {
        return {
            path: this._history.location.pathname,
            params: this.getParams(),
        };
    }
}
