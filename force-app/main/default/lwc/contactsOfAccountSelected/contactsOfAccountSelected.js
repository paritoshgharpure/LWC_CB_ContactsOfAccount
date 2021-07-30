import { LightningElement, wire, track } from 'lwc';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import TYPE_FIELD from '@salesforce/schema/Account.Type';
//import getProfiles from '@salesforce/apex/PicklistHelper.getProfiles';
import getAccounts from '@salesforce/apex/PicklistHelper.getAccounts';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContactsOfSelectedAccount from '@salesforce/apex/PicklistHelper.getContactsOfSelectedAccount';
import {refreshApex} from '@salesforce/apex';


const COLUMNS = [
    { label: 'FirstName', fieldName: FIRST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'LastName', fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];


export default class ComboboxBasic extends LightningElement {

    accountOptionsList;
    selectedAccount;
    @track contacts=[];
    error;
    contactResponse;

    @wire(getAccounts)
    retrieveAccounts({error,data}){
        let tempArray = [];
        if(data){
            for(let key in data){
                tempArray.push({label:data[key],value:key});
            }
            this.accountOptionsList = tempArray;
            console.log(this.accountOptionsList);
        }
    }

    handleAccountChange(event){
        this.selectedAccount = event.target.value;
        refreshApex(this.contactResponse);        
    }

    columns = COLUMNS;
    @wire(getContactsOfSelectedAccount,{ accId: '$selectedAccount' })
    wiredContacts(response) {
        this.contactResponse = response;
        let error = response && response.error;
        let data = response && response.data;

        if (data) {
            this.contacts = data;
        } else if (error) {
            this.error = error;
        }
    }

    get ifAnyContactsFound(){
        return this.contacts.length;
    }  
}