var config = {
    headers: {
        "Accept": "application/json",
    }
}

var regionMain = document.getElementsByClassName("regions-main")[0];

const fecthRegion = async () => {
    axios.get('/api/fetch-region', config)

    .then(response => {
        console.log(response.data);

        if(response.data.success){
            regionMain.innerHTML = '';

            for(const entry of response.data.data){
                regionMain.innerHTML += `
                <div class="col-md-4">
                <div class="div1"
                  style="width: 250px; align-items: center;   display: flex; flex-direction: column; margin: auto; height: 150px; background-color: rgba(0, 0, 0, 0.5); box-shadow: inset -5px -5px rgba(0, 0, 0, 0.5); border-radius: 25px; margin-left: 150px;margin-top: 50px; float: left;"
                  data-aos="fade-right">
                  <a style="color: white;" href="/region?id=${entry._id}">
                    <h1 style=" color:white; margin-top: 50px;">${entry.name}</h1>
                  </a>
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