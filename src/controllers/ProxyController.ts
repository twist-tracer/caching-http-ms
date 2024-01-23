import {Request, Response} from "express";
import {AxiosError} from "axios";
import IProxyService from "../services/IProxyService.ts";
import {IJsonApiObject} from "../types.js";

export default class ProxyController {
    private proxyService: IProxyService;

    constructor(proxyService: IProxyService) {
        this.proxyService = proxyService;
    }

    proxy(url: string): (req: Request, res: Response) => void {
        return (req: Request, res: Response): void => {
            console.log(`Handled proxy route: ${req.path}`)

            const jsonApiObject: IJsonApiObject = {
                meta: {
                    proxyType: 'proxy'
                },
            }

            this.proxyService
                .simpleProxy(url)
                .then((proxyRes) => {
                    jsonApiObject.included = [proxyRes]

                    return jsonApiObject;
                })
                .catch((error: AxiosError) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        }
    }

    union(map: {[key:string]: string}): (req: Request, res: Response) => void {
        return (req: Request, res: Response): void => {
            console.log(`Handled union route: ${req.path}`)

            const jsonApiObject: IJsonApiObject = {
                meta: {
                    proxyType: 'proxy'
                },
            }

            this.proxyService
                .unionProxy(map)
                .then((proxyRes) => {
                    jsonApiObject.included = Object.values(proxyRes)

                    return jsonApiObject;
                })
                .catch((error: AxiosError) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        }
    }

    first(urls: Array<string>): (req: Request, res: Response) => void {
        return (req: Request, res: Response): void => {
            console.log(`Handled union route: ${req.path}`)

            const jsonApiObject: IJsonApiObject = {
                meta: {
                    proxyType: 'proxy'
                },
            }

            this.proxyService
                .firstProxy(urls)
                .then((proxyRes) => {
                    jsonApiObject.included = Object.values(proxyRes)

                    return jsonApiObject;
                })
                .catch((error: AxiosError) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        }
    }
}
