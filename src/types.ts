export interface IRouteConfig {
    route: string;
    proxy?: string;
    union?: {[key:string]: string};
    first?: Array<string>;
    cache: number;
    timeout: number;
    retries: number;
    factor: number;
}

export interface IJsonApiObject {
    meta?: {[key:string]: any},
    included?: Array<any>,
    errors?: Array<string>,
}
