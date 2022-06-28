import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import qrcode from "wifi-qr-code-generator";
let qrResponse = {};
let wifiQrcode;
const router = express.Router();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class qrGen {
    ssid;
    password;
    encryption;
    constructor(ssid, password, encryption) {
        this.ssid = ssid,
            this.password = password,
            this.encryption = encryption;
    }
    async wifi() {
        return await qrcode.generateWifiQRCode({
            ssid: this.ssid,
            password: this.password,
            encryption: this.encryption,
            hiddenSSID: false,
            outputFormat: { type: 'image/png' }
        })
            .then((data) => { return data; })
            .catch((err) => { console.log(`Error: ${err}`); });
    }
}
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
router.get('/', (req, res, next) => {
    next();
});
router.get('/qr', (req, res, next) => {
    res.status(201).json({
        status: 'success',
        wifi: {
            ssid: qrResponse.ssid,
            password: qrResponse.password,
            encryptionType: qrResponse.encryptionType,
            qrcode: wifiQrcode
        }
    });
});
router.post('/qr', async (req, res, next) => {
    let response = {
        ssid: req.body.ssid,
        password: req.body.password,
        encryptionType: req.body.encryptionType
    };
    qrResponse = response;
    let data = `\nssid: ${response.ssid}\npass: ${response.password}\nEncryption type: ${response.encryptionType}\n`;
    console.log(`\nQrcode\n${data}`);
    let qr = new qrGen(response.ssid, response.password, response.encryptionType);
    let getQr = await qr.wifi();
    wifiQrcode = getQr;
    console.log(getQr);
    res.redirect('/');
});
router.delete('/qr', (req, res, next) => {
    console.log("delete: req.body: " + JSON.stringify(req.body));
    res.status(204).json(req.body.ssid);
});
app.use('/', router);
process.on('uncaughtException', err => {
    console.log(`Uncaught Exception. 💥 Shutting down the server...`);
    console.log(err.name, err.message);
    process.exit(1);
});
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Rejection. 💥 Shutting down the server...`);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
