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

let addEventForm = document.getElementById("add_event_form");
let editEventForm = document.getElementById("edit_event_form");

const fetchEvent = async () => {
    await axios.post('/api/ra/region-event', { regionId: regionId }, config)

        .then((response) => {
            loadingText.innerHTML = '';

            if (response.data.success) {
                table.innerHTML = '';

                let i = 1;

                for (const entry of response.data.data) {
                    table.innerHTML += `
                        <tr>
                            <td>${i}</td>
                            <td>${entry.title}</td>
                            <td colspan="1" style="max-width: 345px;"><p style="max-height: 21vh; overflow: scroll; overflow-x: hidden;">${entry.description}</p></td>
                            <td>
                                <img src="/${entry.image}" style="width: 233px; height: 210px; object-fit: cover;" />
                            </td>
                            <td>
                                <a href="/ra/edit/event?id=${entry._id}">
                                <button type="button" class="btn btn-primary">
                                <i class="bi bi-pencil-square"></i>
                                </button>
                            </a>
                            <button type="button" class="btn btn-danger" onclick="deleteEvent('${entry._id}')">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                            </td>
                        </tr>
                    `;

                    i++;
                }
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

if (addEventForm !== undefined && addEventForm !== null) {
    addEventForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(addEventForm);

        if (formData.get('title') === '' || formData.get('description') === '' || formData.get('image').size < 1)
            return errorText.innerHTML = 'All the fields are required.';

        errorText.innerHTML = '';

        formData.append('regionId', regionId);

        createEvent(formData);
    })
}

const getEvent = async () => {
    axios.post('/api/ra/get-event', { id: id }, config)

        .then((response) => {
            loadingText.innerHTML = '';

            if (response.data.success) {
                let title = document.getElementsByName("title")[0];
                let description = document.getElementsByName("description")[0];

                title.value = response.data.data.title;
                description.value = response.data.data.description;
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

const createEvent = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/ra/add/event', formData, config)

        .then((response) => {
            submitBtn.innerHTML = 'Submit';

            if (response.data.success) successText.innerHTML = response.data.message;
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Submit';

            console.log(error);
        })
}

if (editEventForm !== undefined && editEventForm !== null) {
    editEventForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(editEventForm);

        formData.append('id', id);

        updateEvent(formData);
    })
}

const updateEvent = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/ra/update/event', formData, config)

        .then((response) => {
            submitBtn.innerHTML = 'Submit';

            if (response.data.success)
                successText.innerHTML = response.data.message;
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Submit';

            console.log(error);
        })
}

const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure? This event will be deleted.")) return;

    await axios.post('/api/ra/delete/event', { id: id }, config)

        .then((response) => {
            fetchEvent();

            if (response.data.success)
                alert(response.data.message);
        })

        .catch((error) => {
            console.log(error);
        })
}