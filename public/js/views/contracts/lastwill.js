/**
 * 
 *  file: (view) lastwill.js
 * 
 * 
 */

import {wizard} from '../../modules/wizard.js';
import { ModelLastwill } from '../../models/lastWill.js';

const wizardModule = new wizard();
let modelObject = new ModelLastwill();
let lastWill = modelObject.getObject();
let next = document.getElementById('btn-next');
let previous = document.getElementById('btn-back')
let formPannel = document.getElementsByClassName('step');


let errorMessage = undefined;
let inputFields = undefined;


const progress = 'progressBar';


//#region ui events 



// children ui events 



// does person have children

let childrenSelector = document.getElementById('form-children-selector');
let childrenTrue = document.getElementById('form-children-true');
let childrenFalse = document.getElementById('form-children-false');
let childrenAmountPannel = document.getElementById('form-children-amount-pannel');
let childFormContainer = document.getElementById('form-child-container');
let childFormTemplate = document.getElementById('form-child-template');


childrenTrue.addEventListener('click', () => {
    childrenAmountPannel.style.display = 'block';
    childrenSelector.style.display = 'block';
    lastWill.person.children = 'true';
});


childrenFalse.addEventListener('click', () => {
    childFormContainer.innerHTML = '';
    childrenAmountPannel.style.display = 'none';
    childrenSelector.style.display = 'none';
    lastWill.person.children = 'false';
});

// add the children pannel to the dom



// push the template to the relative container on the event specified 
childrenSelector.addEventListener('click', () => {

    if (childrenSelector.value.length !== 0 )
    {
        // reset any previous forms that were appended 
        childFormContainer.innerHTML = '';
        for (let i = 0; i < childrenSelector.value; i++)
        {
            let cln = childFormTemplate.cloneNode(true);
            cln.hidden = false;
            let inputs = cln.querySelectorAll('input');
            inputs[1].name += i;
            inputs[2].name += i;
            cln.style.display = 'block';
            childFormContainer.appendChild(cln);
        }
    }
});


const verifyChildrenFormInput = (formPannelSelectorID) =>
{
    let childElement  = formPannelSelectorID.querySelectorAll('li');
    let lastWill = modelObject.getObject();
    let trigger = undefined;

    // clear any inputs that is contained within the object 

    lastWill.children.name = [];
    lastWill.children.dependent = [];

    for (let pannels of childElement)
    {
        let inputs = pannels.querySelectorAll('input');
        let errors = pannels.querySelectorAll('.error-message');

        // clear out information inside of the model

        if (inputs[0].value.length !== 0)
        {
            errors[0].innerHTML = '';
            lastWill.children.name.push(inputs[0].value);
        } else {
            // reset our model too 
            trigger = false;
            errors[0].innerHTML = 'Please choose an option';
        }

        if (inputs[1].checked === true || inputs[2].checked === true)
        {
            errors[1].innerHTML = '';
            // append information to the model we have
            if (inputs[1].checked === true) {
                lastWill.children.dependent.push(inputs[1].value);
            }
            if (inputs[2].checked == true) {
                lastWill.children.dependent.push(inputs[2].value);
            }
        } else {
            // trigger error here
            trigger = false;
            errors[1].innerHTML = 'Please select an option <br/>';
        }
    }
      // check if our flag has been set if so then we will 
        if (trigger === false) {
            lastWill.children.name = [];
            lastWill.children.dependent = [];
            return false;
        }
        // all of bases cases were satified so we will let the application know it an all go :)
            return true;
}

// endof children ui events


// start of guardian ui events

let inputGuardianTrue = document.getElementById('input-apointguardian-true');
let inputGuardianFalse = document.getElementById('input-apointguardian-false');
let guardianForm = document.getElementById('form-apointGuardian');

inputGuardianTrue.addEventListener('click', () => {
    lastWill.guardian.apointGuardian = true;
    guardianForm.hidden = false;
});

inputGuardianFalse.addEventListener('click', () => {
    lastWill.guardian.appintGuardian = false;
    guardianForm.hidden = true;
});

// helper function inorder to validate the input 
const verifyGuardianForm = (domElement) => {
    let inputs = domElement.querySelectorAll('input');
    let selector = domElement.querySelector('select');
    let flag = undefined;
    let errors = domElement.querySelectorAll('.error-message');
    let lastWill = modelObject.getObject();

    if (inputs[0].value.length !== 0) {
        errors[0].innerHTML = '';
        lastWill.guardian.name = inputs[0].value;
    } else {
        //trigger error
        errors[0].innerHTML = 'Please fill out field it is required';
        flag = false;
    }

    if (inputs[1].value.length !== 0) {
        errors[1].innerHTML = '';
        lastWill.guardian.city = inputs[1].value;
    } else {
        errors[1].innerHTML = 'Please fill out fiedl it is required';
        flag = false;
    }

    if (selector.value !== '') {
        errors[2].innerHTML = '';
        lastWill.guardian.province = selector.value;
    } else {
        errors[2].innerHTML = 'Please select an option inorder to continue';
        flag = false;
    }

    if (flag === false ) {
        // clear object 
        lastWill.guardian.name = undefined;
        lastWill.guardian.province = undefined;
        lastWill.guardian.city = undefined;
        return false;
    }

    return true;
}
// end of guardian ui events 


