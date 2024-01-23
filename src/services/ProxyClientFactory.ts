import axios, {AxiosError, AxiosInstance} from "axios";
import axiosRetry from "axios-retry";
// const axiosRetry = require('axios-retry').default

export default class ProxyClientFactory {
    create(timeout: number, retries: number, factor: number): AxiosInstance {
        const client: AxiosInstance = axios.create({
            timeout: timeout,
        });

        // Exponential back-off retry delay between requests
        axiosRetry(client, {
            retries: retries,
            retryDelay: (retryNumber: number = 0, _error?: AxiosError) =>  {
                return axiosRetry.exponentialDelay(retryNumber, _error, factor)
            }
        });

        return client;
    }
}
