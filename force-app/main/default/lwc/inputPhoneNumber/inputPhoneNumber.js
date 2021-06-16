import { LightningElement } from 'lwc';
import {loadScript,loadStyle } from 'lightning/platformResourceLoader';
import flagsCss from '@salesforce/resourceUrl/flags';
import libphonenumber_js from '@salesforce/resourceUrl/libphonenumber_js';
const LIST_OF_COUNTRIES = [

    {countryCode:'gr',name:'Greece',placeholderNumber:'6906754111'},
    {countryCode:'in',name:'India',placeholderNumber:'9840890059'},
    {countryCode:'us',name:'United States',placeholderNumber:'(609) 968-9271'},
]
export default class InputPhoneNumber extends LightningElement {

    showCountrySelector=false;
    currentSelectedCountry = {
        countryCode:'us',
        name:'United States',
        placeholderNumber:'(609) 968-9271'
    }
    countriesAndPhoneNumbers=LIST_OF_COUNTRIES;
    phoneNumber='';

    currentCountryNumberPlaceholder=this.currentSelectedCountry.placeholderNumber;
    get currentSelectedCountryFlag(){
        return `flag-icon flag-icon-${this.currentSelectedCountry.countryCode}`;
    }
    connectedCallback() {

        Promise.all([
            loadScript(this, libphonenumber_js),
            loadStyle(this, flagsCss + '/css/flag-icon.min.css')
        ])
            .then(() => {
                console.log('libphonnumber_js & flags css loaded.');
                var formattedNbr =  libphonenumber.parsePhoneNumber(this.currentSelectedCountry.placeholderNumber, this.currentSelectedCountry.countryCode.toUpperCase());
                this.currentCountryNumberPlaceholder = formattedNbr.format("INTERNATIONAL");
            })
            .catch(error => {
                console.log(error.body.message);
            });
    }

    toggleCountrySelector(event){
        this.showCountrySelector=!this.showCountrySelector;
    }

    handleCountrySelect(event){
        this.currentSelectedCountry=event.detail;
        var formattedNbr =  libphonenumber.parsePhoneNumber(this.currentSelectedCountry.placeholderNumber, this.currentSelectedCountry.countryCode.toUpperCase());
        this.currentCountryNumberPlaceholder = formattedNbr.format("INTERNATIONAL");
        if(this.phoneNumber){
            formattedNbr =  libphonenumber.parsePhoneNumber(this.phoneNumber, this.currentSelectedCountry.countryCode.toUpperCase());
            this.phoneNumber = formattedNbr.format("INTERNATIONAL");
        }
        this.showCountrySelector=false;
    }

    formatPhoneNumber(event){
        if(event.target.value && event.target.value.length>1){
            try{
                var formattedNbr =  libphonenumber.parsePhoneNumber(event.target.value, this.currentSelectedCountry.countryCode.toUpperCase());
                this.phoneNumber = formattedNbr.format("INTERNATIONAL");
            }catch(error){
                //Do nothing as when the user types the number might not be fully complete so might throw an error.
            }

        }

    }

   
}