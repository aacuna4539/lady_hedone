/**
 * Created by rigel on 9/10/16.
 */
import { bindable } from 'aurelia-framework';

 export class HeaderNav {
     @bindable router;

     created(view /* ref to containing view */) {

     }

     bind(bindingContext /* parent vm */, overrideContext) {
         console.log('bindingCtxt: ', bindingContext);
         console.log('ovrdCtxt: ', overrideContext);
     }

     attached() {

     }

     detached() {

     }

     // called when custom el is pulled out of the dom by the framework
     unbind() {

     }

 }



