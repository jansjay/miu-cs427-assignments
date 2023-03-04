window.onload = documentLoaded;
let textListElem = null;
let timer = null;

function documentLoaded(){
    textListElem = document.getElementById("text-list");
    document.getElementById("decoration-button").onclick = buttonOnClick;
    document.getElementById("decoration-bling").onchange = blingDecorations;
    document.getElementById("igpay-atinlay-button").onclick = buttonIgpayAtinlayOnClick;
    document.getElementById("malkovitch-button").onclick = buttonMalkovitchOnClick;
}

function buttonOnClick() {
    if(timer === null) {
        timer = setInterval(biggerDecorations, 2000);
    }
    else {
        clearInterval(timer);
        timer = null;
    }
}

function buttonIgpayAtinlayOnClick() {
    if(textListElem == null) return;
    textListElem.value = pigLatin(textListElem.value);
}

function buttonMalkovitchOnClick() {
    if(textListElem == null) return;
    textListElem.value = malkovitch(textListElem.value);
}

function biggerDecorations() {
    if(textListElem == null) return;
    let fontSize = parseInt(window.getComputedStyle(textListElem).getPropertyValue("font-size"));
    if(!!fontSize) {
        fontSize += 2;
    } else {
        fontSize = 24;
    }
    textListElem.style.fontSize =  fontSize + "pt";
}

function blingDecorations(){
    if(textListElem == null) return;
    textListElem.style.fontWeight = "bold";
    textListElem.style.color = "green";
    textListElem.style.textDecoration = "underline";
    document.body.style.backgroundImage = "url('http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')";
}

function pigLatin(stringValue) {
    let words = stringValue.split(' ');
    let pigLatin = [];
    const wordCharacters = new RegExp("([a-zA-Z]){1}");
    const vowelCharacters = new RegExp("^[AEIOUaeiou]");
    for(let word of words) {
        if(vowelCharacters.test(word)){
            pigLatin.push(word + "ay");
        } else {
               if(wordCharacters.test(word)){
                pigLatin.push(word.substring(1) + word[0] + "ay"); 
            } else {
                pigLatin.push(word);
            }
        }
    }
    return pigLatin.join(" ");
}

function malkovitch(stringValue) {
    let words = stringValue.split(' ');
    let malkovitchTexts = [];
    const wordCharacters = new RegExp("([a-zA-Z]){5}");
    for(let word of words) {
        if(wordCharacters.test(word)){
            malkovitchTexts.push("malkovitch"); 
        } else {
            malkovitchTexts.push(word);
        }        
    }
    return malkovitchTexts.join(" ");
}
