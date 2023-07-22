var config = {
  headers: {
    "Accept": "application/json",
  }
}

var homeAddContent = document.getElementById("home_add_content");
var success = document.getElementById("success");
var error = document.getElementById("error");
var submitBtn = document.getElementById("submit-btn");

if (homeAddContent !== undefined && homeAddContent !== null) {
  document.getElementById("home_add_content").addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);

    if (formData.get('title') === '' || formData.get('description') === '' || formData.get('media').size < 1 || !formData.get('useMedia'))
      return error.innerHTML = "All the fields are required.";

    error.innerHTML = "";

    createSection(formData);
  });
}

const createSection = async (formData) => {
  submitBtn.innerHTML = 'Loading...';

  await axios.post("/api/admin/home-content/add", formData, config)
    .then((response) => {
      if (response.data.success) {
        submitBtn.innerHTML = 'Submit';

        success.innerHTML = response.data.message;
      }
    })

    .catch((error) => {
      console.log(error);
    })
}

var mainContent = document.getElementsByClassName("main")[0];

const fetchHomeData = async () => {
  axios.get("/api/home/content", config)
    .then((response) => {
      if (response.data.success) {
        if(response.data.data.content !== null){
          for (let i = 0; i < response.data.data.content.length; i++) {
            mainContent.innerHTML += `<div class="video row" style="${i !== 0 ? `margin-top: 45px;` : ``}">
                      <div class="col-lg-6">
                        <h1 style="padding-left: 30px;" data-aos="fade-right">${response.data.data.content[i].title}</h1>
                      <br>
                      <p style="padding-left: 30px; line-height:25px;" data-aos="fade-right">
                        ${response.data.data.content[i].description}
                      </p>
                      <br>
                      </div>
                      <div class="col-lg-6">
                        ${response.data.data.content[i].useMedia === 'image' ? `<img
                        src="/${response.data.data.content[i].media}"
                        alt="" width="680" height="360"
                        style="margin-right: 60px;margin-left: 90px; float: right; max-height: 52vh; width: -webkit-fill-available; object-fit: cover; ">
                      </div>` : `<video width="680" height="360" style="margin-right: 60px;margin-left: 90px; float: right;" controls>
                      <source src="/${response.data.data.content[i].media}" type="video/mp4">
                      <source src="/${response.data.data.content[i].media}" type="video/ogg">
                      Your browser does not support the video tag.
                    </video>`}
                      </div>`;
          }
        }

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

var tableBody = document.getElementsByClassName("table-body-main")[0];

const fetchHomeContentAdmin = async () => {
  axios.get("/api/home/content", config)
    .then((response) => {
      if (response.data.success) {
        document.getElementById("loading-text").innerHTML = '';

        tableBody.innerHTML = '';

        for (let i = 0; i < response.data.data.content.length; i++) {
          let description = response.data.data.content[i].description.split(" ").slice(0, 15).join(" ");

          tableBody.innerHTML += `
              <tr>
              <th>${i + 1}</th>
              <td>${response.data.data.content[i].title}</td>
              <td>${description}...</td>
              <td>
              <a href="/admin/edit/home-content?id=${response.data.data.content[i]._id}">
                <button type="button" class="btn btn-primary">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </a>
              <button type="button" class="btn btn-danger" onclick="homeSectionDelete('${response.data.data.content[i]._id}')">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
            </tr>`;
        }
      }
    })

    .catch((error) => {
      console.log(error);
    })
}

const homeSectionDelete = async (id) => {
  if (!window.confirm("Are you sure? This section will be deleted!")) return;

  axios.post("/api/admin/home-content/delete", { "id": id }, config)
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.message);

        fetchHomeContentAdmin();
      }
    })

    .catch((error) => {
      console.log(error);
    })
}


var id = '';

const getContentId = async () => {
  var url = window.location.href;
  var urlObject = new URL(url);
  id = urlObject.searchParams.get('id');

  await fetchSection(id);
}

const fetchSection = async (id) => {
  let title = document.getElementsByName("title")[0];
  let description = document.getElementsByName("description")[0];
  let useMedia = document.getElementsByName("useMedia");

  axios.post("/api/admin/home-content/edit", { id: id }, config)
    .then((response) => {
      if (response.data.success) {
        document.getElementById("loading-text").innerHTML = '';

        title.value = response.data.data[0].title;
        description.value = response.data.data[0].description;

        if (response.data.data[0].useMedia === 'image') {
          useMedia[0].checked = true;
        } else {
          useMedia[1].checked = true;
        }
      }
    })

    .catch((error) => {
      console.log(error);
    })
}

const editForm = document.getElementById("home_edit_content");

if (editForm !== undefined && editForm !== null) {
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append('id', id);

    if (formData.get('title') === '' || formData.get('description') === '')
      return error.innerHTML = "All the fields are required.";

    error.innerHTML = "";

    updateSection(formData);
  })
}

const updateSection = async (formData) => {
  submitBtn.innerHTML = 'Loading...';

  await axios.post("/api/admin/home-content/update", formData, config)
    .then((response) => {
      submitBtn.innerHTML = 'Submit';

      if (response.data.success) {

        success.innerHTML = response.data.message;
      }
    })

    .catch((error) => {
      console.log(error);
    })
}

var ration = document.getElementsByName("ration")[0];
var education = document.getElementsByName("education")[0];
var orphanage = document.getElementsByName("orphanage")[0];
var medical = document.getElementsByName("medical")[0]
var food = document.getElementsByName("food")[0];

const getHomeCounting = async () => {
  await axios.get("/api/admin/home-couting", config)
    .then((response) => {
      document.getElementById("loading-text").innerHTML = '';
      console.log(response.data);

      if (response.data.data !== null) {
        ration.value = response.data.data.ration;
        education.value = response.data.data.education;
        orphanage.value = response.data.data.orphanage;
        medical.value = response.data.data.medical;
        food.value = response.data.data.food;
      }
    })

    .catch((error) => {
      console.log(error);
    })
}

var homeCountingForm = document.getElementById("home_edit_counting");

if (homeCountingForm !== undefined && homeCountingForm !== null) {
  homeCountingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);

    if (formData.get('ration') === '' || formData.get('education') === '' || formData.get('orphanage') === '' || formData.get('medical') === '' || formData.get('food') === '')
      return error.innerHTML = "All the fields are required.";

    error.innerHTML = "";

    updateHomeCounting(formData);
  })
}

const updateHomeCounting = async (formData) => {
  submitBtn.innerHTML = 'Loading...';

  await axios.post("/api/admin/home-couting", formData, config)
  .then((response) => {
    submitBtn.innerHTML = 'Submit';

    console.log(response.data);
    if (response.data.success) {
      success.innerHTML = response.data.message;
    }
  })

  .catch((error) => {
    console.log(error);
  })
}