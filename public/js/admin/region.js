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
var id = '';
var adminId = '';

var addRegionForm = document.getElementById("add_region_form");
var table = document.getElementsByClassName("table-body-main")[0];

const fetchRegions = () => {
    axios.get('/api/region', config)

        .then((response) => {
            loadingText.innerHTML = '';
            console.log(response.data);
            if (response.data.success) {
                table.innerHTML = '';

                let i = 1;

                for (const entry of response.data.data) {
                    table.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${entry.name}</td>
                        <td>${entry.email}</td>
                        <td>${entry.phone}</td>
                        <td>${entry?.admin?.name}</td>
                        <td>
                        <a href="/admin/edit/region?id=${entry._id}">
                          <button type="button" class="btn btn-primary">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                        </a>
                        <button type="button" class="btn btn-danger" onclick="deleteRegion('${entry._id}')">
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

const getId = async () => {
    var url = window.location.href;
    var urlObject = new URL(url);
    id = urlObject.searchParams.get('id');

    await getRegion();
    await fetchRegionalAdmins();
}

const getRegion = async () => {
    let regionName = document.getElementsByName("name")[0];
    let email = document.getElementsByName("email")[0];
    let phone = document.getElementsByName("phone")[0];
    let account = document.getElementsByName("account")[0];
    let accountType = document.getElementsByName("accountType")[0];
    let message = document.getElementsByName("message")[0];

    await axios.post('/api/get/region', { id: id }, config)

        .then((response) => {
            loadingText.innerHTML = '';

            console.log(response.data);

            if (response.data.success) {
                regionName.value = response.data.data.name;
                email.value = response.data.data.email;
                phone.value = response.data.data.phone;
                account.value = response.data.data.account;
                accountType.value = response.data.data.accountType;
                message.value = response.data.data.message;

                adminId = response.data.data.raId;
            }
        })

        .catch((error) => {
            loadingText.innerHTML = '';

            console.log(error);
        })
}

const fetchRegionalAdmins = async () => {
    await axios.post('/api/regional-admin', config)

        .then((response) => {
            console.log(response.data);

            if (response.data.success) {
                let raId = document.getElementsByName("raId")[0];

                raId.innerHTML = '<option value="" selected>select...</option>';

                for (const entry of response.data.data) {
                    raId.innerHTML += `
                        <option value="${entry._id}" ${adminId === entry._id ? 'selected' : ''}>${entry.name}</option>
                        `
                }
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

if (addRegionForm !== undefined && addRegionForm !== null) {
    addRegionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        var formData = new FormData(addRegionForm);

        if (formData.get('name') === '' || formData.get('email') === '' || formData.get('phone') === '' || formData.get('account') === '' || formData.get('accountType') === '' || formData.get('raId') === '' || formData.get('message') === '' || formData.get('adminImage').size < 1 || formData.get('teamImage').size < 1)
            return errorText.innerHTML = 'All the fields are required.';

        errorText.innerHTML = '';

        addRegion(formData);
    })
}

const addRegion = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/add/region', formData, config)

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

var editRegionForm = document.getElementById("edit_region_form");

if (editRegionForm !== undefined && editRegionForm !== null) {
    editRegionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(editRegionForm);

        if (formData.get('name') === '' || formData.get('email') === '' || formData.get('phone') === '' || formData.get('account') === '' || formData.get('accountType') === '' || formData.get('raId') === '' || formData.get('message') === '')
            return errorText.innerHTML = 'All the fields are required.';

        errorText.innerHTML = '';

        formData.append('id', id);

        updateRegion(formData);
    })
}

const updateRegion = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/updateRegion/region', formData, config)

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

const deleteRegion = async (id) => {
    if (!window.confirm("Are you sure? This Region will be deleted!")) return;

    axios.post('/api/delete/region', { id: id }, config)

        .then((response) => {
            if (response.data.success) {
                fetchRegions();

                alert(response.data.message);
            }
        })

        .catch((error) => {
            console.log(error);
        })
}