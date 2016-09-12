/**
 * Created by rigel on 9/11/16.
 */

import 'fetch';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class PhotoService {
    constructor(http) {
        http.configure( config => {
            config
                .withBaseUrl('');
        });

        this.http = http;
    }
}