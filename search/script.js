const userCardTemplate = document.querySelector("[data-user-template]")         //taking card template
const userCardContainer = document.querySelector("[data-user-cards-container]") //taking card container div
const searchInput = document.querySelector("[data-search]")                     //taking search input

let users = []

searchInput.addEventListener("input", e => {                                    //search function
    const value = e.target.value.toLowerCase()                                  //all input make lowercase
    users.forEach(user => {                                                   
        const isVisible =                                                     
            user.name.toLowerCase().includes(value) ||                          //searching by name
            user.email.toLowerCase().includes(value)                            //searching by email
        user.element.classList.toggle("hide", !isVisible)                       //make users not visible when sorting
    })
})

//placeholder users
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]   //clone card template
            const header = card.querySelector("[data-header]")                  //match js header with html header
            const body = card.querySelector("[data-body]")                      //match js body with html body
            header.textContent = user.name                                      //match header with placeholder name
            body.textContent = user.email                                       //match body with placeholder email
            userCardContainer.append(card)                                      //add info to card
            return { name: user.name, email: user.email, element: card }        //return card with added info
        })
    })