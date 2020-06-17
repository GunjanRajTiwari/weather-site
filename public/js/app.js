
console.log('Client side JS')

const weatherForm = document.querySelector('#search-form')
const search = document.querySelector('#search')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    const location = search.value

    fetch('http://localhost:8000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                let result = 'The temperature of '+data.location+' is '+data.temp+' degrees.'
                messageOne.textContent = result
            }
        })
    })
})