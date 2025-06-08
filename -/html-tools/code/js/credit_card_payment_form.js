document.addEventListener("DOMContentLoaded", e => {
    let card_number_input = document.querySelector("form fieldset.card-number input"),
        card_number_display = document.querySelector(".card .cc-number");
    
    let card_holder_input = document.querySelector("form fieldset.card-holder input"),
        card_holder_display = document.querySelector(".card .cc-holder");

    let expiry_month_select = document.querySelector("form fieldset.expiry-month > select"),
        expiry_month_display = document.querySelector(".card .expiry-month");
    
    let expiry_year_select = document.querySelector("form fieldset.expiry-year > select"),
        expiry_year_display = document.querySelector(".card .expiry-year");
    
    let cvc_input = document.querySelector("form fieldset.cvc input"),
        cvc_display = document.querySelector(".card .ccv > div");

    let form = document.querySelector("form");


    // Card type patterns
    const cardPatterns = [
        { regex: /^3[47]\d{0,13}/, cardtype: 'amex' },
        // { regex: /^(5019|4175|4571)\d{0,12}/ , cardtype: 'dankort' },
        { regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/, cardtype: 'discover' },
        { regex: /^3(?:0[0-5]|09|[689]\d?)\d{0,11}/, cardtype: 'diners' },
        // { regex: /^63[7-9]/, cardtype: 'instapayment' },
        // { regex: /^(?:2131|1800)\d{0,11}/, cardtype: 'jcb15' },
        { regex: /^(?:35\d{0,2})\d{0,12}/, cardtype: 'jcb' },
        { regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/, cardtype: 'maestro' },
        { regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/, cardtype: 'mastercard' },
        // { regex: /^220[0-4]/, cardtype: 'mir' },
        { regex: /^4\d{0,15}/, cardtype: 'visa' },
        { regex: /^62\d{0,14}/, cardtype: 'unionpay' }
    ];

    // Get the card element
    const cardContainer = document.getElementById("ccard");

    function detectCardType(number) {
        number = number.replace(/\D/g, ''); // Remove spaces
        for (let pattern of cardPatterns) {
            if (pattern.regex.test(number)) {
                return pattern.cardtype;
            }
        }
        return 'unknown';
    }

    function updateCardTypeClass(cardNumber) {
        let detectedType = detectCardType(cardNumber);

        // Remove old cardtype classes
        cardContainer.classList.remove(
            'visa', 'mastercard', 'american-express', 'discover', 'diners',
            'jcb15', 'jcb', 'maestro', 'unionpay', 'unknown'
        );

        if (detectedType !== 'unknown') {
            cardContainer.classList.add(detectedType);
        }
    }

    // Update card type on input
    card_number_input.addEventListener("keyup", () => {
        updateCardTypeClass(card_number_input.value);
    });

    card_number_input.onkeydown = e => { 
        let key = e.keyCode || e.charCode;
        
        let is_digit = (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
        let is_delete = key == 8 || key == 46;
        
        if (is_digit || is_delete) { 
            let text = e.target.value;
            let len = text.length;
            
            if(is_digit && (len==4 || len==9 || len==14)) card_number_input.value = text + " ";
        }      
        else return false;
    }
    
    card_number_input.onkeyup = e => { 
        let key = e.keyCode || e.charCode;
        
        let is_digit = (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
        let is_delete = key == 8 || key == 46;
        
        if (is_digit || is_delete) { 
            let text = e.target.value;
            let len = text.length;
            let digits = "0000 0000 0000 0000".split('');
            
            if(is_digit && (len==4 || len==9 || len==14)) digits[len] = " ";

            for(let i=0;i<len;i++) digits[i] = text.charAt(i);

            card_number_display.innerText = digits.join('');
        }      
        else return false;
    }
    
    card_holder_input.onkeyup = e => {
        card_holder_display.innerText = e.target.value;
        // let value = e.target.value.toUpperCase();
        // e.target.value = value; // sets input value to uppercase
        // card_holder_display.innerText = value; // updates card display
    }
    
    expiry_month_select.onchange = e => {
        if(!e.target.value) expiry_month_display.innerText = "00";
        expiry_month_display.innerText = e.target.value;
    }
    
    expiry_year_select.onchange = e => {
        if(!e.target.value) expiry_year_display.innerText = "00";
        expiry_year_display.innerText = e.target.value;
    }
    
    cvc_input.onkeyup = e => {
        let text = e.target.value;
        let digits = ['_','_','_'];

        for(let i=0;i<text.length;i++) digits[i] = text.charAt(i);

        cvc_display.innerText = digits.join('');
    }
    
    form.onsubmit = e => {
        e.preventDefault();
    }
});
