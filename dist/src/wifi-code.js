import qrGen from './qr-gen.js';
let slow = new qrGen('guest2-5G', 'ATWVpXCqJkA2sVHjcLrUy2UAdBuZMZ', 'WPA2-PSK');
let fast = new qrGen('guest5G', 'qskMpvH53EEhJ6YWzp4zmb5uuK6Taz', 'WPA2-PSK');
let slowWifi = await slow.wifi();
let fastWifi = await fast.wifi();
export { slowWifi, fastWifi };
