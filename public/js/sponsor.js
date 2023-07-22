var config = {
    headers: {
        "Accept": "application/json",
    }
}

var sponsorForm = document.getElementById("sponsor-form");
var successText = document.getElementById("success-text");
var errorText = document.getElementById("error-text");
var submitBtn = document.getElementsByClassName("submit-btn")[0];
var url = window.location.href;
var urlObject = new URL(url);
var regionId = urlObject.searchParams.get('region');
var eventId = urlObject.searchParams.get('event');

if(sponsorForm !== undefined && sponsorForm !== null){
    sponsorForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(sponsorForm);

        if(formData.get('name') === '' || formData.get('cnic') === '' || formData.get('phone') === '' || formData.get('address') === '')
            return errorText.innerHTML = 'Please fill all the fields.';
        
        errorText.innerHTML = '';

        formData.append('region', regionId);
        formData.append('event', eventId);

        addInduction(formData);
    })
}

const addInduction = async (formData) => {
    submitBtn.value = 'Loading...';

    await axios.post('/api/add-sponsor', formData, config)

    .then(response => {
        submitBtn.value = 'Submit';

        console.log(response.data);

        if(response.data.success){
            successText.innerHTML = response.data.message;

            setTimeout(() => {
                window.location = '/events';
            }, 2500);
        }
    })

    .catch(error => {
        submitBtn.value = 'Submit';

        console.log(error);
    })
}