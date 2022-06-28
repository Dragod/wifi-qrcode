document.addEventListener("DOMContentLoaded", function(){

    // Handler when the DOM is fully loaded

    // get form elements
    let ssid = document.getElementById('ssid')
    let password = document.getElementById('password')
    let ssidMaxLength = 32
    let passwordMaxLength = 63
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
    alphanumeric = (input) => {

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

    const validationErr = document.querySelector('.validationErr')

    let validate = (msg, el1, el2, e, errorClass = 'error') => {

        e.preventDefault()

        validationErr.classList.add('valError')
        validationErr.innerHTML = `<span>${msg}</span>`

        el1 !== null ? el1.classList.add(errorClass) : ''

        el2 !== null ? el2.classList.add(errorClass) : ''

        return false
    }

    formValidator = (ssid, password, e) => {

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

            //fetchQR()
        }
    }

    // fetch from localhost:8000/qr
    // let fetchQR = () => {

    //     let url = 'http://localhost:8000/qr'

    //     fetch(url, { method: 'GET' })
    //     .then(response => response.json())
    //     .then(data => {

    //         console.log(data)

    //         localStorage.setItem('qrcode', JSON.stringify(data))

    //         let  retrievedObject = localStorage.getItem('qrcode')

    //         console.log('retrievedObject: ', JSON.parse(retrievedObject))

    //     })
    //     .catch(error => console.error(error))

    // }

    // add event listener to form button
    document.getElementById('qr-form').addEventListener('submit', function(e){

        // Delete local storage qrcode
        if (localStorage.getItem('qrcode') != null){

            localStorage.removeItem('qrcode')
        }

        // Remove previous error messages
        ssid.classList.remove('error')
        password.classList.remove('error')

        formValidator(ssid, password, e)

    })

    let fetchQRcode = async () => {

        let url = 'http://localhost:8000/qr'

        try {

            const response = await fetch(url, { method: 'GET' })

            const data = await response.json()

            localStorage.setItem('qrcode', JSON.stringify(data))

            let  retrievedObject = localStorage.getItem('qrcode')

            console.log('retrievedObject: ', JSON.parse(retrievedObject))

            return await data

        }
        catch (error)
        {
            return console.error(error)
        }

    }

    const generated = document.getElementById('generated')

    let generatedHtml = () => {

        let  retrievedObject = localStorage.getItem('qrcode')

        console.log('localstorage: ', JSON.parse(retrievedObject))

        let localStorageQR = JSON.parse(retrievedObject)

        let ssid = localStorageQR.wifi.ssid
        let password = localStorageQR.wifi.password
        let encryption = localStorageQQR.wifi.encryption
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


    fetchQRcode().then(data => {

        // generated.innerHTML  =
        // `
        // <div class="js-generated flex flex-column flex-1 ma-l-1">
        //     <div class="qr-settings flex flex-1 flex-column">
        //         <p class="qr-ssid">Wifi name: ${ssid}</p>
        //         <p class="qr-pass">Password: ${password}</p>
        //         <p class="qr-encryption">Encryption: ${encryption}</p>
        //     </div>
        //     <div class="qr-image flex self-center flex-column">
        //         <p class="ma-t-0">Wifi ssid: ${ssid}</p>
        //         <img src='${png}' alt='Ssid:${ssid}-Password:${password}-Encryption:${encryption}' title='Ssid:${ssid}-Password:${password}-Encryption:${encryption}'>
        //     </div>
        // </div>
        // `

        if(data.wifi.qrcode === undefined || data.wifi.qrCode === null){

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

            let png = data.wifi.qrcode
            let ssid = data.wifi.ssid
            let password = data.wifi.password
            let encryption = data.wifi.encryptionType

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

    })
    .catch(error => console.error(error))


    let deleteQr = async () => {

        let url = 'http://localhost:8000/qr'

        const res = await fetch(url, { method: 'DELETE', })
        const res_1 = await res.text()
        return console.log(res_1)

    }

    let delQr = document.getElementById('deleteQr')

    delQr.addEventListener('click', deleteQr)

})
