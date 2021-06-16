import { LightningElement } from 'lwc';
import libphonenumber_js from '@salesforce/resourceUrl/libphonenumber_js';
import {loadScript} from 'lightning/platformResourceLoader';

export default class TestGoogleLibPhone extends LightningElement {

    connectedCallback() {
        Promise.all([
            loadScript(this, libphonenumber_js)
        ])
            .then(() => {
               var formatteNbr =  libphonenumber.parsePhoneNumber('6099686271', "US");
               console.log(formatteNbr.format("E.164"));
               console.log(formatteNbr.format("NATIONAL"));
               console.log(formatteNbr.format("INTERNATIONAL"));
            })
            .catch(error => {
                console.log(error);
            });
    }
}