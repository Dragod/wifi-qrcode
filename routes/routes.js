import express from 'express'
import qrGen from '../js/class/qr-gen.js';
const router = express.Router()
let qrResponse = {}
let wifiQrcode

router.get('/', (req, res, next) => {
    next()
})

router.get('/qr', (req, res, next) => {

    res.status(201).json({

        status: 'success',
        wifi: {
            ssid:  qrResponse.ssid,
            password:  qrResponse.password,
            encryptionType:  qrResponse.encryptionType,
            qrcode:  wifiQrcode
        }

    })

})

router.post('/qr',async (req,res,next)=>{

    let response = {
        ssid : req.body.ssid,
        password : req.body.password,
        encryptionType: req.body.encryptionType
    }

    qrResponse = response

    let data =  `\nssid: ${response.ssid}\npass: ${response.password}\nEncryption type: ${response.encryptionType}\n`

    console.log(`\nQrcode\n${data}`)

    let qr = new qrGen(response.ssid, response.password, response.encryptionType)

    let getQr = await qr.wifi()

    wifiQrcode = getQr;

    console.log(getQr);

    res.redirect('/')
})

router.delete('/qr',(req,res,next)=>{
    console.log("delete: req.body: " + JSON.stringify(req.body));
    res.status(204).json(req.body.ssid);
})

export default router;