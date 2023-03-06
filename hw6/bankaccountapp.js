window.onload = onDocumentLoaded;
function onDocumentLoaded() {
    // Note: not using the localStorage, or the Account class for transfer between pages
    let createAccountElement = document.getElementById("create-button");
    //Main window
    if(!!createAccountElement) {
        parentWindowInit();
    }
    let updateAccountElement = document.getElementById("submit");
    // child window
    if(!!updateAccountElement) {        
        childWindowInit();
    }
}

// Note class does not access any UI elements.
class Account {
    static #accountInfoList = [];
    balance = 0;
    constructor(accountName, depositAmount) {
        if(accountName === ""){
            throw new Error("Account Name cannot be empty.")
        }
        if(isNaN(depositAmount) || depositAmount <= 0){
            throw new Error("Deposit amount should be greater than 0, and should be a number.")
        }        
        this.accountName = accountName;
        this.balance += depositAmount;
    }
    static addAccount(accountName, depositAmount){        
        this.#accountInfoList.push(new Account(accountName, depositAmount));
        this.#saveToLocalStorage();        
    }
    static #saveToLocalStorage(){
        localStorage.setItem("account-list", JSON.stringify(this.#accountInfoList));
    }
    static loadAccounts(){
        let accountsList = localStorage.getItem("account-list");
        if(accountsList != undefined || accountsList != null) {
            this.#accountInfoList = JSON.parse(localStorage.getItem("account-list"));
        }
    }
    static getAccountsInfoString() {
        let accountsString = "";
        for(var i = 0; i < this.#accountInfoList.length; i++) {
            accountsString += "Account Name: " + this.#accountInfoList[i].accountName + " ";
            accountsString += "Balance: " + this.#accountInfoList[i].balance + "\n";
        }
        return accountsString;
    }
    static getAccountsNamesArray(){
        return this.#accountInfoList.map(x => x.accountName);
    }

    static deposit(accountName, amount){
        for(var i = 0; i < this.#accountInfoList.length; i++) {
            if(accountName == this.#accountInfoList[i].accountName){
                this.#accountInfoList[i].balance = parseFloat(this.#accountInfoList[i].balance) + amount;
            }
        }
        this.#saveToLocalStorage();
    }

    static debit(accountName, amount){
        for(var i = 0; i < this.#accountInfoList.length; i++) {
            if(accountName == this.#accountInfoList[i].accountName){
                this.#accountInfoList[i].balance = parseFloat(this.#accountInfoList[i].balance) - amount;
            }
        }
        this.#saveToLocalStorage();
    }
}

depositClicked = function() {
    window.open("depositdebit.html?action=deposit&accounts=" + Account.getAccountsNamesArray().join(","));
}

debitClicked = function() {
    window.open("depositdebit.html?action=debit&accounts=" + Account.getAccountsNamesArray().join(","));
}

createAccountClicked = function() {
    let accountNameElem = document.getElementById("account-name");
    let depositAmountElem = document.getElementById("deposit-amount");
    const accountName = accountNameElem.value;
    let depositAmount = parseFloat(depositAmountElem.value);
    try{
        Account.addAccount(accountName, depositAmount);
        displayAccounts();
    } catch(err){
        alert(err);
    }
}
displayAccounts = function() {    
    document.getElementById("account-list").value = Account.getAccountsInfoString();
}

parentWindowInit = function() {
    let createAccountElement = document.getElementById("create-button");
    createAccountElement.onclick = createAccountClicked;
    Account.loadAccounts();
    displayAccounts();
    document.getElementById("debit-button").onclick = debitClicked;
    document.getElementById("deposit-button").onclick = depositClicked;
    // Note: not using the localStorage, or the Account class for transfer between pages
    const queryString = window.location.search;
    if(!!queryString) {
        const urlParams = new URLSearchParams(queryString);
        if(!!urlParams) {
            const account = urlParams.get('account');
            const action = urlParams.get('action');
            const amount = urlParams.get('amount');
            if(!!action && !!account && !! amount){
                if(action == "deposit"){
                    Account.deposit(account, amount);
                } else {
                    Account.debit(account, amount);
                }
                displayAccounts();
            }
            else {
                alert("Account, action and amount should be present.")
            }
        }
    }
}

childWindowButtonState = function() {
    var selectElement = document.getElementById("account");
    var amountElement = document.getElementById("amount");
    let amount = parseFloat(amountElement.value);
    document.getElementById("submit").disabled = true;
    if(isNaN(amount)){
        return;
    }
    for(var childElementIndex in selectElement.selectedOptions){
        if(selectElement.selectedOptions[childElementIndex].selected &&
           selectElement.selectedOptions[childElementIndex].innerText != ""){
            document.getElementById("submit").disabled = false;
            return;
        }
    }    
}

childWindowInit = function() {
    // Note: not using the localStorage, or the Account class for transfer between pages
    const queryString = window.location.search;
    if(!!queryString) {
        const urlParams = new URLSearchParams(queryString);
        if(!!urlParams) {
            const accounts = urlParams.get('accounts');
            const action = urlParams.get('action');
            if(!!action){
                document.getElementById("action").value = action;
                document.getElementById("div-action").innerText = action.toUpperCase();
            }
            if(!!accounts){
                let accountArray = accounts.split(",");
                let accountsListElem = document.getElementById("account");
                for(var i = 0; i< accountArray.length; i++) {
                    let option = document.createElement('option');
                    option.value = accountArray[i];
                    option.innerText = accountArray[i];
                    accountsListElem.appendChild(option);
                }                
            }
        }
    }
    document.getElementById("account").onchange = childWindowButtonState;
    document.getElementById("amount").onchange = childWindowButtonState;
    document.getElementById("submit").disabled = true;
}