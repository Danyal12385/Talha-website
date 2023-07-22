var config = {
    headers: {
        "Accept": "application/json",
    }
}

var table = document.getElementsByClassName("table-body-main")[0];
var loadingText = document.getElementById("loading-text");

const fetchSponsor = async () => {
    axios.get('/api/fetch-sponsor', config)

        .then(response => {
            console.log(response.data);
            loadingText.innerHTML = '';
            table.innerHTML = '';

            if (response.data.success) {
                let i = 1;

                for (const entry of response.data.data) {
                    table.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${entry.name}</td>
                        <td>${entry.cnic}</td>
                        <td>${entry.phone}</td>
                        <td>${entry.address}</td>
                        <td>${entry.region.name}</td>
                        <td>${entry.event.title}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="deleteSponsor('${entry._id}')">
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

const deleteSponsor = async (id) => {
    if (!window.confirm("Are you sure? This induction request will be deleted!")) return;

    axios.post('/api/admin/sponsor/delete', { id }, config)

        .then(response => {
            if (response.data.success) {
                loadingText.innerHTML = 'Loading...';

                fetchSponsor();
                alert(response.data.message);
            }
        })

        .catch(error => {
            console.log(error);
        })
}