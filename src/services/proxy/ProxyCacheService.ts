import ProxyService from "services/proxy/ProxyService.ts";
import NodeCache from "node-cache";
import IProxyService from "services/proxy/IProxyService.ts";

export default class ProxyCacheService implements IProxyService {
    private nodeCache: NodeCache;

    private proxyService: ProxyService;

    private ttl: number;

    constructor(
        nodeCache: NodeCache,
        proxyService: ProxyService,
        ttl: number,
    ) {
        this.nodeCache = nodeCache;
        this.proxyService = proxyService;
        this.ttl = ttl;
    }

    private async remember(key: string, callable: () => any): Promise<any> {
        const cachedResult = this.nodeCache.get(key);

        if (cachedResult) {
            return cachedResult
        }

        const result = await callable();

        this.nodeCache.set(key, result, this.ttl)

        return result
    }

    async simpleProxy (url: string): Promise<any> {
        return this.remember(
            `simpleproxy:${url}`,
            () => this.proxyService.simpleProxy(url)
        )
    }

    async unionProxy (map: {[key:string]: string}): Promise<any> {
        return this.remember(
            `unionProxy:${Object.values(map).join(',')}`,
            () => this.proxyService.unionProxy(map)
        )
    }

    async firstProxy (urls: Array<string>): Promise<any> {
        return this.remember(
            `firstProxy:${urls.join(',')}`,
            () => this.proxyService.firstProxy(urls)
        )
    }
}
