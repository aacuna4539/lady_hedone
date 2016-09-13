/**
 * Created by rigel on 9/10/16.
 */
import { SliderService } from 'services/SliderService';
import { inject } from 'aurelia-framework'
import { PhotoService } from 'services/PhotoService';

@inject(SliderService, PhotoService)
export class Slider {
    constructor(sSvc, pSvc) {
        this.sSvc = sSvc;
        this.pSvc = pSvc;
    }

    activate() {
        this.pSvc.getPhotos();
    }

    attached() {
        this.sSvc.sliderInit();
    }
} 
