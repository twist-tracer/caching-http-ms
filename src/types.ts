export interface IRouteConfig {
    route: string;
    proxy?: string;
    union?: {[key:string]: string}
    first?: Array<string>;
    cache: number;
    timeout: string;
    retries: number;
    factor: number;
}
