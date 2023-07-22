var config = {
    headers: {
        "Accept": "application/json",
    }
}

var url = window.location.href;
var urlObject = new URL(url);
var id = urlObject.searchParams.get('id');

var message = document.getElementById("region-message");
var adminImage = document.getElementById("admin-image");
var teamImage = document.getElementById("team-image");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var account = document.getElementById("account");
var accountType = document.getElementById("account-type");
var reportMain = document.getElementById("reports-main");

const fetchRegion = async () => {
    await axios.post('/api/get/region', { id: id }, config)

        .then((response) => {
            console.log(response.data);

            if(response.data.success){
                message.innerHTML = response.data.data.message;
                adminImage.setAttribute("src", response.data.data.adminImage);
                teamImage.setAttribute("src", response.data.data.teamImage);
                phone.innerHTML = response.data.data.phone;
                email.innerHTML = response.data.data.email;
                account.innerHTML = response.data.data.account;
                accountType.innerHTML = response.data.data.accountType;

                reportMain.innerHTML = '';

                for(const entry of response.data.data.reports){
                  reportMain.innerHTML += `
                  <div class="col-lg-3 col-sm-6 mb-4">
                    <img class="report-image" style="width: 100%; height: 45vh; object-fit: cover; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;" src="${entry.image}" alt="">
                  </div>
                  `;
                }
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

const fetchHomeData = async () => {
    axios.get("/api/home/content", config)
      .then((response) => {
        console.log(response.data.data);

        if (response.data.success) {
          if(response.data.data.ration !== null){
            document.getElementById("ration-count").dataset.val = response.data.data.counting.ration;
            document.getElementById("education-count").dataset.val = response.data.data.counting.education;
            document.getElementById("orphanage-count").dataset.val = response.data.data.counting.orphanage;
            document.getElementById("medical-count").dataset.val = response.data.data.counting.medical;
            document.getElementById("food-count").dataset.val = response.data.data.counting.food;
          }
        }
      })
  
      .catch((error) => {
        console.log(error);
      })
  }

  fetchHomeData();