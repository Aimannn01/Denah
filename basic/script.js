const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const signInForm = document.querySelector('.form-container.sign-in form');
const signInButton = signInForm.querySelector('button');

signInButton.addEventListener('click', (event) => {

    const inputs = signInForm.querySelectorAll('input');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
            input.style.border = "2px solid #ff4b2b"; 
        } else {
            input.style.border = "none"; 
        }
    });

    if (!allFilled) {
        event.preventDefault();
        alert("Harap isi semua kolom login!");
    } else {
        console.log("Validasi berhasil, silakan masuk.");
    }
});

const signUpForm = document.querySelector('.form-container.sign-up form');
const signUpButton = signUpForm.querySelector('button');

signUpButton.addEventListener('click', (event) => {
    const inputs = signUpForm.querySelectorAll('input');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
            input.style.border = "2px solid #ff4b2b";
        } else {
            input.style.border = "none";
        }
    });

    if (!allFilled) {
        event.preventDefault();
        alert("Harap lengkapi data registrasi Anda!");
    }
});