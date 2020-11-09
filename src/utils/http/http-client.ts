import Axios, { AxiosResponse } from 'axios';
import { Observable, Observer } from 'rxjs';

export interface CustomHttpResponse {
    data: any;
    status: number;
    statusText: string;
}

export class HttpClient {
    constructor() {}

    get(url: string) {
        return new Observable((observer: Observer<CustomHttpResponse>) => {
            Axios.get(url)
                .then((response: AxiosResponse) => {
                    observer.next({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    });
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        })
    }

    post(url: string, param: any) {
        
    }
}