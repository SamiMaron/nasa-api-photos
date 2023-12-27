(function (){
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("buttonPassword").addEventListener('click' ,checkPassword)
    })

    function checkPassword(event){
        let pass = document.getElementById("password").value.trim()
        let pass2 = document.getElementById("password authentication").value.trim()
        let flag = false

        if(pass === ""){
            document.getElementById("errorPassword").innerHTML = "password must not be empty"
            flag = true
        }
        if(pass2 === ""){
            document.getElementById("errorPassword").innerHTML = "password must not be empty"
            flag = true
        }
        if(pass !== pass2){
            document.getElementById("errorPassword").innerHTML = "password and confirm password must be equal"
            flag = true

        }
        if(flag === true){
            event.preventDefault()
        }
    }

})();