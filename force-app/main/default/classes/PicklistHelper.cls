public with sharing class PicklistHelper {
    public PicklistHelper() {

    }

    

    // @AuraEnabled(cacheable=true)
    // public static void getAccountId(Id id){
    //     Id idOfSelectedAcc;
    //     Id i = Id.valueOf(id);
    //     idOfSelectedAcc = i;
    // }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getAccounts(){
        Map<String,String> accountMap = new Map<String,String>();
        for(Account accountObj:[select id,name from Account]){
            accountMap.put(accountObj.Id, accountObj.Name);
        }
        return accountMap;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsOfSelectedAccount(Id accId) {
        return [
            select FirstName, LastName, Email from Contact where AccountId=:accId
        ];
    }

    // @AuraEnabled(cacheable=true)
    // public static Map<String,String> getProfiles(){
    //     Map<String,String> profileMap = new Map<String,String>();
    //     for(Profile profileObj:[select id,name from Profile]){
    //         profileMap.put(profileObj.Id, profileObj.Name);
    //     }
    //     return profileMap;
    // }    
}
