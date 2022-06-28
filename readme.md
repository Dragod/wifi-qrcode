# Old code

```js
import qrcode from "wifi-qr-code-generator"

let wifiQR = async (ssid, password, encryption) => {

    await qrcode.generateWifiQRCode({
        ssid: ssid,
        password: password,
        encryption: encryption,
        hiddenSSID: false,
        outputFormat: { type: 'svg' }
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(`Error: ${err}`))

}

console.log(`\nGuest password 2.5G\n`);

await wifiQR('guest2.5G', 'ATWVpXCqJkA2sVHjcLrUy2UAdBuZMZ', 'WPA2-PSK')

console.log(`\nGuest password 5G\n`);

await wifiQR('guest5G', 'qskMpvH53EEhJ6YWzp4zmb5uuK6Taz', 'WPA2-PSK')
```