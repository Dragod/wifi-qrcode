document.addEventListener("DOMContentLoaded", function(){

    // Handler when the DOM is fully loaded

    // get form elements
    const generated = document.getElementById('generated')
    const validationErr = document.querySelector('.validationErr')
    const ssid = document.getElementById('ssid')
    const password = document.getElementById('password')
    const ssidMaxLength = 32
    const passwordMaxLength = 63
    errorMessage = {
        one: `Please type a valid name and password`,
        two: `Please type a name`,
        three: `Please type a password`,
        four: `Name must be less than 32 characters and alphanumeric`,
        five: `Name must be less or equal 32 characters`,
        siX: `Name must be alphanumeric`,
        seven: `Password should be less or equal 63 characters`
    }

    // Alphanumeric string with spaces and "_  -"
    let alphanumeric = (input) => {

        let letterNumber = /^[a-z0-9]+([-_\s]{1}[a-z0-9]+)*$/i

        if(input.value.match(letterNumber))
        {
            return true;
        }
        else
        {
            return false
        }
    }

    let validate = (msg, el1, el2, e, errorClass = 'error') => {

        e.preventDefault()

        validationErr.classList.add('valError')
        validationErr.innerHTML = `<span>${msg}</span>`

        el1 !== null ? el1.classList.add(errorClass) : ''

        el2 !== null ? el2.classList.add(errorClass) : ''

        return false
    }

    let formValidator = (ssid, password, e) => {

        if ((ssid.value === '' && password.value === '')) {

            validate(errorMessage.one, ssid, password, e, 'error')

        }
        else if ((ssid.value === '')) {

            validate(errorMessage.two, ssid, password = null, e)

        }
        else if ((password.value === '')) {

            validate(errorMessage.three, ssid= null, password, e)

        }
        else if(ssid.value.length > ssidMaxLength && !alphanumeric(ssid)) {

            validate(errorMessage.four, ssid, password = null, e)

        }
        else if(ssid.value.length > ssidMaxLength) {

            validate(errorMessage.five, ssid, password = null, e)

        }
        else if(ssid.value.length >0 && !alphanumeric(ssid)) {

            validate(errorMessage.six, ssid, password = null, e)

        }

        else if(password.value.length > passwordMaxLength){

            validate(errorMessage.seven, ssid= null, password, e)

        }
        else
        {

            //remove error class

            ssid.classList.remove('error')
            password.classList.remove('error')

        }
    }

    let fetchQRcode = async () => {

        let url = 'http://localhost:8000/qr'

        try {

            const response = await fetch(url, { method: 'GET' })

            const data = await response.json()

            sessionStorage.setItem('qrcode', JSON.stringify(data))

            return await data

        }
        catch (error)
        {
            return console.error(error)
        }

    }

    let generatedHtml = async() => {

        let  retrievedObject = sessionStorage.getItem('qrcode')

        console.log('localstorage: ', JSON.parse(retrievedObject))

        let localStorageQR = JSON.parse(retrievedObject)

        let ssid = localStorageQR.wifi.ssid
        let password = localStorageQR.wifi.password
        let encryption = localStorageQR.wifi.encryption
        let png = localStorageQR.wifi.qrcode

        if(png === undefined || png === null){

            generated.innerHTML =
            `
            <div class="js-generated flex flex-1 ma-l-1">
                <div class="qr-image flex self-center flex-1 flex-column">
                    <p>No wifi settings found</p>
                </div>
            </div>
            `

            generated.classList.add('visibility-hidden')

        }
        else
        {
            generated.classList.remove('visibility-hidden')

            generated.innerHTML  =
            `
            <div class="js-generated flex flex-1 ma-l-1">
                <div class="qr-image flex self-center flex-1 flex-column">
                    <p class="ma-t-0">Wifi ssid: ${ssid}</p>
                    <img src='${png}' alt='Ssid:${ssid}-Password:${password}-Encryption:${encryption}' title='Ssid:${ssid}-Password:${password}-Encryption:${encryption}'>
                </div>
            </div>
            `
        }

    }

    fetchQRcode()
        .then(generatedHtml)
        .catch(error => console.error(error))

    deleteSessionStorage = () => {

        if (sessionStorage.getItem('qrcode') != null){

            sessionStorage.clear()

            generated.classList.add('visibility-hidden')
        }

    }

    let deleteQRcode = document.getElementById('deleteQr')

    deleteQRcode.addEventListener('click', deleteSessionStorage)

    // add event listener to form button
    document.getElementById('qr-form').addEventListener('submit', function(e){

        // Remove previous error messages
        ssid.classList.remove('error')
        password.classList.remove('error')

        formValidator(ssid, password, e)

    })

})
