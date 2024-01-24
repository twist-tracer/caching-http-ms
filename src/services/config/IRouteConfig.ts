export default interface IRouteConfig {
    route: string;
    proxy?: string;
    union?: {[key:string]: string};
    first?: Array<string>;
    cache: number;
    timeout: number;
    retries: number;
    factor: number;
}
