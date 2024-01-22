export interface RouteConfig {
    route: string;
    proxy?: string;
    union?: Map<string, string>
    first?: Array<string>;
    cache: number;
    timeout: string;
    retries: number;
    factor: number;
}
