let addSite = true;
const updateSiteForm = document.querySelector('form#update-site-form')
const newSiteForm = document.querySelector('form#create-site-form')
const newItineraryForm = document.querySelector('form#itineraries')
const itinerariesCollection = document.querySelector('div#itineraries')


const url = "http://localhost:3000"



fetch(`${url}/sites`).then(res => res.json()).then(sites => {
    sites.forEach(site => {
        renderSite(site)
    })
})

function renderSite(site) {
    siteDiv = document.querySelector('div#sites')
    div = document.createElement('div')
    siteHtml = `${site.name}`
    div.dataset.id= site.id
    div.classList.add('card')
    div.innerHTML = `
    <h2>${site.name}</h2>
    <h3>${site.description}<h3>
    <h4>${site.location}<h4>
    <img src=${site.photo_url} class="site.image" />`
   
    
    siteDiv.append(div)
   
}



document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-site-btn");
     const siteFormContainer = document.querySelector(".forms");

     siteFormContainer.style.display = "none"
     
     addBtn.addEventListener("click", () => {
       // hide & seek with the form
       addSite = !addSite;
       if (addSite) {
         siteFormContainer.style.display = "block";
       } else {
         siteFormContainer.style.display = "none";
       }
     });
   });



  updateSiteForm.addEventListener('submit', event => {  
  event.preventDefault()

  //gives internal server error but still works?

  newName = event.target.name.value
  newImage = event.target.photoUrl.value
  newDescription = event.target.description.value
  newLocation = event.target.location.value
  newStyle = event.target.style.value

  newSiteData = {
    name: newName,
    photo_url: newImage,
    description: newDescription,
    location: newLocation,
    architectural_style: newStyle
  }

  fetch(`${url}/sites/1`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newSiteData)
  })
})


newSiteForm.addEventListener('submit', event => {  

  event.preventDefault()

  newName = event.target.name.value
  newImage = event.target.photoUrl.value
  newDescription = event.target.description.value
  newLocation = event.target.location.value
  newStyle = event.target.style.value

  newSiteData = {
    name: newName,
    photo_url: newImage,
    description: newDescription,
    location: newLocation,
    architectural_style: newStyle
  }

  fetch(`${url}/sites`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newSiteData)
  })
})









//// ITINERARIES ////

// fetch all itineraries data
fetch(`${url}/itineraries`)
.then(response => response.json())
.then(data => {
  data.forEach(data => {
    renderItinerary(data)
  })
})

// show hide itineraries forms upon click
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-itinerary-btn");
   const newItineraryContainer = document.querySelector(".itineraries");

   newItineraryContainer.style.display = "none";

   addBtn.addEventListener("click", () => {
     // hide & seek with the form
     addSite = !addSite;
     if (addSite) {
       newItineraryContainer.style.display = "block";
     } else {
      newItineraryContainer.style.display = "none";
     }
   });
 });

// form to add new itinerary
newItineraryForm.addEventListener('submit', event => {  
  event.preventDefault()

  itineraryName = event.target.name.value
  itineraryDescription = event.target.description.value
  itineraryDate = event.target.date.value
  itineraryUserID = 1

  newSiteData = {
    name: itineraryName,
    description: itineraryDescription,
    date: itineraryDate,
    user_id: itineraryUserID
  }

  fetch(`${url}/itineraries`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newSiteData)
  })
})


// function to render itinerary
function renderItinerary(itinerary) {
  itineraryDiv = document.querySelector('div#itineraries')
  itinerarySites = (itinerary.sites)


  div = document.createElement('div')
  updateButton = document.createElement('button')
  updateButton.textContent = "Update Itinerary"
  updateButton.id = "update-itinerary-button"
  div.dataset.id= itinerary.id
  div.classList.add('card')
  div.innerHTML = `<h2>${itinerary.name}</h2>
  <h3>${itinerary.description} <br>
  ${itinerary.date}</h3>
  <li><br>${itinerarySites.forEach(function(element) {return element.name} )}</br></li> 
`
  

// function to show itinerary sites within the itinerary
itinerarySites.forEach(function(element) {
  const siteName = document.createElement('li')
  const deleteSiteButton = document.createElement('button')
  const siteImage = document.createElement('img')

  siteName.innerHTML = element.name
  siteName.dataset.id = element.id

  deleteSiteButton.textContent = "Delete"
  deleteSiteButton.id = "itinerary-site-delete-button"
  deleteSiteButton.dataset.id = element.id

  siteImage.src = element.photo_url

  div.append(siteName)
  // div.append(siteImage)
  siteName.append(deleteSiteButton)

})
  itineraryDiv.append(div)
  div.append(updateButton)
}

// delete specific site
itinerariesCollection.addEventListener
('click', event => {
  if (event.target.matches('button#itinerary-site-delete-button')) {

    fetch(`${url}/itinerary_sites/${event.target.dataset.id}`,{
      method: 'DELETE',
  })
  
  renderItinerary(data)
  console.log(event.target.dataset.id)
  
  }

// open update form
else if (event.target.matches('button#update-itinerary-button')) {
console.log('clicked')
  

}
})



