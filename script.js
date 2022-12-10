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
const planTypes = ['Arcade', 'Advanced', 'Pro'];
const yearPrices = [90, 120, 150]
const monthPrices = [9, 12, 15]
const yearAddonPrices = [10, 20, 20]
const monthAddonPrices = [1, 2, 2]
const chosenPlan = document.getElementById('chosen-plan')
const chosenPrice = document.getElementById('chosen-plan-price')
let totalPrice = 0;
let totalPriceOnScreen = document.getElementById('totalPriceOnScreen');
let totalSummaryOnScreen = document.getElementById('totalSummaryOnScreen');


let choice = 'Monthly';
let chosenPlanPrice = 0;
let chosenPlanType;

let enabledAddons = [];

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
            if(choice == 'Monthly') {
                onDisplay('.month-addon')
            }
            else if(choice == 'Yearly') {
                onDisplay('.year-addon')
            }
    }

})

confirm3.addEventListener('click', function(){
    step3.style.display = 'none'
    step4.style.display = 'flex'
    sidebar4.classList.remove('circle-off');
    chosenPlan.textContent = `${chosenPlanType} (${choice})`;

    if(choice == 'Yearly') {
        chosenPrice.textContent = `$${chosenPlanPrice}/yr`;
    } else {
        chosenPrice.textContent = `$${chosenPlanPrice}/mo`;
    }

    let addonsDiv = document.getElementById("chosen-addons-div")

    for(let i=0; i<enabledAddons.length; i++) {
        let wrapperDiv = document.createElement('div');
        let addonOnPage = document.createElement('h9');
        let addonPriceOnPage = document.createElement('h10');
        wrapperDiv.classList.add('addons-step4')
        addonOnPage.textContent = enabledAddons[i];
        console.log(addonOnPage)

        if (choice == 'Monthly') {
            if(enabledAddons[i] == 'Larger Storage' || enabledAddons[i] == 'Customizable Profile') {
                addonPriceOnPage.textContent = '+$2/mo';
                totalPrice+=2;
            }
            if(enabledAddons[i] == 'Online Service') {
                addonPriceOnPage.textContent = '+$1/mo';
                totalPrice+=1;
            }
        }

        else if (choice == 'Yearly') {
            if(enabledAddons[i] == 'Larger Storage' || enabledAddons[i] == 'Customizable Profile') {
                addonPriceOnPage.textContent = '+$20/mo'
                totalPrice+=20;
            }
            if(enabledAddons[i] == 'Online Service') {
                addonPriceOnPage.textContent = '+$10/mo'
                totalPrice+=10;
            }
        }

        wrapperDiv.append(addonOnPage);
        wrapperDiv.append(addonPriceOnPage);
        addonsDiv.append(wrapperDiv);
        totalPriceOnScreen.textContent = totalPrice + chosenPlanPrice;

        if(choice == 'Monthly') {
            totalPriceOnScreen.textContent = `$${totalPrice + chosenPlanPrice}/mo`;
            totalSummaryOnScreen.textContent = 'Total (per month)';
        }
        else if(choice == 'Yearly') {
            totalPriceOnScreen.textContent = `$${totalPrice + chosenPlanPrice}/yr`;
            totalSummaryOnScreen.textContent = 'Total (per year)';
        }
        
    }
    

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
        choice = 'Yearly';
        onDisplay('.plan-text-year')
        offDisplay('.plan-text-month')
        document.getElementById('monthly').classList.add('plan-selector-off')
        document.getElementById('yearly').classList.remove('plan-selector-off')
        let selectedEl = document.querySelector(".selected");
        selectedEl.classList.remove("selected");
    } else {
        choice = 'Monthly';
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
    if (choice == 'Monthly') {
        chosenPlanPrice = monthPrices[i]
        chosenPlanType = planTypes[i]
        console.log(chosenPlanPrice, chosenPlanType)
    }
    if (choice == 'Yearly') {
        chosenPlanPrice = yearPrices[i]
        chosenPlanType = planTypes[i]
        console.log(chosenPlanPrice, chosenPlanType)
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
  
const select1 = document.getElementById("select1")
const select2 = document.getElementById("select2")
const select3 = document.getElementById("select3")

select1.onclick = function() {
    document.getElementById("container1").classList.toggle('selected-container')
}

select2.onclick = function() {
    document.getElementById("container2").classList.toggle('selected-container')
}

select3.onclick = function() {
    document.getElementById("container3").classList.toggle('selected-container')
}


// Step 3 - Add-on Selector // 
let checkboxes = [select1, select2, select3]
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledAddons = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value)
    console.log(enabledAddons)
  })
});


// Step 4 //


