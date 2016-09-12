import { inject } from 'aurelia-framework';

export class App {
    constructor() {

    }

    configureRouter(config, router) {
        config.options.pushState = true;

        config.options.root = '/';
        config.title = "Lady Hedone";

        config.map([
            { route: [''],    name: 'home',   moduleId: 'home',   nav: true, title: 'Home'},
            { route: 'work',  name: 'slider', moduleId: 'slider', nav: true, title: 'Slider'},
            { route: 'about', name: 'about',  moduleId: 'about',  nav: true, title: 'About'}
        ]);

        this.router = router;
        console.log("nav:", this.router.navigation);
    }

}
