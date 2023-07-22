var config = {
    headers: {
        "Accept": "application/json",
    }
}

var footer = document.getElementById("footer-container");

var regions = '';

document.addEventListener("DOMContentLoaded", () => {
    loadRegions();
})

const loadRegions = async () => {
    if (footer !== undefined && footer !== null) {
        await axios.get('/api/fetch-region', )
    
            .then((response) => {
                if(response.data.success){
                    for(const entry of response.data.data){
                        regions += `
                        <a href="/region?id=${entry._id}" style="color: #fff; text-decoration: underline;">
                            <p>${entry.name}</p>
                        </a>
                        `;
                    }
                }
            })
    
            .catch((error) => {
                console.log(error);
            })
    
    
        footer.innerHTML = `
        <div class="Footer row m-0" style="padding-top: 40px;">
        <div class="col-4" style="padding-left: 51px;">
          <img src="/public/images/kara-kamal-logo.jpg"
            style="width: 100px;height:100px;position: relative; border-radius: 50%;">
          <br>
          <p style="font-size: 12px;margin-top: 40px;">Donate for After_life</p>
          <p style="padding-right: 30px;">
            KAAR-E-KAMAL Is a Non-Profitable Organization.
            It was started almost 4 years ago and now it is working in 14+ cities of Pakistan
            and still growing day by day. Every city has its own donations records and
            individual events like Orphanage visits, d drives, Flood Campaigns, Medical camps etc.
            Each City has their individual families which must be fed every month.
          </p>
        </div>
        <div class="col-4">
          <h1>Contact</h1>
          <br>
          <p>Address: Head Quater of Kara kamal Welfare Foundation Lahore-Pakistan</p>
          <br>
          <p>UAN:111-983-222-323-21</p>
          <br>
          <p>Cell: 03043211214</p>
          <br>
          <a href="#" class="fa fa-facebook"></a>
          <a href="#" class="fa fa-instagram"></a>
          <a href="#" class="fa fa-linkedin"></a>
          <a href="#" class="fa fa-twitter"></a>
          <div class="Button-footer"><a href="/donate"><button>Donate</button></a></div>
        </div>
        <div class="col-4">
          <h1>Regions</h1>
          <br>
          ${regions}
        </div>
      </div>
      <div class="Footer-bottom" style="margin-top: -24px;">
      <hr style="height: 1px; background-color: #fff; opacity: 1 !important;">
      <p>Copyright &copy; 2022 by Kara Kamal Welfare Organization</p>
    </div>
        `;
    }
}