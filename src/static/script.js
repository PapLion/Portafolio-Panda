document.addEventListener("DOMContentLoaded", function(){
    let name = document.getElementById("Name");
    let email = document.getElementById("Email");
    let msg = document.getElementById("msg");
    let subm = document.getElementById("subm");

    function submit(){
        name.value = "";
        email.value = "";
        msg.value = "";
    }

    function validateEmail(email) {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function ShowIfIsValid() {
        if (name.value !== "") {
            name.classList.add("is-valid");
            name.classList.remove("is-invalid");
        } else {
            name.classList.remove("is-valid");
            name.classList.remove("is-invalid");
        }

        const emailValue = email.value.trim();
        if (emailValue === "") {
            email.classList.remove("is-valid");
            email.classList.remove("is-invalid");
        } else if (validateEmail(emailValue)) {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
        } else {
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
        }

        if (msg.value !== "") {
            msg.classList.add("is-valid");
            msg.classList.remove("is-invalid");
        } else {
            msg.classList.remove("is-valid");
            msg.classList.remove("is-invalid");
        }
    }

    function noSubmitEvent(){
        subm.disabled = true;
        subm.classList.add("no-click");
        subm.removeEventListener("click", submit);
        // Prevenimos la acción del click
        subm.addEventListener("click", function(e){
            e.preventDefault();
        });
    }

    function noSubmit(){
        if (msg.value === "" || email.value === "" || name.value === "") {
            noSubmitEvent();
        } else {
            subm.disabled = false;
            subm.classList.remove("no-click");
            subm.addEventListener("click", submit);
        }
    }

    // Nos aseguramos que las funciones se ejecuten donde deberían ejecutarse
    name.addEventListener("input", ShowIfIsValid);
    email.addEventListener("input", ShowIfIsValid);
    msg.addEventListener("input", ShowIfIsValid);

    subm.addEventListener("click", noSubmit);

    noSubmit();
})
