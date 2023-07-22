var config = {
    headers: {
        "Accept": "application/json",
    }
}

var donationForm = document.getElementById("donation-form");
var emailError = document.getElementById("email-error");
var amountError = document.getElementById("amount-error");
var submitBtn = document.getElementById("submit-btn");
var cityCards = document.getElementById("main-region-card");

const fetchRegions = async () => {
    axios.get('/api/fetch-region', config)

        .then((response) => {
            cityCards.innerHTML = '';
            console.log(response.data);

            if(response.data.success){
                for(const entry of response.data.data){
                    cityCards.innerHTML += `
                    <div class="col-3">
                        <div class="flood-5 d-flex flex-column justify-content-center">
                            <h1 style="margin-left: 70px; color:white; margin-top: 50px;">${entry.name}</h1>
                            <p style="margin-left: 50px; color:white; margin-top: 20px;">${entry.accountType} : ${entry.account}<br>
                            <br>
                            Email : ${entry.email}<br>
                            Phone: ${entry.phone}<br><br>
                            </p>
                        </div>
                    </div>
                    `;
                }
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

if (donationForm !== undefined && donationForm !== null) {
    donationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(donationForm);

        if (formData.get('email') === '')
            return emailError.innerHTML = 'Please enter your email.';

        emailError.innerHTML = '';

        if (formData.get('amount') === '')
            return amountError.innerHTML = 'Please enter the amount.';

        if (formData.get('amount') < 200)
            return amountError.innerHTML = 'Minimum donation amount is 200.';

        amountError.innerHTML = '';

        checkoutSession(formData);
    })
}

const checkoutSession = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    axios.post('/api/checkout-session', formData, config)

        .then((response) => {
            submitBtn.innerHTML = 'Donate';

            window.location = response.data.url;
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Donate';

            console.log(error);
        })
}