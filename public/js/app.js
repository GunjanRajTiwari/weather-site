const weatherForm = document.querySelector('#search-form')
const search = document.querySelector('#search')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    const location = search.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                let result = 'The temperature of '+data.location+' is '+data.temp+' degrees. There is '+data.description+' now.'+'<h3>More Info:</h3>'+
                '<ul><li> Location: '+data.location+'</li><li> Weather: '+data.type+'</li><li> Temperature: '+data.temp+' C </li><li> Low: '+
                data.minTemp+' C </li><li> High: '+data.maxTemp+' C </li><li> Pressure: '+data.pressure+' Pa </li><li> Humidity: '+data.humidity+
                ' % </li><li> Clouds: '+data.clouds+' % </li><li> Dew Point: '+data.dew+' C </li></ul>'
                messageOne.innerHTML = result
            }
        })
    })
})