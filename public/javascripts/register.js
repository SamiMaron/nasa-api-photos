(function () {

    document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("btRegister").addEventListener('click', checkRegister);

    })

    function checkRegister() {
        let firstName =document.getElementById("first_name").value.trim()
        let lastName = document.getElementById("last_name").value.trim()
        let mail = document.getElementById("email").value.trim().toLowerCase()
        let flag = false
        let letters = /^[A-Za-z]+$/;
        if(firstName === ""){
            document.getElementById("errorFirstName").innerHTML = "please fill first name"
            flag = true
        }
        if(lastName === ""){
            document.getElementById("errorLastName").innerHTML = "please fill last name"
            flag = true
        }
        if(mail === ""){
            document.getElementById("errorMail").innerHTML = "please fill mail"
            flag = true
        }
        if((!firstName.match(letters) && firstName.length >0)){
            document.getElementById("errorFirstName").innerHTML = "first name must be letters"
            flag = true
        }
        if((!lastName.match(letters) && lastName.length >0)){
            document.getElementById("errorLastName").innerHTML = "last name must be letters"
            flag = true
        }
        if(flag === true){
            event.preventDefault()
        }
    }

})();