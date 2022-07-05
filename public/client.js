class Validation {

    constructor(ssid, password) {

        this.ssid = ssid

        this.password = password

    }

    isRequired = value => value === '' ? false : true

    isBetween = (length, min, max) => length < min || length > max ? false : true

    isValidSsid = () => {

        return /^[a-zA-Z0-9()_-]{1,32}$/g.test(this.ssid.value)

    }

    showError = (input, message) => {

        const formField = input.parentElement

        formField.classList.remove('success')

        formField.classList.add('error')

        const error = formField.querySelector('small')

        error.textContent = message

    }

    showSuccess = (input) => {

        const formField = input.parentElement

        formField.classList.remove('error')

        formField.classList.add('success')

        const error = formField.querySelector('small')

        error.textContent = ''

    }

    checkSsid = () => {

        let valid = false

        const min = 3

        const max = 32

        const wifiName = this.ssid.value.trim()

        if (!this.isRequired(wifiName)) {

            this.showError(this.ssid, 'Network name (SSID) cannot be blank.')

        } else if (!this.isBetween(wifiName.length, min, max)) {

            this.showError(this.ssid, `Network name (SSID) must be between ${min} and ${max} characters.`)

        }
        else if(!this.isValidSsid(wifiName)){

            this.showError(this.ssid, `Network name (SSID) must be at least 3 character but not more than 32 also no spaces allowed. It can only contain a-z, A-Z, 0-9, _ or -.`)

        }
        else {

            this.showSuccess(this.ssid)

            valid = true

        }

        return valid
    }

    checkPassword = () => {

        let valid = false

        const min = 6

        const max = 63

        const pass = this.password.value.trim()

        if (!this.isRequired(pass)) {

            this.showError(this.password, 'Password cannot be blank.')

        } else if (!this.isBetween(pass.length, min, max)) {

            this.showError(this.password, `Password must be between ${min} and ${max} characters.`)

        } else {

            this.showSuccess(this.password)

            valid = true

        }

        return valid

    }
}

 // Handler when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {

    // Get the form elements

    const url = 'http://localhost:8000/qr'
    const ssid = document.getElementById('ssid')
    const password = document.getElementById('password')
    const form = document.getElementById('qr-form')
    const generated = document.getElementById('generated')
    const downloadIcon = `    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" class="pointer-hand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" id="downloadQr">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`

    let post = async (url, ssid, password, encryption) =>{

        // post body data

        const qr ={
            ssid : ssid.value,
            password : password.value,
            encryptionType: encryption
        }

        // request options

        const options = {
            method: 'POST',
            body: JSON.stringify(qr),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // send POST request

        const response = await fetch(url, options)

        const data = await response.json()

        console.log(data);

    }

    // Submit and validate form

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        const validation = new Validation(ssid, password)

        let isNameValid = validation.checkSsid()

        let isPasswordValid = validation.checkPassword()

        let isFormValid = isNameValid && isPasswordValid

        if (isFormValid) {

            console.log('Form is valid. Posting to server...')

            let encryption = document.querySelector( 'input[name="encryptionType"]:checked').value

            // Post first then retrive the QR code with a GET request

            post(url, ssid, password, encryption).then(() => {

                fetchQRcode()

            })

        }
        else {

            console.log('Form is invalid. Will not "POST".')

        }

    })

    let fetchQRcode = async () => {

        try {

            const response = await fetch(url, { method: 'GET' })

            const data = await response.json()

            let qrData = await data

            console.log(qrData);

            let png = qrData.wifi.png
            let ssid = qrData.wifi.qr.ssid

            generatedHTML(png,ssid, downloadIcon)

            return await data

        }
        catch (error)
        {
            return console.error(error)
        }

    }

    let generatedHTML = (png, ssid, downloadIcon ) => {

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
            <div class="js-generated flex flex-1 ma-l-1 pos-r">
                <div class="qr-image flex self-center flex-1 flex-column">
                <div class="flex flex-row">
                    <p class="ma-t-0 flex flex-1 wifi-name">Wifi: ${ssid}</p>
                    <a href="${png}" download="Wifi-${ssid}.png" title="Download QR code for Wifi: ${ssid}" id="download-qr" class="download-qr">
                    ${downloadIcon}
                    </a>
                </div>
                    <img src='${png}' alt='Ssid:${ssid}' title='Ssid:${ssid}' class='qr-image-print'>
                </div>
            </div>
            `

        }

    }

})
