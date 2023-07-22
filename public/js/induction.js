var config = {
    headers: {
        "Accept": "application/json",
    }
}

var inductionMain = document.getElementById("induction-main");

const fetchRegion = () => {
    axios.get('/api/fetch-region', config)

        .then(response => {
            console.log(response.data);

            inductionMain.innerHTML = '';

            if(response.data.success){
                for(const entry of response.data.data){
                    inductionMain.innerHTML += `
                    <div class="col-md-4 mb-3">
                    <div class="div1 pb-5"
                    style="width: 350px; padding-left: 15px; align-items: center;  display: flex; flex-direction: column; margin: auto; background-color: rgba(0, 0, 0, 0.5); box-shadow: inset -5px -5px rgba(0, 0, 0, 0.5); border-radius: 25px;">
                    <h1 style=" color:white; margin-top: 33px;">${entry.name}</h1>
                    <p class="induction-message" style="color:white; margin-top: 20px;color: white; margin-top: 20px; max-height: 15vh; overflow-y: scroll;">${entry.message}</p>
                    <div style="align-content: center; ">
                        <span class="regbt">
                        <a href="${parseInt(entry.induction) === 1 ? `/induction/enroll?id=${entry._id}` : `#`}"><button class=" reganchor">${parseInt(entry.induction) === 1 ? `Open` : `Close`}</button></a>
                        </span>
                    </div>
                    </div>
                </div>
                    `;
                }
            }
        })

        .catch(error => {
            console.log(error);
        })
}