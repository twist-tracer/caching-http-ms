export default interface IProxyService {
    simpleProxy (url: string): Promise<any>

    unionProxy (map: {[key:string]: string}): Promise<any>

    firstProxy (urls: Array<string>): Promise<any>
}
