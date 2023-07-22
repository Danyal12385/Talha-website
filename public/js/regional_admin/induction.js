var config = {
    headers: {
        "Accept": "application/json",
    }
}

var table = document.getElementsByClassName("table-body-main")[0];
var successText = document.getElementById("success");
var errorText = document.getElementById("error");
var loadingText = document.getElementById("loading-text");
var submitBtn = document.getElementById("submit-btn");
var id = JSON.parse(localStorage.getItem("region"))._id;
var regionInduction = JSON.parse(localStorage.getItem('region')).induction;

let inductionField = document.getElementById("induction-field");
let inductionStatus = document.getElementById("induction-status");

if(parseInt(regionInduction) === 1){
    inductionField.checked = true;
} else {
    inductionField.checked = false;
}

if(inductionField.checked){
    inductionStatus.innerHTML = 'On';
} else {
    inductionStatus.innerHTML = 'Off';
}

const loadContent = async => {
    let region = JSON.parse(localStorage.getItem('region'));
}

if(inductionField !== undefined && inductionField !== null){
    inductionField.addEventListener("change", (event) => {
        if(event.target.checked){
            return inductionStatus.innerHTML = 'On';
        }

        inductionStatus.innerHTML = 'Off';
    })
}

const inductionStatusEditForm = document.getElementById("induction-status-edit-form");

if(inductionStatusEditForm !== undefined && inductionStatusEditForm !== null){
    inductionStatusEditForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = {id: id, status: 0};

        if (inductionField.checked) formData.status = 1;

        updateStatus(formData);
    })
}

const updateStatus = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/ra/update/induction-status', formData, config)

    .then((response) => {
        submitBtn.innerHTML = 'Update';

        if(response.data.success){
            let region = JSON.parse(localStorage.getItem("region"));

            region.induction = formData.status;

            localStorage.setItem("region", JSON.stringify(region));

            successText.innerHTML = response.data.message;
        }
    })

    .catch((error) => {
        submitBtn.innerHTML = 'Update';

        console.log(error);
    })
}