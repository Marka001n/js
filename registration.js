let baseURL = "http://localhost/mailbook/";


async function getErrorMsg() {
    console.log('usao u funkciju');
    let response = await fetch(baseURL + "getUserAndMail.php");
    let errors = await response.json();


    let innerHTML = '';
    let resultClass = '';
    errors.forEach(error => {
        innerHTML += `<p>${error}</p>`;
    });
    document.getElementById('errorDiv').innerHTML = innerHTML;




}
getErrorMsg();

let config = {
    'firstLastName': {
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    'username': {
        required: true,
        minlength: 5,
        maxlength: 10,
    },
    'email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50,
    },
    'pass': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'pass2'
    },
    'pass2': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'pass'
    },
};

class Validator {
    constructor(config) {
        this.elementsConfig = config;
        this.errors = {};

        this.genereteErrorsObject();
        this.inputListener();
    }
    genereteErrorsObject() {
        for (let field in this.elementsConfig) {
            this.errors[field] = [];
        }
    }
    inputListener() {
        let inputSelector = this.elementsConfig;

        for (let field in inputSelector) {
            let selector = `input[name="${field}"]`;
            let el = document.querySelector(selector);

            el.addEventListener('input', this.validate.bind(this));
        }
    }
    validate(e) {
        let elFields = this.elementsConfig;

        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if (elFields[fieldName].required) {
            if (fieldValue === '') {
                this.errors[fieldName].push('Polje je prazno');
            }
        }
        if (elFields[fieldName].email) {
            if (!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna email adresa!');
            }
        }
        if (fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) {
            this.errors[fieldName].push(`Polje mora imati izmedju ${elFields[fieldName].minlength} i ${elFields[fieldName].maxlength} karaktera!`);
        }
        if (elFields[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            if (fieldValue != matchingEl.value) {
                this.errors[fieldName].push('Lozinke se ne poklapaju!');
            }
            if (this.errors[fieldName].length === 0) {
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];

            }
        }
        let err = this.errors;
        console.log(err);
        this.populateErrors(this.errors);
    }
    populateErrors(errors) {
        for (const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }
        for (let key of Object.keys(errors)) {
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);
            });
        }
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }
}



let validator = new Validator(config);
// var forma = document.getElementById('theForm')
// if (forma.addEventListener) {
//     forma.addEventListener("submit", function (evt) {
//         evt.preventDefault();
//         window.history.back();
//     }, true);
// }
// else {
//     forma.attachEvent('onsubmit', function (evt) {
//         evt.preventDefault();
//         window.history.back();
//     });
// }
function checkEmptyFields() {

}



