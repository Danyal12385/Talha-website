var config = {
    headers: {
        "Accept": "application/json",
    }
}

var submitBtn = document.getElementById("submit-btn");
var successText = document.getElementById("success-text");
var errorText = document.getElementById("error-text");

const signup = async (formData) => {
    submitBtn.value = 'Loading...';

    axios.post('/api/register', formData, config)

        .then((response) => {
            submitBtn.value = 'Submit';

            if (response.data.success) {
                successText.innerHTML = 'Successfully registered.';

                setTimeout(() => {
                    window.location = '/login';
                }, 2500)
            }

            if (!response.data.success) {
                return errorText.innerHTML = response.data.message;
            }

            errorText.innerHTML = '';

            console.log(response.data);
        })

        .catch((error) => {
            submitBtn.value = 'Submit';

            console.log(error);
        })
}

var loginForm = document.getElementById("login-form");

if (loginForm !== undefined && loginForm !== null) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        var eml = document.getElementById("email").value;
        var pass = document.getElementById("password").value;
        /* ------------------------------------ Email Conditions statements --------------------------- */

        if (eml == "") {
            document.getElementById("emailname").innerHTML = "** Please fill the Email field **";
            return false;
        }

        document.getElementById("emailname").innerHTML = "";

        /* ---------------------------------- Password Conditions statements ----------------------------- */

        if (pass == "") {
            document.getElementById("passwordname").innerHTML = "** Please enter the password **";
            return false;
        }

        document.getElementById("passwordname").innerHTML = "";

        let formData = new FormData(loginForm);

        login(formData);
    })
}

const login = async (formData) => {
    submitBtn.value = 'Loading...';
    
    await axios.post('/api/login', formData, config)

        .then((response) => {
            submitBtn.value = 'Submit';

            console.log(response.data);

            if(response.data.success){
                successText.innerHTML = 'Successfully loggedin.';

                localStorage.setItem("user", JSON.stringify(response.data.data.user));
                localStorage.setItem("region", JSON.stringify(response.data.data.region));

                if(response.data.data.user.role === 'ra')
                    return window.location = '/ra/dashboard';

                setTimeout(() => {
                    window.location = '/';
                }, 2500);
            }
        })

        .catch((error) => {
            submitBtn.value = 'Submit';

            if(error.response.status === 401)
                errorText.innerHTML = error.response.data.message;
        })
}