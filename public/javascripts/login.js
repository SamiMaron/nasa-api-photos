(function (){
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btnLogin").addEventListener('click', checkLogin)
    })

    function checkLogin() {
        const password = document.getElementById("loginPassword").value.trim()
        let mail = document.getElementById("loginEmail").value.trim().toLowerCase()
        let flag = false

        if(password === ""){
            document.getElementById("errorPasswordLogin").innerHtml = "password must not be empty"
            flag = true
        }
        if(mail === ""){
            document.getElementById("errorEmailLogin").innerHtml = "mail must not be empty"
            flag = true
        }
        if (flag === true){
            event.preventDefault()
        }
    }

})();


