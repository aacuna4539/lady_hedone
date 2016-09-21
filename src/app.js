import {inject} from 'aurelia-framework';

export class App {
    constructor() { }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.options.root = '/';
        config.title = "Lady Hedone";
        config.addPreRenderStep(PreRenderStep);



        config.map([
            { route: [''],    name: 'landing', moduleId: 'landing',   nav: true,     title: 'Home' },
            { route: 'work',  name: 'slider',  moduleId: 'slider',    nav: true,     title: 'Work' },
            { route: 'about', name: 'about',   moduleId: 'about',     nav: true,     title: 'About'}
        ]);

        this.router = router;
    }
}

/* TODO: finish implementing this */
class PreRenderStep {
    run(navigationInstruction, next) {
        let imgUrl = navigationInstruction.fragment === '/about' ? "src/img/forest.jpg" : "src/img/bg2.jpg";
        this.setBgImage(imgUrl);
        return next();
    }

    setBgImage(imgUrl) {
        return (() => {
            Array
                .from($('.hero > div'))
                .forEach((el, idx, arr) => {
                    el.style.backgroundImage = 'url(' + imgUrl + ')';
                })
        })();
    }
}
