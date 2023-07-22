var config = {
    headers: {
        "Accept": "application/json",
    }
}

var eventContainer = document.getElementsByClassName("event-container")[0];
var eventMain = document.getElementsByClassName("event-main")[0];

const fetchEvent = async () => {
    axios.get('/api/home-event', config)

    .then(response => {
        console.log(response.data);
        
        if(response.data.success){
            eventContainer.innerHTML = '';

            for(const entry of response.data.data){
                if (entry.events.length < 1) continue;

                let events = '';
                
                for(const event of entry.events){
                    events += `
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="card border-0" style="width: 18rem; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
                            <img style="width: 100%; height: 25vh; object-fit: cover;" src="${event.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text" style="max-height: 15vh; overflow-y: scroll;">${event.description}</p>
                            <a href="/sponsor?region=${event.regionId}&event=${event._id}" class="btn btn-outline-primary sponsor-btn">Sponser</a>
                            </div>
                        </div>
                    </div>`;
                }

                eventContainer.innerHTML += `
                <h2 class="event-region my-3">${entry.name}</h2>
                <div class="event-main row">
                    ${events}
                </div>
                `;
            }
        }
    })

    .catch(error => {
        console.log(error);
    })
}