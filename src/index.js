let addSite = true;
const updateSiteForm = document.querySelector('form#update-site-form')
const newSiteForm = document.querySelector('form#create-site-form')
const newItineraryForm = document.querySelector('form#new-itinerary-form')
const itinerariesCollection = document.querySelector('div#itineraries')
const updateItineraryForm = document.querySelector("form#update-itinerary-form")
const users = document.querySelector('div#users')
const userSignupForm = document.querySelector('form#user-signup-form')
const userSignInForm = document.querySelector('form#user-sign-in-form')
const url = "http://localhost:3000"
const userInfo = document.querySelector('div#menu-bar')



//// USERS ////


// hide all elements
const sitesDiv = document.querySelector('div#sites')
const buttonsDiv = document.querySelector('div#buttons')
const usersDiv = document.querySelector('div#users')

sitesDiv.style.visibility = 'hidden';
buttonsDiv.style.visibility = 'hidden';


// signup form event listener
userSignupForm.addEventListener('submit', event => {
  event.preventDefault()
  const userNameValue = event.target.name.value

  userSignupValues = {
    name: userNameValue
  }

  fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userSignupValues)
  })
    .then(response => response.json())
    .then(data => renderUser(data),
      usersDiv.style.visibility = 'hidden',
      sitesDiv.style.visibility = 'visible',
      buttonsDiv.style.visibility = 'visible')
})


// user sign-in form
userSignInForm.addEventListener('submit', event => {
  event.preventDefault()
  console.log('worked')
  const userNameValue = event.target.name.value

  userSignupValues = {
    name: userNameValue
  }

  fetch(`${url}/users`)
  .then(response => response.json())
  .then(data => data.forEach( data => {
    if (data.name == userNameValue) {
      renderUser(data),
      usersDiv.style.visibility = 'hidden',
      sitesDiv.style.visibility = 'visible',
      buttonsDiv.style.visibility = 'visible'
    }
  },


  fetch(`${url}/itineraries`)
  .then(response => response.json())
  .then(data => {
    data.forEach( data => {
      if (data.user_id == userInfo.dataset.id) {
       renderItinerary(data)
      }
    })
  })

  ))
})


// display user
function renderUser(userName) {
  userDiv = document.querySelector('div#menu-bar')
  div = document.createElement('div')

  displayUser = document.createElement('p')
  displayUser = userName.name
  div.id = "user-info"
  userDiv.dataset.id = userName.id

  div.innerHTML = `Welcome, ${displayUser}`

  userDiv.append(div)
}


//// SITES ////

// fetch site date
fetch(`${url}/sites`)
  .then(res => res.json())
  .then(sites => {
    sites.forEach(site => {
      renderSite(site)
    })
  })

// function to render sites
function renderSite(site) {
  siteDiv = document.querySelector('div#sites')
  div = document.createElement('div')
  siteHtml = `${site.name}`
  div.dataset.id = site.id
  div.id = "individual-site-card"
  div.classList.add('card')
  div.classList.add('banner')
  div.innerHTML = `
    <h2>${site.name}</h2>
    <h3>${site.description}<h3>
    <h4>${site.location}<h4>
    <img src=${site.photo_url} class="site.image" />`

    const updateSiteButton = document.createElement('button')
    updateSiteButton.textContent = "Update Site"
    updateSiteButton.id = "update-site-button"
    updateSiteButton.dataset.id = site.id

  div.append(updateSiteButton)
  siteDiv.append(div)

}

// hide/show site forms
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-site-btn");
  const siteFormContainer = document.querySelector(".site-forms");

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


// update Site Form
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

  const cardID = (event.target.dataset.id)
  console.log(cardID)

  fetch(`${url}/sites/1`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newSiteData)
  })

  .then(response => response.json())
  .then(data => {
      const selectedCard = document.querySelector(`div#individual-site-card='${cardID}']`)
      console.log(selectedCard)
      const header = selectedCard.querySelector('h2')
      const description = selectedCard.querySelector('h3')
      header.textContent = data.name
      description.textContent = data.description
    })
})

// create new site
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
    .then(response => response.json())
    .then(data => renderSite(data))
})



