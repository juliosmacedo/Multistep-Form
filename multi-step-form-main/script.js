const confirm1 = document.getElementById('next-step1')
const confirm2 = document.getElementById('next-step2')
const confirm3 = document.getElementById('next-step3')
const confirm4 = document.getElementById('next-step4')
const step1 = document.getElementById('step-1')
const step2 = document.getElementById('step-2')
const step3 = document.getElementById('step-3')
const step4 = document.getElementById('step-4')
const step5 = document.getElementById('step-5')
const sidebar1 = document.getElementById('step1-sidebar')
const sidebar2 = document.getElementById('step2-sidebar')
const sidebar3 = document.getElementById('step3-sidebar')
const sidebar4 = document.getElementById('step4-sidebar')
const nameErrorText = document.getElementById('name-error-text')
const emailErrorText = document.getElementById('email-error-text')
const phoneErrorText = document.getElementById('phone-error-text')
const planErrorText = document.getElementById('planErrorText')
const userNameInput = document.getElementById('user-name-input')
const phoneInput = document.getElementById('user-phone-input')
const emailInput = document.getElementById('user-email-input')
const planSelector = document.getElementById("plan-selector")
const yearText = document.querySelectorAll('plan-text-month')
const monthText = document.querySelectorAll('plan-text-year')
const plans = document.getElementsByClassName('plan')
const addons = document.getElementsByClassName('container')
const yearPrices = [90, 120, 150]
const monthPrices = [9, 12, 15]
let choice = 'month';
let chosenPlanPrice = 0;


// Validates email address.
function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

// Validates phone number.
function validPhone(e) {
    var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;
    return String(e).search (filter) != -1;
}


// Next Step Buttons //

confirm1.addEventListener('click', function(){
    if(userNameInput.value && phoneInput.value && emailInput.value) {
        step1.style.display = 'none'
        step2.style.display = 'flex'
        sidebar2.classList.remove('circle-off');
        nameErrorText.style.display = 'none'
        phoneErrorText.style.display = 'none'
        emailErrorText.style.display = 'none'
    }

    if(userNameInput.value.length <= 2){
        nameErrorText.style.display = 'block'
        userNameInput.style.borderColor = 'red'
    }

    else if(userNameInput.value.length > 2){
        nameErrorText.style.display = 'none'
        userNameInput.style.borderColor = 'hsl(229, 24%, 87%)'
    }

    if(!validPhone(phoneInput.value)){
        phoneErrorText.style.display = 'block'
        phoneInput.style.borderColor = 'red'
    }

    if(validPhone(phoneInput.value)){
        phoneErrorText.style.display = 'none'
        phoneInput.style.borderColor = 'hsl(229, 24%, 87%)'
    }


    if(!validEmail(emailInput.value)){
        emailErrorText.style.display = 'block'
        emailInput.style.borderColor = 'red'
    }

    if( validEmail(emailInput.value) ){
        emailErrorText.style.display = 'none'
        emailInput.style.borderColor = 'hsl(229, 24%, 87%)'
    }
    
})

confirm2.addEventListener('click', function(){
    let selectedEl = document.querySelector(".selected");
    if(!selectedEl) {
        planErrorText.style.visibility = 'visible'
    } else {
        step2.style.display = 'none'
        step3.style.display = 'flex'
        sidebar3.classList.remove('circle-off');
        planErrorText.style.visibility = 'hidden'
            if(choice == 'month') {
                onDisplay('.month-addon')
            }
            else if(choice == 'year') {
                onDisplay('.year-addon')
            }
    }

})

confirm3.addEventListener('click', function(){
    step3.style.display = 'none'
    step4.style.display = 'flex'
    sidebar4.classList.remove('circle-off');
})

confirm4.addEventListener('click', function(){
    step4.style.display = 'none'
    step5.style.display = 'flex'
})


// Usability Functions // 


function offDisplay(className) {
    document.querySelectorAll(className).forEach(el => {
        el.style.display = "none";
    });
}

function onDisplay(className) {
    document.querySelectorAll(className).forEach(el => {
        el.style.display = "flex";
    });
}    



// Plan Selector Modifier for Step 2 //

planSelector.addEventListener('change', function () {
    if (planSelector.checked) {
        choice = 'year';
        onDisplay('.plan-text-year')
        offDisplay('.plan-text-month')
        document.getElementById('monthly').classList.add('plan-selector-off')
        document.getElementById('yearly').classList.remove('plan-selector-off')
        let selectedEl = document.querySelector(".selected");
        selectedEl.classList.remove("selected");
    } else {
        choice = 'month';
        onDisplay('.plan-text-month')
        offDisplay('.plan-text-year')
        document.getElementById('monthly').classList.remove('plan-selector-off')
        document.getElementById('yearly').classList.add('plan-selector-off')
        let selectedEl = document.querySelector(".selected");
        selectedEl.classList.remove("selected");
    }

})


// Exclusive Choice Function for Step 2 // 

for (let i = 0; i < plans.length; i++) {
  plans[i].addEventListener("click", function() {
    if (choice == 'month') {
        chosenPlanPrice = monthPrices[i]
        console.log(chosenPlanPrice)
    }
    if (choice == 'year') {
        chosenPlanPrice = yearPrices[i]
        console.log(chosenPlanPrice)
    }
    
    let selectedEl = document.querySelector(".selected");
    // If there was a selected element which is not this
    if (selectedEl && selectedEl !== this) {
      selectedEl.classList.remove("selected");
    }
    // Toggle this
    this.classList.toggle("selected");

  }, false);
}


// Step 3 Add-on Selector Style Change //
  
document.getElementById("select1").onclick = function() {
    document.getElementById("container1").classList.toggle('selected-container')
}

document.getElementById("select2").onclick = function() {
    document.getElementById("container2").classList.toggle('selected-container')
}

document.getElementById("select3").onclick = function() {
    document.getElementById("container3").classList.toggle('selected-container')
}



