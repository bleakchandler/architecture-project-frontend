let addSite = true;
const updateSiteForm = document.querySelector('form#update-site-form')
const newSiteForm = document.querySelector('form#create-site-form')
const newItineraryForm = document.querySelector('form#new-itinerary-form')
const itinerariesCollection = document.querySelector('div#itineraries')
const updateItineraryForm = document.querySelector("form#update-itinerary-form")

const url = "http://localhost:3000"
// fetch(`${url}/users`).then(res => res.json()).then(users => {
//     users.forEach(user => {
//         renderUser(user)
//     })
// })

// function renderUser(user) {
//     userDiv = document.querySelector('#users')
//     userHtml = `${user.name}`
//     userDiv.append(userHtml)
// }

fetch(`${url}/sites`)
  .then(res => res.json())
  .then(sites => {
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
    div.classList.add('banner')
    div.innerHTML = `
    <h2>${site.name}</h2>
    <h3>${site.description}<h3>
    <h4>${site.location}<h4>
    <img src=${site.photo_url} class="site.image" />`
   
    
    siteDiv.append(div)
   
}



document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-site-btn");
     const siteFormContainer = document.querySelector(".container");

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



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-itinerary-btn");
   const newItineraryContainer = document.querySelector(".new-itinerary");

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


fetch(`${url}/itineraries`)
.then(response => response.json())
.then(data => {
  data.forEach(itinerary => {
    renderItinerary(itinerary)
  })
})


function renderItinerary(itinerary) {
  siteDiv = document.querySelector('div#itineraries')
  itinerarySites = (itinerary.sites)

  // itinerarySites.forEach(function(element) { 
  //   div1 = document.createElement('div')
  //   div1.innerHTML = `<h4>${element.name}</h4>`
  //   siteDiv.append(div1)
  // })

  div = document.createElement('div')
  div.dataset.id= itinerary.id
  div.classList.add('card')
  div.innerHTML = `<h2>${itinerary.name}</h2>
  <h3>${itinerary.description}</h3>
  <h4>${itinerary.date}</h4>
 
  <li><br>${itinerarySites.map(function(element) {return element.name} )}</br></li>
  <button class="delete-btn" data-id="${itinerary.id}">Delete</button>`

  siteDiv.append(div)
}

const deleteButton = document.createElement('button')
deleteButton.textContent = "Delete Button"


itinerariesCollection.addEventListener
('click', event => {
  
  if (event.target.matches('button.delete-btn')) {
    fetch(`${url}/itineraries/${event.target.getAttribute("data-id")}`, {
    method: 'DELETE'
    },
    console.log('worked')
  )}
})



// deleteItineraryButton.addEventListener
// ('click', event => {
//   const divID = event.target('div').dataset.id
//   fetch(`${url}/${divID}`, {
//   method: 'DELETE'
//   })
//   div.querySelector(`card[data-id='${divID}']`).remove()
//   console.log('deleted!')
// })



updateItineraryForm.addEventListener('submit', event => {  
  event.preventDefault()

  //gives internal server error but still works?

  updateName = event.target.name.value
  updateDescription = event.target.description.value
  updateDate = event.target.date.value

  newItineraryData = {
    name: updateName,
    description: updateDescription,
    date: updateDate
    
  }

  fetch(`${url}/itineraries/1`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newItineraryData)
  })
})
