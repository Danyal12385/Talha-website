var config = {
    headers: {
        "Accept": "application/json",
    }
}

var table = document.getElementsByClassName("table-body-main")[0];
var successText = document.getElementById("success");
var errorText = document.getElementById("error");
var loadingText = document.getElementById("loading-text");

const fetchInduction = async () => {
    axios.get('/api/admin/induction', config)

        .then(response => {
            console.log(response.data);

            loadingText.innerHTML = '';
            table.innerHTML = '';

            if(response.data.success){
                let i = 1;

                for(const entry of response.data.data){
                    table.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${entry.name}</td>
                        <td>${entry.cnic}</td>
                        <td>${entry.phone}</td>
                        <td>${entry.region.name}</td>
                        <td>${entry.address}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="deleteInduction('${entry._id}')">
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

const deleteInduction = async (id) => {
    if (!window.confirm("Are you sure? This induction request will be deleted!")) return;

    axios.post('/api/admin/induction/delete', {id}, config)

    .then(response => {
        if(response.data.success){
            loadingText.innerHTML = 'Loading...';
            fetchInduction();
            alert(response.data.message);
        }
    })

    .catch(error => {
        console.log(error);
    })
}