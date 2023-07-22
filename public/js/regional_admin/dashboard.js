var config = {
  headers: {
    "Accept": "application/json",
  }
}

var sidebar = document.getElementById("sidebar");
var navbar = document.getElementById("nav-bar");
var active = 'bg-primary rounded-2';
var indexElement = document.getElementById("page-index");
var stats = document.getElementById("main-stats");
var index = '';

if  (indexElement !== undefined && indexElement !== null)
    index = parseInt(indexElement.dataset.index);

if (sidebar !== undefined && sidebar !== null) {
    sidebar.innerHTML = `<div class="offcanvas-body p-0">
<nav class="navbar-dark">
  <ul class="navbar-nav">
    <li>
      <div class="text-muted small fw-bold text-uppercase px-3">
        CORE
      </div>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 0 ? active : ''}">
      <a href="/ra/dashboard" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
        <span class="sidebar-item-text">Dashboard</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 1 ? active : ''}">
      <a href="/ra/induction" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-person-dash"></i></span>
        <span class="sidebar-item-text">Induction</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 2 ? active : ''}">
      <a href="/ra/event" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-calendar2-event"></i></span>
        <span class="sidebar-item-text">Events</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 3 ? active : ''}">
      <a href="/ra/add/event" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-pen"></i></span>
        <span class="sidebar-item-text">Add Event</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 4 ? active : ''}">
      <a href="/ra/report" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-book"></i></span>
        <span class="sidebar-item-text">Reports</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 5 ? active : ''}">
      <a href="/ra/induction-request" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-hand-index-thumb"></i></span>
        <span class="sidebar-item-text">Induction Requests</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 6 ? active : ''}">
      <a href="/ra/sponsor" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-hand-thumbs-up"></i></span>
        <span class="sidebar-item-text">Sponsors</span>
      </a>
    </li>
    <li class="sidebar-item my-1 mx-2 ${index === 7 ? active : ''}">
      <a href="/ra/family" class="nav-link px-3 active">
        <span class="me-2"><i class="bi bi-people"></i></span>
        <span class="sidebar-item-text">Families</span>
      </a>
    </li>
  </ul>
</nav>
</div>`;
}

if (navbar !== undefined && navbar !== null) {
    navbar.innerHTML = `<div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebar"
      aria-controls="offcanvasExample"
    >
      <span class="navbar-toggler-icon" data-bs-target="#sidebar"></span>
    </button>
    <a
      class="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
      href="/ra/dashboard"
      >Regional Admin</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#topNavBar"
      aria-controls="topNavBar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="topNavBar">
      <form class="d-flex ms-auto my-3 my-lg-0" style="opacity: 0; user-select: none; pointer-events: none;">
        <div class="input-group">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-primary" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle ms-2"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-fill"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="/api/logout">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>`;
}

const fetchDashboardStats = async () => {
  const myRegionId = JSON.parse(localStorage.getItem("region"))._id;

  await axios.post('/api/ra/dashboard-stats', {id: myRegionId}, config)

    .then(res => {
      console.log(res.data);
      stats.innerHTML = '';
      let data = res.data.data;

      if (res.data.success) {
        stats.innerHTML += `
        <div class="col-lg-3 col-md-6 col-12 mb-4">
        <div class="box p-4 rounded-2">
          <div class="d-flex justify-content-between align-items-center">
            <i class="box-icon bi bi-calendar2-event text-primary"></i>
            <div class="box-texts">
              <div>
                <h3 class="box-title text-center m-0 mb-2">${data.eventCount}</h3>
                <a href="/ra/event" class="box-desc">Events <i class="box-desc-icon bi bi-chevron-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-12 mb-4">
      <div class="box p-4 rounded-2">
        <div class="d-flex justify-content-between align-items-center">
          <i class="box-icon bi bi-flag text-success"></i>
          <div class="box-texts">
            <div>
              <h3 class="box-title text-center m-0 mb-2">${data.reportCount}</h3>
              <a href="/ra/report" class="box-desc">Reports <i class="box-desc-icon bi bi-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-12 mb-4">
    <div class="box p-4 rounded-2">
      <div class="d-flex justify-content-between align-items-center">
        <i class="box-icon bi bi-award text-danger"></i>
        <div class="box-texts">
          <div>
            <h3 class="box-title text-center m-0 mb-2">${data.sponsorCount}</h3>
            <a href="/ra/sponsor" class="box-desc">Sponsors <i class="box-desc-icon bi bi-chevron-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <div class="box p-4 rounded-2">
            <div class="d-flex justify-content-between align-items-center">
              <i class="box-icon bi bi-people text-warning"></i>
              <div class="box-texts">
                <div>
                  <h3 class="box-title text-center m-0 mb-2">${data.familyCount}</h3>
                  <a href="/ra/family" class="box-desc">Family Registrations <i class="box-desc-icon bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <div class="box p-4 rounded-2">
            <div class="d-flex justify-content-between align-items-center">
              <i class="box-icon bi-hand-index-thumb text-info"></i>
              <div class="box-texts">
                <div>
                  <h3 class="box-title text-center m-0 mb-2">${data.inductionCount}</h3>
                  <a href="/ra/induction-request" class="box-desc">Induction Requests <i class="box-desc-icon bi bi-chevron-right"></i></a>
                </div>
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