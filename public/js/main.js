var config = {
    headers: {
        "Accept": "application/json",
    }
}
const fetchRegion = async () => {
    axios.get('/api/fetch-region', config)

        .then((response) => {
            console.log(response.data);

            if (response.data.success) {
                let regionField = document.getElementsByClassName("region-container")[0];

                regionField.innerHTML = '';

                regionField.innerHTML = `<option value="" selected>Select...</option>`;

                for (const entry of response.data.data) {
                    regionField.innerHTML += `
                        <option value="${entry._id}">${entry.name}</option>
                    `;
                }
            }
        })

        .catch((error) => {
            console.log(error);
        })
}

document.getElementById("family-form").addEventListener("submit", (event) => {

    event.preventDefault();
    let formData = new FormData(event.target);

    let data = new FormData(event.target);

    if (formData.get('cnicMedia').size > 0) {
        let extension = formData.get('cnicMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    if (formData.get('bFormMedia').size > 0) {
        let extension = formData.get('bFormMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    if (formData.get('billMedia').size > 0) {
        let extension = formData.get('billMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    var user = document.getElementById("name").value;
    var head = document.getElementById("Headfamily").value;
    var father = document.getElementById("Father").value;
    var cnic = document.getElementById("CNICDetail").value;
    var tel = document.getElementById("Phone").value;
    var address = document.getElementById("PresentAddress").value;
    var house = document.getElementById("DetailHouse").value;
    /*
   var cityfamily = document.getElementById("City").value;
   var totalincome = document.getElementById("Income").value;
   var medicine = document.getElementById("Med").value;
*/

    /*----------------------------------User Conditions statements --------------------------- - */

    if (user == "") {
        document.getElementById("username").innerHTML = "** Please fill the username field **";
        return false;
    }

    document.getElementById("username").innerHTML = "";

    if (!isNaN(user)) {
        document.getElementById("username").innerHTML = "** Only Characters are allowed **";
        return false;
    }

    document.getElementById("username").innerHTML = "";

    if ((user.length <= 2) || (user.length > 15)) {
        document.getElementById("username").innerHTML = "** user length must between 2 and 15 **";
        return false;
    }

    document.getElementById("username").innerHTML = "";

    /*----------------------------------Head of Family Conditions statements --------------------------- - */
    if (head == "") {
        document.getElementById("Head").innerHTML = "**Please fill the Haed name filed **";
        return false;
    }

    document.getElementById("Head").innerHTML = "";

    if (!isNaN(head)) {
        document.getElementById("Head").innerHTML = "* Only Characters are allowed *";
        return false;
    }

    document.getElementById("Head").innerHTML = "";

    if ((head.length <= 2) || (head.length > 15)) {
        document.getElementById("Head").innerHTML = " *User length must between 2 and 15**";
        return false;
    }

    document.getElementById("Head").innerHTML = "";

    /*----------------------------------Father/Husband Conditions statements--------------------------- - */


    if (father == "") {
        document.getElementById("Fathername").innerHTML = "** Please fill the father/Husband name **";
        return false;
    }

    document.getElementById("Fathername").innerHTML = "";

    if ((father.length <= 2) || (father.length > 15)) {
        document.getElementById("Fathername").innerHTML = "** user length must between 6 and 20 **";
        return false;
    }

    document.getElementById("Fathername").innerHTML = "";

    if (!isNaN(father)) {
        document.getElementById("Fathername").innerHTML = "** Only Characters are allowed **";
        return false;
    }

    document.getElementById("Fathername").innerHTML = "";

    /*---------------------------------- CNIC Conditions statements--------------------------- - */


    if (cnic == "") {
        document.getElementById("CNICname").innerHTML = "** Please Enter the CNIC number **";
        return false;
    }

    document.getElementById("CNICname").innerHTML = "";

    if ((cnic.length <= 2) || (cnic.length > 14)) {
        document.getElementById("CNICname").innerHTML = "** user length must between 13 and 14 **";
        return false;
    }

    document.getElementById("CNICname").innerHTML = "";

    if (isNaN(cnic)) {
        document.getElementById("CNICname").innerHTML = "** Only numbers are allowed **";
        return false;
    }

    document.getElementById("CNICname").innerHTML = "";

    /*---------------------------------- Phone Conditions statements--------------------------- - */

    if (tel == "") {
        document.getElementById("Phonename").innerHTML = "** Please Enter the Phone number **";
        return false;
    }

    document.getElementById("Phonename").innerHTML = "";

    if ((tel.length != 11)) {
        document.getElementById("Phonename").innerHTML = "** Mobile Number must be 11 digits **";
        return false;
    }

    document.getElementById("Phonename").innerHTML = "";

    if (isNaN(tel)) {
        document.getElementById("Phonename").innerHTML = "** Only numbers/digits are allowed **";
        return false;
    }

    document.getElementById("Phonename").innerHTML = "";

    /*---------------------------------- Address Conditions statements--------------------------- - */

    if (address == "") {
        document.getElementById("Presentname").innerHTML = "** Please fill the address **";
        return false;
    }

    document.getElementById("Presentname").innerHTML = "";

    if ((address.length <= 2) || (address.length > 15)) {
        document.getElementById("Presentname").innerHTML = "** user length must between 12 and 15 **";
        return false;
    }

    document.getElementById("Presentname").innerHTML = "";

    /*---------------------------------- House Conditions statements--------------------------- - */

    if (house == "") {
        document.getElementById("Detailname").innerHTML = "** Please fill the house rent  **";
        return false;
    }

    document.getElementById("Detailname").innerHTML = "";

    if ((house.length <= 2) || (house.length > 15)) {
        document.getElementById("Detailname").innerHTML = "** user length must between 12 and 15 **";
        return false;
    }

    document.getElementById("Detailname").innerHTML = "";

    //------------------------------------- Validating Files ------------------------------------------//

    if (formData.get('cnicMedia').size > 0) {
        let extension = formData.get('cnicMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    if (formData.get('bFormMedia').size > 0) {
        let extension = formData.get('bFormMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    if (formData.get('billMedia').size > 0) {
        let extension = formData.get('billMedia').name.split('.').pop().toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'pdf') {
            return alert("Only jpg, png and pdf files are allowed");
        }
    }

    document.getElementById("family-form-submit-btn").value = "Loading..."

    familyVerification(formData);
})

const familyVerification = async (formData) => {
    axios.post("/api/family-registration", formData, config)
        .then((response) => {
            console.log(response.data);
            document.getElementById("family-form-submit-btn").value = "Submit";

            if (response.data.success){
                document.getElementsByClassName("modal-text-success")[0].innerHTML = `Thank you for filling the form.<br>Your registration number is <span class="text-primary">${response.data.data.registrationNumber}</span>.`;

                document.getElementById("thanks-modal-toggle").click();
            }
        }).catch((error) => {
            console.log(error);
        })
}