//// ITINERARIES ////


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#show-itinerary-btn");
  const newItineraryContainer = document.querySelector(".itineraries");


  const itineraryForms = document.querySelector(".update-itinerary-forms");

  newItineraryContainer.style.display = "none";
  itineraryForms.style.display = "none";

  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    

    addSite = !addSite;
    if (addSite) {
      newItineraryContainer.style.display = "none";
    } else {
      newItineraryContainer.style.display = "block";
    }
  });
});


// form to add new itinerary
newItineraryForm.addEventListener('submit', event => {
  event.preventDefault()

  itineraryName = event.target.name.value
  itineraryDescription = event.target.description.value
  itineraryDate = event.target.date.value
  itineraryUserID = userInfo.dataset.id

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
    .then(response => response.json())
    .then(data => renderItinerary(data))
})


// function to render itinerary
function renderItinerary(itinerary) {
  itineraryDiv = document.querySelector('div#itineraries')
  itinerarySites = (itinerary.sites)


  div = document.createElement('div')
  div.id = "itinerary-card"
  updateButton = document.createElement('button')
  updateButton.textContent = "Update Itinerary"
  updateButton.id = "update-itinerary-button"
  updateButton.dataset.id = itinerary.id

  const deleteCardButton = document.createElement('button')
  deleteCardButton.textContent = "Delete Itinerary"
  deleteCardButton.id = "delete-itinerary-card-button"
  deleteCardButton.dataset.id = itinerary.id

  div.dataset.id = itinerary.id
  div.classList.add('card')
  div.innerHTML = `<h2>${itinerary.name}</h2>
  <br>
  <h3>Description: ${itinerary.description}
  <br>
  <br>
  Date: ${itinerary.date}
  </h3>
`


  // function to show itinerary sites within the itinerary
  itinerarySites.forEach(function (element) {
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
  div.append(deleteCardButton)
}

// delete specific site
itinerariesCollection.addEventListener
  ('click', event => {
    if (event.target.matches('button#itinerary-site-delete-button')) {

      // target closest li and remove from div
      const li = event.target.closest('li')
      li.remove()

      fetch(`${url}/itinerary_sites/${event.target.dataset.id}`, {
        method: 'DELETE',
      })
      console.log('worked!')
    }

    // open update form
    else if (event.target.matches('button#update-itinerary-button')) {

      const updateItineraryForm = document.querySelector("form#update-itinerary-form");
      updateItineraryForm.dataset.id = event.target.dataset.id


      // using the dataset id, we fetch the info required to fill in the update itinerary form
      fetch(`${url}/itineraries/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(data => {
          updateItineraryForm[0].value = data.name
          updateItineraryForm[1].value = data.date
          updateItineraryForm[2].value = data.description
        })


      const newItineraryContainer = document.querySelector(".update-itinerary-forms");

      newItineraryContainer.style.display = "none";
      // hide & seek with the form
      addSite = !addSite;
      if (addSite) {
        newItineraryContainer.style.display = "block";
      } else {
        newItineraryContainer.style.display = "none";
      }
    }

    // if delete button is clicked, delete card
    else if (event.target.matches('button#delete-itinerary-card-button')) {
      const div = event.target.closest('div#itinerary-card')
      div.remove()
      console.log(event.target.dataset.id)
      fetch(`${url}/itineraries/${event.target.dataset.id}`, {
        method: 'DELETE'
      },
      )
    }
  })

// update current itinerary information
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

  const cardID = (event.target.dataset.id)

  fetch(`${url}/itineraries/${event.target.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newItineraryData)
  })



    .then(response => response.json())
    .then(data => {
      const selectedCard = document.querySelector(`div#itinerary-card[data-id='${cardID}']`)
      console.log(selectedCard)
      const header = selectedCard.querySelector('h2')
      const description = selectedCard.querySelector('h3')
      header.textContent = data.name
      description.textContent = data.description
    })



  // replace current card data with new updated card data
  fetch(`${url}/itineraries/${event.target.dataset.id}`)
    .then(response => response.json())
    .then(data => {
      // renderItinerary(data)
    })
})