// start of delay inheritance ui events 

let delayInheritanceTrue = document.getElementById('form-delayInheritance-true');
let delayInheritanceFalse = document.getElementById('form-delayInheritance-false');
let delayInheritanceForm = document.getElementById('delayInheritance-form');
delayInheritanceTrue.addEventListener('click', () => {
    lastWill.Inheritance.delay = 'true';
    delayInheritanceForm.hidden = false;
});

delayInheritanceFalse.addEventListener('click', () => {
    lastWill.Inheritance.delay = 'false';
    delayInheritanceForm.hidden = true;
});


// #endof delay inheritance ui events 


// #startof gift section ui events




// #end of gift section ui events


/// #endRegion ui events 

// step wizards 
next.addEventListener('click', (e) => {


    e.stopImmediatePropagation();
    let pageNumber = wizardModule.getCurrentStep('step');


    switch(pageNumber)
    {
        // relationship status
        case 0:
            wizardModule.updateProgresBar(progress, 1);
            let relationshipPannel = formPannel[0];
            let relationStatus = '';
            errorMessage = relationshipPannel.querySelectorAll('.error-message');


            for (let inputs of relationshipPannel.querySelectorAll('input'))
            {
                if (inputs.checked === true) {
                    relationStatus = inputs.value;
                    break;
                } else {
                    relationStatus = undefined;
                }
            }
             modelObject.setProperty(lastWill.person, 'relationship', relationStatus);
            console.log(lastWill);

            if (lastWill.person.relationship !== undefined) {
                errorMessage[0].innerText = '';

                if (lastWill.person.relationship === 'married') {
                    wizardModule.changeWizardTitle('title_', 'Spouses Name ');
                    wizardModule.updateProgresBar(progress, 7);
                    wizardModule.show('step', 1);
                } else if (lastWill.person.relationship === 'commonLaw') {
                    wizardModule.updateProgresBar(progress, 7);
                    wizardModule.changeWizardTitle('title_', 'Spouses Name');
                    wizardModule.show('step',1);
                } else if (lastWill.person.relationship === 'single') {
                    wizardModule.updateProgresBar(progress, 7);
                    wizardModule.changeWizardTitle('title_', 'Testors Information');
                    wizardModule.show('step', 2);
                } else {
                    // destroy input 
                    lastWill.person.relationship = undefined;
                }
            } 
            else 
            {// do error stuff 
                errorMessage[0].innerText = "Please select an option inorder to continue";
            }
        break;
        // spouses name 
        case 1:
           
            let spousePannel = formPannel[1];
            errorMessage = spousePannel.querySelectorAll('.error-message');

            if (spousePannel.querySelector('input').value.length !== 0) { 
                wizardModule.updateProgresBar(progress, 14);
                errorMessage[0].innerHTML = '';
                modelObject.setProperty(lastWill.person, 'spouse', spousePannel.querySelector('input').value);
                wizardModule.show('step', 2);
            } else {
                wizardModule.updateProgresBar(progress, 7);
                errorMessage[0].innerHTML = '<b> Invalid </b> Please fill out form';
            }
        break;
        // personal information
        case 2:
            let testorPannel = formPannel[2];
            inputFields = formPannel[2].querySelectorAll('input');
            errorMessage = testorPannel.querySelectorAll('.error-message');
            
            for (let i = 0; i < inputFields.length; i++ )
            {
                if (inputFields[i].value.length === 0) {
                    errorMessage[i].innerText = 'Invalid input, Please fill out field';
                    if (i == 0) {
                        modelObject.setProperty(lastWill.person, 'name', undefined);
                     } else {
                        modelObject.setProperty(lastWill.person, 'city', undefined);
                     }
                } else{
                    errorMessage[i].innerText = '';

                    if (i === 0) {
                        modelObject.setProperty(lastWill.person, 'name', inputFields[0].value);
                    } else if (i === 1) {
                        modelObject.setProperty(lastWill.person, 'city', inputFields[1].value);
                    }
                }
            }

            if (testorPannel.querySelector('select').value.length === 0) {
                errorMessage[inputFields.length].innerText = 'Invalid input, Please fill out field';
                modelObject.setProperty(lastWill.person, 'province', undefined);
            } else {
                errorMessage[inputFields.length].innerText = '';
                modelObject.setProperty(lastWill.person, 'province', testorPannel.querySelector('select').value);
            }

            // check or model object to see if our object has been set
            if (lastWill.person.name !== undefined && lastWill.person.city !== undefined && lastWill.person.province !== undefined) {
                wizardModule.show('step', 3);
            }
        break;
        // executor 
        case 3:
            let executor = formPannel[3];
            inputFields = executor.querySelectorAll('input');
            errorMessage =  executor.querySelectorAll('.error-message');
            let inputProvince = executor.querySelector('select');

            for (let i = 0; i < inputFields.length; i++) {
                if (inputFields[i].value.length === 0 ) {
                    errorMessage[i].innerText = 'Invalid input, please fill out fields to continue';
                    if (i === 0) {
                        modelObject.setProperty(lastWill.executor, 'name', undefined);

                    } else if (i === 1) {
                        modelObject.setProperty(lastWill.executor, 'city', undefined);
                    }
                
                } else {
                    errorMessage[i].innerText = '';

                    if (i === 0) {
                        modelObject.setProperty(lastWill.executor, 'name', inputFields[0].value);

                    } else if (i === 1) {
                        modelObject.setProperty(lastWill.executor, 'city', inputFields[1].value);
                    }
                }
            }
                if (inputProvince.value.length === 0) {
                    errorMessage[2].innerText = 'Invalid input, please fill out fields to continue';
                    modelObject.setProperty(lastWill.executor, 'province', undefined);
                } else {
                    errorMessage[2].innerText = '';
                    modelObject.setProperty(lastWill.executor, 'province', inputProvince.value);
                }
                if (lastWill.executor.name !== undefined && lastWill.executor.city !== undefined && lastWill.executor.province !== undefined) {
                    wizardModule.show('step', 4);
                }
        break;
        // alt executor pannel
        case 4:
            let altExecutorPannel = formPannel[4];
            inputFields = altExecutorPannel.querySelectorAll('input');
            errorMessage = altExecutorPannel.querySelectorAll('.error-message');

            for (let i = 0; i < inputFields.length; i++) {
                if (inputFields[i].value.length === 0 ) {
                    errorMessage[i].innerText = 'Invalid input, please fill out fields to continue';
                    if (i === 0) {
                        modelObject.setProperty(lastWill.altExecutor, 'name', undefined);

                    } else if (i === 1) {
                        modelObject.setProperty(lastWill.altExecutor, 'city', undefined);
                    }
                
                } else {
                    errorMessage[i].innerText = '';

                    if (i === 0) {
                        modelObject.setProperty(lastWill.altExecutor, 'name', inputFields[0].value);

                    } else if (i === 1) {
                        modelObject.setProperty(lastWill.altExecutor, 'city', inputFields[1].value);
                    }
                }
            }
                if (altExecutorPannel.querySelector('select').value.length === 0) {
                    errorMessage[2].innerText = 'Invalid input, please fill out fields to continue';
                    modelObject.setProperty(lastWill.altExecutor, 'province', undefined);
                } else {
                    errorMessage[2].innerText = '';
                    modelObject.setProperty(lastWill.altExecutor, 'province', altExecutorPannel.querySelector('select').value);
                }
                if (lastWill.altExecutor.name !== undefined && lastWill.altExecutor.city !== undefined && lastWill.altExecutor.province !== undefined) {
                    wizardModule.show('step', 5);
                }
        break;
        case 5:
            // children pannel
                let childrenPannel = formPannel[5];

                if (childrenTrue.checked === true || childrenFalse.checked === true) {
                    childrenPannel.querySelector('.error-message').innerHTML = '';
                } else {
                    // display error 
                   childrenPannel.querySelector('.error-message').innerHTML = "please select an option inorder to continue";
                }

                if (lastWill.person.children !== undefined)
                {
                    if (lastWill.person.children === 'true')
                    {
                       if (verifyChildrenFormInput(childFormContainer) === true)
                       {
                           wizardModule.show('step', 6);
                       }
                    } else if (lastWill.person.children === 'false')
                    {
                        wizardModule.show('step', 6);
                    }
                }
        break;

        // apoint guardian  
        case 6:
            let guardian = formPannel[6];
            errorMessage = guardian.querySelector('.error-message');

            if (inputGuardianFalse.checked === true) {
                errorMessage.innerText = '';
                lastWill.guardian.appointGuardian = 'false';
                wizardModule.show('step', 7);
            } else if (inputGuardianTrue.checked === true) {
                errorMessage.innerText = '';
                if (verifyGuardianForm(guardianForm) === true) {
                    wizardModule.show('step', 7);
                }
            } else {
                errorMessage.innerText = 'Please select an option inorder to continue';
            }
        break;
        // delay inheritance
        case 7:
            let delayInheritance = formPannel[7];
            let delayInheritanceSelect = formPannel[7].querySelector('select');
            if (delayInheritanceTrue.checked === true || 
                delayInheritanceFalse.checked == true) {
                    if (delayInheritanceTrue.checked == true)
                    {
                        lastWill.Inheritance.age = delayInheritanceSelect.value;
                        wizardModule.show('step', 8);
                    } else if (delayInheritanceFalse.checked === true)
                    {   
                        lastWill.Inheritance.age = undefined;
                        wizardModule.show('step', 8);
                    }

                    console.log(lastWill.Inheritance);
                }
        break;
        //  guardian
        case 8:


        break;
    }

});


// step wizards 
previous.addEventListener('click', (e) => {

    e.stopImmediatePropagation();
    let pageNumber = wizardModule.getCurrentStep('step');

    switch(pageNumber)
    {
        case 0:
          
        break;
    }
});