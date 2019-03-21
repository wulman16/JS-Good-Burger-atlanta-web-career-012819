document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('custom-burger')
  form.addEventListener('submit', handleBurgerForm)
  renderAllBurgers()
})

function renderAllBurgers() {
  fetch('http://localhost:3000/burgers')
  .then(res => res.json())
  .then(data => data.map(burger => renderBurger(burger.name, burger.image, burger.description)))
}

function renderBurger(name, image, description) {
  const menu = document.getElementById('burger-menu')

  const burger = document.createElement('div')
  burger.className = 'burger'
  menu.appendChild(burger)

  const burgerName = document.createElement('h3')
  burgerName.className = 'burger_title'
  burgerName.textContent = name
  burger.appendChild(burgerName)

  const burgerImage = document.createElement('img')
  burgerImage.src = image
  burger.appendChild(burgerImage)

  const burgerDesc = document.createElement('p')
  burgerDesc.textContent = description
  burger.appendChild(burgerDesc)

  const addButton = document.createElement('button')
  addButton.className = 'button'
  addButton.textContent = 'Add to Order'
  addButton.id = name
  addButton.addEventListener('click', addToOrder)
  burger.appendChild(addButton)
}

function addToOrder(e) {
  const orders = document.getElementById('order-list')
  const newOrder = document.createElement('li')
  newOrder.textContent = e.target.id
  orders.appendChild(newOrder)
}

function handleBurgerForm(e) {
  e.preventDefault()

  const burgerName = e.target.elements["name"].value
  const burgerDescription = e.target.elements["description"].value
  const burgerImage = e.target.elements["url"].value

  const newBurger = {name: burgerName,
                    description: burgerDescription,
                    image: burgerImage}

  fetch('http://localhost:3000/burgers', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(newBurger)
  })
  .then(resp => resp.json())
  .then(data => {renderBurger(data.name, data.image, data.description)})
  
  const orders = document.getElementById('order-list')
  const newOrder = document.createElement('li')
  newOrder.textContent = burgerName
  orders.appendChild(newOrder)
}