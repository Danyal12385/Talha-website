var config = {
    headers: {
        "Accept": "application/json",
    }
}

var adminLoginForm = document.getElementById("admin-login-form");
var successText = document.getElementById("success");
var errorText = document.getElementById("error");
var submitBtn = document.getElementById("submit-btn");

if (adminLoginForm !== undefined && adminLoginForm !== null) {
    adminLoginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(adminLoginForm);

        if (formData.get("email") === '' || formData.get("password") === '')
            return error.innerHTML = "Please enter both email and password.";

        error.innerHTML = '';
        login(formData);
    });
}

const login = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    axios.post('/api/login', formData, config)

        .then((response) => {
            console.log(response.data);
            submitBtn.innerHTML = 'Submit';

            if(response.data.success)
                location.href = '/admin/dashboard';
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Submit';

            console.log(error);

            if(error.response.status == 401)
                errorText.innerHTML = error.response.data.message;
        })
}