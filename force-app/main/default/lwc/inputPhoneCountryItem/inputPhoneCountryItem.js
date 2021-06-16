import { LightningElement,api} from 'lwc';
import {loadStyle } from 'lightning/platformResourceLoader';
import flagsCss from '@salesforce/resourceUrl/flags';

export default class InputPhoneCountryItem extends LightningElement {

    @api countryInfo;
    connectedCallback() {
        Promise.all([
            loadStyle(this, flagsCss + '/css/flag-icon.min.css'),
        ])
            .then(() => {
                console.log('flags css loaded.');
            })
            .catch(error => {
                console.log(error.body.message);
            });
    }

    get flagCss(){
        return `flag-icon flag-icon-${this.countryInfo.countryCode}`;
    }

    handleCountrySelected(event){
        const selectedEvent = new CustomEvent('countryselected', { detail: this.countryInfo});

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}