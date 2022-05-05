


    var login_signup = document.querySelector('.login_signup')

    var password_signup = document.querySelector('.password_signup')

    var confirm_password_signup = document.querySelector('.confirm_password_signup')

    var submit_login = document.querySelector('.submit_signup')

    var error = document.querySelector('.error')

    var error_login = document.querySelector('.error_login')
    var error_password = document.querySelector('.error_password')
    var error_confirm_password = document.querySelector('.error_confirm_password')


    login_signup.addEventListener("focusout", () => {
        if (login_signup.value.length == 0){
            login_signup.style.borderColor = "lightgrey"
            error_login.innerHTML = ""
        } else if (login_signup.value.length < 5){
            login_signup.style.border = "1px solid red"
            error_login.innerHTML = "Votre login doit contenir 5 caractère"
        } else {
            login_signup.style.border = "1px solid rgba(1,180,228,1)"
            error_login.innerHTML = ""
        }
    })

    password_signup.addEventListener("keyup", () => {
        passwordCheck(password_signup.value)
    })

    confirm_password_signup.addEventListener("focusout", () => {
        if(confirm_password_signup.value == password_signup.value){
            confirm_password_signup.style.border = "1px solid rgba(1,180,228,1)"
            error_confirm_password.innerHTML = ""
        } else {
            confirm_password_signup.style.border = "1px solid red"
            error_confirm_password.innerHTML = "Vos mots de passe sont différents"
        }
    })



    function passwordCheck(password){
        var passClass = document.getElementsByClassName('password-check')

        const minuscule = new RegExp('(?=.*[a-z])');
        const majuscule = new RegExp('(?=.*[A-Z])')
        const numero = new RegExp('(?=.*[0-9])')
        const tailleChar = new RegExp('(?=.{6,})')

        if (tailleChar.test(password)){
            passClass[0].style.color = "rgb(10, 170, 10)"
            passClass[0].style.opacity = "0.9"
            passClass[0].style.fontWeight = "bold"
        } else {
            passClass[0].style.color = "#9c9c9c"
            passClass[0].style.fontWeight = "normal"
        }

        if (numero.test(password)){
            passClass[1].style.color = "rgb(10, 170, 10)"
            passClass[1].style.opacity = "0.9" 
            passClass[1].style.fontWeight = "bold"      
        } else {
            passClass[1].style.color = "#9c9c9c"
            passClass[1].style.fontWeight = "normal"
        }

        if (majuscule.test(password)){
            passClass[2].style.color = "rgb(10, 170, 10)"
            passClass[2].style.opacity = "0.9" 
            passClass[2].style.fontWeight = "bold"
        } else {
            passClass[2].style.color = "#9c9c9c"
            passClass[2].style.fontWeight = "normal"
        }

        if (minuscule.test(password)){
            passClass[3].style.color = "rgb(10, 170, 10)"
            passClass[3].style.opacity = "0.9"
            passClass[3].style.fontWeight = "bold"
        } else {
            passClass[3].style.color = "#9c9c9c"
            passClass[3].style.fontWeight = "normal"
        }

        
    }


    