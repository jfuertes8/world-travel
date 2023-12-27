//Con los ID obtengo los elementos del form
const firstName = document.getElementById('fname')
const lastName = document.getElementById('lname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const phone = document.getElementById('phone')

const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    //Evito el envío del form
    e.preventDefault();

    //Limpio mensaje de errores previos
    clearErrors();

    //Si no hay errores, envío el form
    if (validateInputs()) {
        form.submit()
    };
})

function validateInputs() {
    //Obtenemos los valores de los campos
    const firstNameValue = firstName.value.trim()
    const lastNameValue = lastName.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const password2Value = password2.value.trim()
    const phoneValue = phone.value.trim()

    //Si esto se mantiene a True se envía el formulario
    let valid = true

    //Validaciones del campo Nombre
    if (firstNameValue === '' || firstNameValue == null) {
        setError(firstName, 'Required field')
        valid = false;
    }

    //Validaciones del campo Apellido
    if (lastNameValue === '' || lastNameValue == null) {
        setError(lastName, 'Required field')
        valid = false;
    }

    //Validaciones del campo email
    if (emailValue === '' || emailValue == null) {
        setError(email, 'Required field')
        valid = false;
    } else if (!isEmail(emailValue)) {
        setError(email, 'Please write a correct email format: something@something.com/es')
        valid = false;
    }

    //Validaciones del campo password
    if (passwordValue === '' || passwordValue == null) {
        setError(password, 'Required field')
        valid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 digits long')
        valid = false;
    }

    //Validaciones del campo repeatPassword
    if (password2Value === '' || password2Value == null) {
        setError(password2, 'Required field')
        valid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, 'Passwords are not the same')
        valid = false;
    }

    //Validaciones del campo telefono
    if (phoneValue === '' || phoneValue == null) {
        setError(phone, 'Required field')
        valid = false;
    } else if (phoneValue.length !== 9) {
        setError(phone, 'Phone number must have 9 digits')
        valid = false;
    } else if (!isCorrectPhone(phoneValue)) {
        setError(phone, 'Phone number must begin with digits 6 or 7')
        valid = false;
    }

    return valid;
}

//Encuentro el small concreto de ese input y le meto el mensaje de error
function setError(input, message) {
    const inputControl = input.parentElement;
    const errorField = inputControl.querySelector('p');

    errorField.innerText = message;
}

function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

//Valido que el numero de telefono empieze por 6 o 7, y que tenga una longitud exacta de 9 digitos (1 + 8)
function isCorrectPhone(phone) {
    return /^[6-7]\d{8}$/.test(phone)
}

function clearErrors() {
    document.querySelectorAll('p.error').forEach((e) => {
        e.innerText = '';
    })
}