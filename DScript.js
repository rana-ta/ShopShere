
function Theme() {
    var body = document.body;
    var header = document.querySelector('header');
    var links = document.querySelectorAll('a');

	body.classList.toggle('darkMode');
    header.classList.toggle('darkMode');
	
	links.forEach( i => i.classList.toggle('darkMode'));
	var theme = body.classList.contains('darkMode')? 'dark':'light';
	//localStorage.setItem('theme',theme);
}

//var sTheme = localStorage.getItem('theme');

//if(sTheme === 'dark') {
	//document.body.classList.add('darkMode')
	//document.querySelector('header').classList.add('darkMode')
	//document.querySelectorAll('a').forEach( i => i.classList.add('darkMode'));
//}

function date() {
	var today = new Date();
	var sundayDate = new Date(today);
	
	sundayDate.setDate(today.getDate() - today.getDay());
	
	var date = sundayDate.toLocaleDateString('en-US');
	
	document.getElementById('weekDate').textContent = date;
}

document.addEventListener("DOMContentLoaded", date);

var arrow = document.getElementById('arrow');
var offerDiv = document.querySelectorAll('#offer div');
var current = 0;
var allOffers = false;

function homeOffers() {	
	offerDiv.forEach((offer, index) => {
		offer.classList.toggle('active', allOffers || (index >= current && index < current + 3));
	}); 
	
	arrow.classList.toggle('arrowUp', allOffers);
	arrow.classList.toggle('arrowDown', !allOffers);
}

function showAll() {
	allOffers = !allOffers;
    homeOffers();
}

homeOffers(); 

function deleteOffer() {
	var offers = [];
	var selectedOffers = [];
    var offerContainer = document.getElementById("sellerOffer");
    var offerDiv = offerContainer.getElementsByClassName("offerCheck");

	for (var i = 0; i < offerDiv.length; i++) 
        offers.push(offerDiv[i]);
		
	for (var i = 0; i < offers.length; i++) {
        var checkbox = offers[i].querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) {
            selectedOffers.push(offers[i]);
        }
    }
	
    if (selectedOffers.length === 0) {
        alert("Please select at least one offer.");
        return;
    }

    if (confirm("Are you sure you want to delete the selected offers?")) {
        selectedOffers.forEach(function(offerDiv) {
            offerDiv.remove();
        });
		
		for (var i = selectedOffers.length - 1; i >= 0; i--) 
            for (var j = 0; j < offers.length; j++) 
                if (offers[j] === selectedOffers[i]) { 
                    offers.splice(j, 1);
					break;
				}
    }
}


function isValid() {
    var name = document.getElementById('name').value;
    var img = document.getElementById('image');
    var desc = document.getElementById('Description').value;
    var isValid = true;
	
	document.getElementById('nameNotValid').textContent = '';
    document.getElementById('imgNotValid').textContent = '';
    document.getElementById('descNotValid').textContent = '';
	
	if (name === "" || name === " ") {
        document.getElementById('nameNotValid').textContent = "Please enter a valid offer name.";
        isValid = false;
    }
	
    if (img.files.length === 0) {
        document.getElementById('imgNotValid').textContent = "Please upload a valid image.";
        isValid = false;
    } else {
        var fileType = img.files[0].type;
        if (!fileType.startsWith('image/')) {
            document.getElementById('imgNotValid').textContent = "Please upload an image file.";
            isValid = false;
        }
    }

    if (desc === "" || desc === " ") {
        document.getElementById('descNotValid').textContent = "Please enter a valid description.";
		isValid = false;
    }
	
	if(name === "" || img.files.length === 0 || desc === "") 
		alert("Please fill in all required fields.");
	
	return isValid;

}

var count = 0;

function addOffer() {
	
	if(!isValid())
		return;
	
	count++;
	var newValue = "newOffer" + count;

	var name = document.getElementById("name").value;
    var img = document.getElementById("image").files[0];
    var desc = document.getElementById("Description").value;
    
    var newOffer = document.createElement("div");
    newOffer.classList.add("offerCheck");
	
    var offerCont = document.createElement("div");
    
    var imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(img);
    imgElement.alt = name;
    
    var titleElement = document.createElement("h2");
    titleElement.textContent = name;
    
    var pElement = document.createElement("p");
    pElement.textContent = desc;
	
	var brElement = document.createElement("br");
	
    offerCont.appendChild(imgElement);
    offerCont.appendChild(titleElement);
	offerCont.appendChild(brElement);
    offerCont.appendChild(pElement);
	
    var offerCheckbox = document.createElement("input");
    offerCheckbox.type = "checkbox";
    offerCheckbox.name = "offer";
    offerCheckbox.value = newValue;
    
    newOffer.appendChild(offerCont);
    newOffer.appendChild(offerCheckbox);
		
    document.getElementById("sellerOffer").appendChild(newOffer);
		
	document.getElementById("name").value = "";
	document.getElementById("image").value = "";
	document.getElementById("Description").value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    var sidebar = document.querySelector('.sidebar');
    var reviews = document.querySelectorAll('.sidebar > div');

    var defH = '35rem'; 
    var expH = '50rem'; 

    sidebar.style.height = defH;

    reviews.forEach(i => {
        var text = i.querySelector('.text');
        var productName = i.querySelector('.product p');
        
        text.style.display = 'none';
        productName.style.display = 'none';

        i.onmouseenter = function () {
            text.style.display = 'block';
            productName.style.display = 'block';
            sidebar.style.height = expH;
        };

        i.onmouseleave = function () {
            text.style.display = 'none';
            productName.style.display = 'none';
            sidebar.style.height = defH;
        };
    });
});
