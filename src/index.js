let addSite = false;


const url = "http://localhost:3000"
fetch(`${url}/users`).then(res => res.json()).then(users => {
    users.forEach(user => {
        renderUser(user)
    })
})

function renderUser(user) {
    userDiv = document.querySelector('#users')
    userHtml = `${user.name}`
    userDiv.append(userHtml)
}

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
    <img src=${site.photo_url} class="site.image" />`
   
    
    siteDiv.append(div)
   
}

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-site-btn");
     const siteFormContainer = document.querySelector(".container");
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