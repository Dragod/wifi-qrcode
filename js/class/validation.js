
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

            this.showError(this.ssid, `Network name (SSID) must be at least 3 character. but not more than 32 characters. It can only contain a-z, A-Z, 0-9, _ or -.`)

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

export default Validation
