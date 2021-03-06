//// GLOBAL VARIABLES ////
let addSite = true;
const updateSiteForm = document.querySelector('form#update-site-form')
const newSiteForm = document.querySelector('form#create-site-form')
const newItineraryForm = document.querySelector('form#new-itinerary-form')
const itinerariesCollection = document.querySelector('div#itineraries')
const updateItineraryForm = document.querySelector("form#update-itinerary-form")
const users = document.querySelector('.users')
const userSignupForm = document.querySelector('form#user-signup-form')
const userSignInForm = document.querySelector('form#user-sign-in-form')
const url = "http://localhost:3000"
const userInfo = document.querySelector('div#myTopnav')
const allSitesCollection = document.querySelector('div#sites')
const siteUpdateFormContainer = document.querySelector('body > div.update-site-forms')
const newSiteFormContainer = document.querySelector('body > div.new-site-form')

//// USERS ////
// hide all elements
const sitesDiv = document.querySelector('div#sites')
const buttonsDiv = document.querySelector('div#buttons')
const usersDiv = document.querySelector('.users')
sitesDiv.style.visibility = 'hidden';

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
      usersDiv.style.display = 'none',
      sitesDiv.style.visibility = 'visible')
})

// user sign-in form
userSignInForm.addEventListener('submit', event => {
  event.preventDefault()
  const userNameValue = event.target.name.value

  userSignupValues = {
    name: userNameValue
  }

  fetch(`${url}/users`)
    .then(response => response.json())
    .then(data => data.forEach(data => {
      if (data.name == userNameValue) {
        renderUser(data),
          usersDiv.style.display = 'none',
          sitesDiv.style.visibility = 'visible'
      }
    },

      fetch(`${url}/itineraries`)
        .then(response => response.json())
        .then(data => {
          data.forEach(data => {
            if (data.user_id == userInfo.dataset.id) {
              renderItinerary(data)
            }
          })
        })
    ))
})

// display user
function renderUser(userName) {
  userDiv = document.querySelector('div#myTopnav')
  div = document.createElement('div')
  displayUser = document.createElement('p')
  displayUser = userName.name
  div.id = "user-info"
  userDiv.dataset.id = userName.id
  div.innerHTML = `Welcome, ${displayUser}`
  displayUser.app
}

//// SITES ////
// fetch site date
fetch(`${url}/sites`)
  .then(response => response.json())
  .then(sites => {
    sites.forEach(data => {
      renderSite(data)
    })
  })

// hide/show site forms
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#myTopnav > a:nth-child(4)");
  const siteFormContainer = document.querySelector(".new-site-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addSite = !addSite;
    if (addSite) {
      siteFormContainer.style.display = "none";
    } else {
      siteFormContainer.style.display = "block";
    }
  });
});

