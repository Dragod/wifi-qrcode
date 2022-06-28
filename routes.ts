
// Importing express module
import express from 'express'

const router = express.Router()

// Handling request using router
router.get('/', (req, res) => {})

router.post('/qr',async (req,res,next)=>{

    let response = {
        ssid : req.body.ssid,
        password : req.body.password,
        encryptionType: req.body.encryptionType
    }

    let data =  `ssid: ${response.ssid}\npass: ${response.password}\nEncryption type: ${response.encryptionType}`

    console.log(data)

    let qr = new qrGen(response.ssid, response.password, response.encryptionType)

    let getQr = await qr.wifi()

    console.log(getQr);

    res.status(201).json({
        status: 'success',
        data:{
            qrcode: getQr
        }

    })

})

// Importing the router
export default router