var config = {
    headers: {
        "Accept": "application/json",
    }
}

var inductionForm = document.getElementById("induction-form");
var successText = document.getElementById("success-text");
var errorText = document.getElementById("error-text");
var submitBtn = document.getElementsByClassName("submit-btn")[0];
var url = window.location.href;
var urlObject = new URL(url);
var id = urlObject.searchParams.get('id');

if(inductionForm !== undefined && inductionForm !== null){
    inductionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(inductionForm);

        if(formData.get('name') === '' || formData.get('cnic') === '' || formData.get('phone') === '' || formData.get('address') === '')
            return errorText.innerHTML = 'Please fill all the fields.';
        
        errorText.innerHTML = '';

        formData.append('region', id);

        addInduction(formData);
    })
}

const addInduction = async (formData) => {
    submitBtn.value = 'Loading...';

    await axios.post('/api/add-induction', formData, config)

    .then(response => {
        submitBtn.value = 'Submit';

        console.log(response.data);

        if(response.data.success){
            successText.innerHTML = response.data.message;

            setTimeout(() => {
                window.location = '/induction';
            }, 2500);
        }
    })

    .catch(error => {
        submitBtn.value = 'Submit';

        console.log(error);
    })
}