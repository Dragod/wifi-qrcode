import qrcode from "wifi-qr-code-generator"

class qrGen {

    ssid: string
    password: string
    encryption: any

    constructor(ssid:string, password:string, encryption:any){

        this.ssid = ssid,
        this.password = password,
        this.encryption = encryption

    }

    async wifi(){

        return await qrcode.generateWifiQRCode({

            ssid: this.ssid,
            password: this.password,
            encryption: this.encryption,
            hiddenSSID: false,
            outputFormat: { type: 'svg' }

        })
        .then((data) => {return data})
        .catch((err) => {console.log(`Error: ${err}`)})

    }

}

export default qrGen