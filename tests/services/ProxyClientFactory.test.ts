import ProxyClientFactory from "../../src/services/ProxyClientFactory.ts";
import {AxiosInstance} from "axios";

describe("Proxy client factory tests", () => {
    it("should create axios client correctly", () => {
        expect(typeof (new ProxyClientFactory).create(1, 2, 2)).toBeInstanceOf('AxiosInstance')
    });
});
