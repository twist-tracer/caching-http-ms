import {AxiosInstance, AxiosResponse} from "axios";
import IProxyService from "./IProxyService.ts";

export default class ProxyService implements IProxyService {
    private client: AxiosInstance;

    constructor(proxyClient: AxiosInstance) {
        this.client = proxyClient;
    }

    async simpleProxy (url: string): Promise<any> {
        const proxyResult: AxiosResponse = await this.client.get(url);

        return proxyResult.data
    }

    async unionProxy (map: {[key:string]: string}): Promise<any> {
        let result: {[key:string]: {}} = {};

        for (let key in map) {
            const proxyResult: AxiosResponse = await this.client.get(map[key]);

            result[key] = proxyResult.data
        }

        return result
    }

    async firstProxy (urls: Array<string>): Promise<any> {
        const proxyResult = await Promise.any(urls.map(
            (url) => this.client.get(url)
        ))

        return proxyResult.data
    }
}
