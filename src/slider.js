/**
 * Created by rigel on 9/10/16.
 */
import  Flickity  from 'flickity';

export class Slider {
    constructor() {

    }

    activate() {

    }

    attached() {
        (function() {
            let bodyEl = document.body,
                docElem = window.document.documentElement,
                support = { transitions: Modernizr.csstransitions },
            // transition end event name
                transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
                transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
                onEndTransition = function( el, callback ) {
                    let onEndCallbackFn = function( ev ) {
                        if( support.transitions ) {
                            if( ev.target != this ) return;
                            this.removeEventListener( transEndEventName, onEndCallbackFn );
                        }
                        if( callback && typeof callback === 'function' ) { callback.call(this); }
                    };
                    if( support.transitions ) {
                        el.addEventListener( transEndEventName, onEndCallbackFn );
                    }
                    else {
                        onEndCallbackFn();
                    }
                },
                slider = document.querySelector('.stack-slider'),
                stacksWrapper = slider.querySelector('.stacks-wrapper'),
                stacks = [].slice.call(stacksWrapper.children),
                imghero = document.querySelector('.hero__back--mover'),
                flkty, canOpen = true, canMoveHeroImage = true,
                isFirefox = typeof InstallTrigger !== 'undefined',
                win = { width: window.innerWidth, height: window.innerHeight };

            function scrollY() { return window.pageYOffset || docElem.scrollTop; }

            // from http://www.sberry.me/articles/javascript-event-throttling-debouncing
            function throttle(fn, delay) {
                let allowSample = true;

                return e => {
                    if (allowSample) {
                        allowSample = false;
                        setTimeout( () => allowSample = true , delay);
                        fn(e);
                    }
                };
            }

            function init() {
                flkty = new Flickity(stacksWrapper, {
                    wrapAround: true,
                    imagesLoaded: true,
                    initialIndex: 0,
                    setGallerySize: false,
                    pageDots: false,
                    prevNextButtons: false
                });

                // loading images...
                imagesLoaded(stacksWrapper, () => {
                    bodyEl.classList.add('view-init');
                });

                initEvents();
            }

            function initEvents() {
                stacks.forEach( stack => {
                    let titleEl = stack.querySelector('.stack-title');

                    // expand/close the stack
                    titleEl.addEventListener('click', ev => {
                        ev.preventDefault();
                        if( stack.classList.contains('is-selected') ) { // current stack
                            if( bodyEl.classList.contains('view-full') ) { // stack is opened
                                let closeStack = () => {
                                    bodyEl.classList.remove( 'move-items');

                                    onEndTransition(slider, () => {
                                        bodyEl.classList.remove('view-full');
                                        bodyEl.style.height = '';
                                        flkty.bindDrag();
                                        flkty.options.accessibility = true;
                                        canMoveHeroImage = true;
                                    });
                                };

                                // if the user scrolled down, let's first scroll all up before closing the stack.
                                let scrolled = scrollY();
                                if( scrolled > 0 ) {
                                    smooth_scroll_to(isFirefox ? docElem : bodyEl || docElem, 0, 500).then(() => closeStack());
                                }
                                else {
                                    closeStack();
                                }
                            }
                            else if( canOpen ) { // stack is closed
                                canMoveHeroImage = false;
                                bodyEl.classList.add('view-full');
                                setTimeout( () => bodyEl.classList.add('move-items'), 25);
                                bodyEl.style.height = stack.offsetHeight + 'px';
                                flkty.unbindDrag();
                                flkty.options.accessibility = false;
                            }
                        }
                        else if( stack.classList.contains('stack-prev') ) {
                            flkty.previous(true);
                        }
                        else if( stack.classList.contains('stack-next') ) {
                            flkty.next(true);
                        }
                    });

                    titleEl.addEventListener('mouseenter', function(ev) {
                        if( stack.classList.contains('is-selected') ) {
                            canMoveHeroImage = false;
                            imghero.style.WebkitTransform = 'perspective(1000px) translate3d(0,0,0) rotate3d(1,1,1,0deg)';
                            imghero.style.transform = 'perspective(1000px) translate3d(0,0,0) rotate3d(1,1,1,0deg)';
                        }
                    });

                    titleEl.addEventListener('mouseleave', function(ev) {
                        // if current stack and it's not opened..
                        if( stack.classList.contains('is-selected') && !bodyEl.classList.contains('view-full') ) {
                            canMoveHeroImage = true;
                        }
                    });
                });

                window.addEventListener('mousemove', throttle( ev => {
                    if( !canMoveHeroImage ) return false;
                    let xVal = -1/(win.height/2)*ev.clientY + 1,
                        yVal = 1/(win.width/2)*ev.clientX - 1,
                        transX = 20/(win.width)*ev.clientX - 10,
                        transY = 20/(win.height)*ev.clientY - 10,
                        transZ = 100/(win.height)*ev.clientY - 50;

                    imghero.style.WebkitTransform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
                    imghero.style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
                }, 100));

                // window resize
                window.addEventListener( 'resize', throttle( ev => {
                    // recalculate window width/height
                    win = { width: window.innerWidth, height: window.innerHeight };
                    // reset body height if stack is opened
                    if( bodyEl.classList.contains('view-full') ) { // stack is opened
                        bodyEl.style.height = stacks[flkty.selectedIndex].offsetHeight + 'px';
                    }
                }, 50));

                // Flickity events:
                flkty.on('cellSelect', () => {
                    canOpen = false;
                    bodyEl.classList.remove('item-clickable');

                    let prevStack = stacksWrapper.querySelector('.stack-prev'),
                        nextStack = stacksWrapper.querySelector('.stack-next'),
                        selidx = flkty.selectedIndex,
                        cellsCount = flkty.cells.length,
                        previdx = selidx > 0 ? selidx - 1 : cellsCount - 1;
                    nextidx = selidx < cellsCount - 1 ? selidx + 1 : 0;

                    if( prevStack ) {
                        prevStack.classList.remove('stack-prev');
                    }
                    if( nextStack ) {
                        nextStack.classList.remove('stack-next');
                    }

                    stacks[previdx].classList.add('stack-prev');
                    stacks[nextidx].classList.add('stack-next');

                });

                flkty.on('dragStart', () => {
                    canOpen = false;
                    bodyEl.classList.remove('item-clickable');
                });

                flkty.on('settle', () => {
                    bodyEl.classList.add('item-clickable');
                    canOpen = true;
                });
            }

            init();
        }());
    }
} 
