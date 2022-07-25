import express from 'express'
import qrGen from '../js/class/qr-gen.js';
const router = express.Router()

let wifi= {}
let image = {}

router.get('/qr', (req, res, next) => {

    res.status(200).json({

        status: 'success',
        wifi: {
            qr:  wifi,
            png: image
        }

    })

})

router.post('/qr',async (req,res,next)=>{

    let response = {
        ssid : req.body.ssid,
        password : req.body.password,
        encryptionType: req.body.encryptionType
    }

    wifi = response

    let data =  `\nssid: ${response.ssid}\npass: ${response.password}\nEncryption type: ${response.encryptionType}\n`

    console.log(`\nQrcode\n${data}`)

    let newQr = new qrGen(response.ssid, response.password, response.encryptionType)

    let qr = await newQr.wifi()

    image = qr

    console.log(`${qr}\n`)

    let png = {qr: qr}

    res.status(201).send(png)

})

export default router;