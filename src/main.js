import 'fetch';
import environment from './environment';
import { HttpClient } from 'aurelia-fetch-client';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
    warnings: {
        wForgottenReturn: false
    } 
});

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('resources');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    let container = aurelia.container;
    let httpClient  = new HttpClient();

    httpClient.configure( config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('')
            .withDefaults({
                credentials: '',
                headers: {
                    '': ''
                }
            })
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request;
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                }
            });
    });

    container.registerInstance(HttpClient);
    aurelia.start().then(() => aurelia.setRoot());
}
