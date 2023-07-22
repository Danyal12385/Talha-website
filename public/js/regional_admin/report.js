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
var regionId = JSON.parse(localStorage.getItem('region'))._id;
var url = window.location.href;
var urlObject = new URL(url);
var id = urlObject.searchParams.get('id');

var addReportForm = document.getElementById("add-report-form");
var imageField = document.getElementById("add-report-field");

if (imageField !== undefined && imageField !== null) {
    imageField.addEventListener("change", (event) => {
        if (event.target.files.size < 1) return;

        let imageUrl = URL.createObjectURL(event.target.files[0]);

        document.getElementById("add-event-image-preview").setAttribute("src", imageUrl);
    })
}

if (addReportForm !== undefined && addReportForm !== null) {
    addReportForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(addReportForm);

        formData.append('regionId', regionId);

        if (formData.get('image').size < 1)
            return errorText.innerHTML = '*Upload an image for the report.';

        errorText.innerHTML = '';

        addReport(formData);
    })
}

const fetchReport = async () => {
    await axios.post('/api/ra/region-report', { regionId: regionId }, config)

        .then(response => {
            loadingText.innerHTML = '';

            if (response.data.success) {
                table.innerHTML = '';

                let i = 1;

                for (const entry of response.data.data) {
                    table.innerHTML += `
                        <tr>
                            <td>${i}</td>
                            <td>
                                <img src="/${entry.image}" style="max-width: 400px; max-height: 24vh; object-fit: cover;">
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="deleteReport('${entry._id}')">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </td>
                            </tr>
                    `;

                    i++;
                }
            }
        })

        .catch(error => {
            console.log(error);
        })
}

const addReport = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/ra/add/report', formData, config)

        .then((response) => {
            submitBtn.innerHTML = 'Submit';

            if (response.data.success) {
                successText.innerHTML = response.data.message;

                loadingText.innerHTML = 'Loading...';

                fetchReport();
            }
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Submit';

            console.log(error);
        })
}

const deleteReport = async (id) => {
    if (!window.confirm("Are you sure? This report will be deleted.")) return;

    axios.post('/api/ra/delete/report', { id: id }, config)

        .then(response => {
            if(response.data.success){
                fetchReport();

                alert(response.data.message);
            }
        })

        .catch(error => {
            console.log(error);
        })
}