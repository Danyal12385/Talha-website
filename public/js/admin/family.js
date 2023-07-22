var config = {
    headers: {
        "Accept": "application/json",
    }
}

var table = document.getElementsByClassName("table-body-main")[0];
var successText = document.getElementById("success");
var errorText = document.getElementById("error");
var loadingText = document.getElementById("loading-text");
var modalContainer = document.getElementById("modal-container");

const getFamily = async () => {
    await axios.post('/api/admin/get-family', config)

    .then(response => {
        console.log(response.data);
        loadingText.innerHTML = '';
        table.innerHTML = '';

        let i = 1;

        for(const entry of response.data.data){
            table.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${entry.name}</td>
                    <td>${entry.phone}</td>
                    <td>${entry.registrationNumber}</td>
                    <td>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#modal-${entry._id}">Details</a
                    </td>
                </tr>
            `;

            i++;

            modalContainer.innerHTML += `
            <div class="modal fade" id="modal-${entry._id}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Details</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span class="mb-2">Name</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.name}" readonly>
                    <span class="mb-2">Head Name</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.headName}" readonly>
                    <span class="mb-2">Cnic</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.cnic}" readonly>
                    <span class="mb-2">Registration Number</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.registrationNumber}" readonly>
                    <span class="mb-2">Phone Number</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.phone}" readonly>
                    <span class="mb-2">Monthly Income</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.income}" readonly>
                    <span class="mb-2">Fee Case</span>
                    <input type="text" class="form-control shadow-none mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value="${entry.feeCase}" readonly>
                    <span class="mb-2">Address</span>
                    <textarea class="form-control shadow-none mb-2" id="exampleFormControlTextarea1" rows="3" readonly>${entry.address}</textarea>
                    ${entry.cnicMedia ? `<a class="mb-3" href="/${entry.cnicMedia}">View cnic</a><br>` : ``}
                    ${entry.billMedia ? `<a class="mb-3" href="/${entry.billMedia}">View bill</a><br>` : ``}
                    ${entry.bFormMedia ? `<a class="" href="/${entry.bFormMedia}">View bey-form</a><br>` : ``}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            `;
        }
    })

    .catch(error => {
        console.log(error);
    })
}