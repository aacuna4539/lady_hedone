/**
 * Created by rigel on 9/12/16.
 */
import { inject, TaskQueue } from 'aurelia-framework';
import WOW from 'wow';

/* such wow */
@inject(WOW, TaskQueue)
export class About {
    constructor(wow, taskQueue) { // so impress
        this.wow = new WOW( // wow
            {
                boxClass:     'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset:       0,          // distance to the element when triggering the animation (default is 0)
                mobile:       true,       // trigger animations on mobile devices (default is true)
                live:         true,       // act on asynchronously loaded content (default is true)
                callback:     function() {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            }
        );

        this.taskQueue = taskQueue;
    }

    attached() {
        this.taskQueue.queueMicroTask(() => {
            this.wow.init(); // much init
        });
    }
}