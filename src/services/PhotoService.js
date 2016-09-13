/**
 * Created by rigel on 9/11/16.
 */


import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class PhotoService {
    constructor(http) {
        this.http = http;
    } 

    getPhotos() {
        /*this.http.fetch('photos')
         .then( response => reponse.json())
         .then( console.log(`response: ${response}`))
         .catch( error => {
         alert('Error. . .');
         });*/

    }
}