// update Site Form
updateSiteForm.addEventListener('submit', event => {
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

  const cardID = (event.target.dataset.id)

  fetch(`${url}/sites/${cardID}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newSiteData)
  })
    .then(response => response.json())
    .then(data => {
      const selectedCard = document.querySelector(`div#individual-site-card[data-id='${cardID}']`)
      const name = selectedCard.querySelector('h2')
      const description = selectedCard.querySelector('h3')
      const location = selectedCard.querySelector('h4')
      const style = selectedCard.querySelector('h5')
      const photo = selectedCard.querySelector('img')
      name.textContent = data.name
      description.textContent = data.description
      location.textContent = data.location
      style.textContent = data.architectural_style
      photo.src = data.photo_url
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

// function to render sites
function renderSite(site) {
  siteDiv = document.querySelector('div#sites')
  div = document.createElement('div')
  listDiv = document.createElement('listDiv')
  siteHtml = `${site.name}`
  div.dataset.id = site.id
  div.id = "individual-site-card"
  div.classList.add('card')
  div.classList.add('banner')
  div.innerHTML = `
    <img src=${site.photo_url}/>
    <h2>${site.name}</h2>
    <h3>${site.description}</h3>
    <h4>${site.location}</h4>
    <h5>${site.architectural_style}</h5>
    `

  let select = document.createElement("SELECT");
  fetch(`${url}/itineraries`)
    .then(res => res.json())
    .then(itinerary => {
      itinerary.forEach(itinerary => {
        const option = document.createElement("option");
        option.text = itinerary.name
        option.id = itinerary.id
        select.add(option)
      })
    })

  select.id = 'itinerary-dropdown-options'
  select.dataset.id = div.dataset.id
  listDiv.append(select);

  const updateSiteButton = document.createElement('button')
  updateSiteButton.textContent = "Update Site"
  updateSiteButton.id = "update-site-button"
  updateSiteButton.dataset.id = site.id

  const addSiteToItineraryButton = document.createElement('button')
  addSiteToItineraryButton.textContent = "Add Site To Itinerary"
  addSiteToItineraryButton.id = "add-site-to-itinerary-button"
  addSiteToItineraryButton.dataset.id = site.id

  div.append(updateSiteButton)
  div.append(addSiteToItineraryButton)
  div.append(listDiv)
  siteDiv.append(div)
}

// update site
allSitesCollection.addEventListener
  ('click', event => {
    if (event.target.matches('button#update-site-button')) {
      const updateSiteForm = document.querySelector("form#update-site-form");
      updateSiteForm.dataset.id = event.target.dataset.id

      // using the dataset id, we fetch the info required to fill in the update itinerary form
      fetch(`${url}/sites/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(data => {
          updateSiteForm[0].value = data.name
          updateSiteForm[1].value = data.photo_url
          updateSiteForm[2].value = data.description
          updateSiteForm[3].value = data.location
          updateSiteForm[4].value = data.architectural_style
        })

      const newItineraryContainer = document.querySelector(".update-site-forms");

      // hide & seek with the form
      addSite = !addSite;
      if (addSite) {
        newItineraryContainer.style.display = "none";
      } else {
        newItineraryContainer.style.display = "block";
      }
    }

    // add site to itinerary from dropdown
    else if (event.target.matches('button#add-site-to-itinerary-button')) {
      const cardDropdown = document.querySelector(`#itinerary-dropdown-options[data-id='${event.target.dataset.id}']`)
      let resultID = cardDropdown.options[cardDropdown.selectedIndex].id;
      // let resultName = cardDropdown.options[cardDropdown.selectedIndex].value;

      newItinerarySite = {
        name: 'New Itinerary Site',
        site_id: event.target.dataset.id,
        itinerary_id: resultID
      }

      // remove current itineraries from web page to be replaced with updated
      //using the dataset id, we fetch the info required to fill in the update itinerary form
      fetch(`${url}/itinerary_sites`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newItinerarySite)
      })
    }

    const elementToRemove = document.querySelectorAll('#itinerary-card')
    console.log(elementToRemove)
    elementToRemove.forEach(function (node) {
      node.parentNode.removeChild(node);
      console.log('worked!')
    });

    setTimeout(() => {
      fetch(`${url}/itineraries`)
        .then(response => response.json())
        .then(data => {
          data.forEach(data => {
            if (data.user_id == userInfo.dataset.id) {
              renderItinerary(data)
            }
          })
        })
    }, 2000);
  })

// https://www.sitepoint.com/delay-sleep-pause-wait/
// (async () => {
//   const res = await fetch(`https://api.github.com/users/jameshibbard`);
//   const json = await res.json();
//   console.log(json.public_repos);
//   console.log("Hello!");
// })();

//// ITINERARIES ////
document.addEventListener("DOMContentLoaded", () => {
  const showItinerariesButton = document.querySelector("#myTopnav > a:nth-child(2)");
  const allItinerariesCollection = document.querySelector(".itineraries");
  const showNewItineraryFormButton = document.querySelector("#myTopnav > a:nth-child(3)");
  const newItineraryFormContainer = document.querySelector(".new-itinerary-form");
  const itineraryForms = document.querySelector(".update-itinerary-forms");

  allItinerariesCollection.style.display = "none";
  itineraryForms.style.display = "none";
  newItineraryFormContainer.style.display = "none";
  siteUpdateFormContainer.style.display = "none";
  newSiteFormContainer.style.display = "none";

  showItinerariesButton.addEventListener("click", () => {
    // hide & seek with the form
    addSite = !addSite;
    if (addSite) {
      allItinerariesCollection.style.display = "none";
    } else {
      allItinerariesCollection.style.display = "block";
    }
  });

  showNewItineraryFormButton.addEventListener("click", () => {
    // hide & seek with the form
    addSite = !addSite;
    if (addSite) {
      newItineraryFormContainer.style.display = "none";
    } else {
      newItineraryFormContainer.style.display = "block";
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

  const elementToRemove = document.querySelectorAll('#individual-site-card')
  console.log(elementToRemove)
  elementToRemove.forEach(function (node) {
    node.parentNode.removeChild(node);
  })

  setTimeout(() => {
    fetch(`${url}/sites`)
      .then(response => response.json())
      .then(data => {
        data.forEach(data => {
          renderSite(data)

        })
      })
  }, 2000);
})

// function to render itinerary
function renderItinerary(itinerary) {
  itineraryDiv = document.querySelector('div#itineraries')
  itinerarySites = (itinerary.itinerary_sites)

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
  div.innerHTML = `
  <h2>${itinerary.name}</h2>
  <h3>Description: ${itinerary.description}</h3>
  <h4> Date: ${itinerary.date} </h4>
`
  // function to show itinerary sites within the itinerary
  itinerarySites.forEach(function (itinerary_site) {
    const siteName = document.createElement('li')
    const deleteSiteButton = document.createElement('button')
    const siteImage = document.createElement('img')

    siteName.innerHTML = itinerary_site.site.name
    siteName.dataset.id = itinerary_site.id
    deleteSiteButton.textContent = "Delete"
    deleteSiteButton.id = "itinerary-site-delete-button"
    deleteSiteButton.dataset.id = itinerary_site.id
    siteImage.src = itinerary_site.site.photo_url

    div.append(siteName)
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

      // hide & seek with the form
      addSite = !addSite;
      if (addSite) {
        newItineraryContainer.style.display = "none";
      } else {
        newItineraryContainer.style.display = "block";
      }
    }

    // if delete button is clicked, delete card
    else if (event.target.matches('button#delete-itinerary-card-button')) {
      const div = event.target.closest('div#itinerary-card')
      div.remove()
      fetch(`${url}/itineraries/${event.target.dataset.id}`, {
        method: 'DELETE'
      })
    }
  })

// update current itinerary information
updateItineraryForm.addEventListener('submit', event => {
  event.preventDefault()

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
      const name = selectedCard.querySelector('h2')
      const description = selectedCard.querySelector('h3')
      const date = selectedCard.querySelector('h4')
      name.textContent = data.name
      description.textContent = data.description
      date.textContent = data.date
    })
})

var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
