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

const fetchDonation = async () => {
    axios.get('/api/fetch-donation', config)

    .then((response) => {
        loadingText.innerHTML = '';
        table.innerHTML = '';

        let i = 1;

        for(const entry of response.data.data){
            table.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${entry.email}</td>
                    <td>Rs. ${entry.amount}</td>
                    <td><span class="text-center ${entry.status === `paid` ? `bg-success` : ``} ${entry.status === `unpaid` ? `bg-danger` : ``}  ${entry.status === `pending` ? `bg-warning` : ``}" style="font-size: 13px; color: #fff; padding: 5px 11px; border-radius: 5px; width: 72px; display: block;">${entry.status}</span></td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="deleteDonation('${entry._id}')">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;

            i++;
        }
    })

    .catch((error) => {
        loadingText.innerHTML = '';

        console.log(error);
    })
}

const deleteDonation = async (id) => {
    if (!window.confirm("Are you sure? This transaction will be deleted!")) return;

    await axios.post('/api/delete-donation', {id: id}, config)

    .then((response) => {
        fetchDonation();

        if (response.data.success) alert(response.data.message);
    })

    .catch((error) => {
        console.log(error);
    })
}