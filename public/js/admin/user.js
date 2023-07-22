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

var addRegionalAdminForm = document.getElementById("add_ra_form");

if (addRegionalAdminForm !== undefined && addRegionalAdminForm !== null) {
    addRegionalAdminForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let formData = new FormData(addRegionalAdminForm);

        if (formData.get('name') === '' || formData.get('email') === '' || formData.get('role') === '' || formData.get('password') === '' || formData.get('password_confirmation') === '')
            return errorText.innerHTML = 'All the fields are required.';

        if (formData.get('password') !== formData.get('password_confirmation'))
            return errorText.innerHTML = 'Password confirmation does not match.';

        errorText.innerHTML = '';

        addUser(formData);
    })
}

const addUser = async (formData) => {
    successText.innerHTML = '';
    errorText.innerHTML = '';

    submitBtn.innerHTML = 'Loading...';

    axios.post('/api/register', formData, config)

        .then((response) => {
            submitBtn.innerHTML = 'Submit';

            if(response.data.success)
                successText.innerHTML = 'Regional admin successfully added.'

            if(!response.data.success)
                errorText.innerHTML = response.data.message;
        })

        .catch((error) => {
            submitBtn.innerHTML = 'Submit';

            console.log(error);
        })
}

const fetchUser = async () => {
    axios.post('/api/regional-admin', config)

    .then((response) => {
        loadingText.innerHTML = '';

        if(response.data.success){
            let i = 1;

            table.innerHTML = '';

            for(const entry of response.data.data){
                table.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.role == 'admin' ? '<span class="badge bg-success">Admin</span>' : ''}${entry.role == 'ra' ? '<span class="badge bg-primary">Regional<br><p class="m-0 mt-1">Admin</p></span>' : ''}${entry.role == 'user' ? '<span class="badge bg-warning">User</span>' : ''}</td>
                    <td>
              <a href="/admin/edit/user?id=${entry._id}">
                <button type="button" class="btn btn-primary">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </a>
              <button type="button" class="btn btn-danger" onclick="deleteUser('${entry._id}')">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
                </tr>
                `

                i++;
            }
        }
            

        if(!response.data.success)
            errorText.innerHTML = response.data.message;
    })

    .catch((error) => {
        loadingText.innerHTML = '';

        console.log(error);
    })
}

const getId = async () => {
  var url = window.location.href;
  var urlObject = new URL(url);
  id = urlObject.searchParams.get('id');

  await getUser();
}

var username = document.getElementsByName("name")[0];
var email = document.getElementsByName("email")[0];
var role = document.getElementsByName("role")[0];

const getUser = async () => {
    axios.post('/api/regional-admin/get', {id: id}, config)

        .then((response) => {
            loadingText.innerHTML = '';

            if(response.data.success){
                username.value = response.data.data.name;
                email.value = response.data.data.email;

                if(response.data.data.role == 'admin')
                    document.getElementById("role-admin").selected = true;

                if(response.data.data.role == 'ra')
                    document.getElementById("role-ra").selected = true;

                if(response.data.data.role == 'user')
                    document.getElementById("role-user").selected = true;
            }
        })

        .catch((error) => {
            loadingText.innerHTML = '';

            console.log(error);
        })
}

var regionalAdminEditForm = document.getElementById("edit_ra_form");

if(regionalAdminEditForm !== undefined && regionalAdminEditForm !== null){
    regionalAdminEditForm.addEventListener(("submit"), (event) => {
        event.preventDefault();

        let formData = new FormData(regionalAdminEditForm);

        if (formData.get('name') === '' || formData.get('email') === ''|| formData.get('role') === '')
            return errorText.innerHTML = 'Name and email are required.';

        if (formData.get('password') !== '' && formData.get('password') !== formData.get('password_confirmation'))
            return errorText.innerHTML = 'Password confirmation does not match.';

        errorText.innerHTML = '';

        formData.append('id', id);

        updateUser(formData);
    })
}

const updateUser = async (formData) => {
    submitBtn.innerHTML = 'Loading...';

    await axios.post('/api/update-user', formData, config)

    .then((response) => {
        submitBtn.innerHTML = 'Submit';

        if(response.data.success){
            successText.innerHTML = 'Regional admin successfully updated.';
        }
    })

    .catch((error) => {
        loadingTesubmitBtnxt.innerHTML = 'Submit';

        console.log(error);
    })
}

const deleteUser = async (id) => {
    if (!window.confirm("Are you sure? This regional admin will be deleted!")) return;

    await axios.post('/api/delete-user', {id: id}, config)

    .then((response) => {
        if(response.data.success){
            alert("Regional admin successfully deleted.")
            
            fetchUser();
        }
    })

    .catch((error) => {
        console.log(error);
    })
}