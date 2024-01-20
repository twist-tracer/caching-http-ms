import axios from 'axios';
import axiosRetry from 'axios-retry';

export default (timeout, retries, factor) => {
    // Works with custom axios instances
    const client = axios.create({
        timeout: timeout,
    });

    // Exponential back-off retry delay between requests
    axiosRetry(client, {
        retries: retries,
        retryDelay: (retryNumber = 0, _error = undefined) =>  {
            return axiosRetry.exponentialDelay(retryNumber, _error, factor)
        }
    });

    return client;
}
