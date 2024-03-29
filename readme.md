# Credits

I have used this great article to get inspiration for the client side validation: [javascripttutorial.net](https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/)

# Wifi QR code

Generate a wifi qr code png image base64.

The qr code is optimized for printing, also there is an option to download the png image if you need.

This Web app is running nodejs with Express, NO database required.

![alt text](/public/img/app.png)

After scanning the QR code on your mobile device, just press "Connect".

![alt text](/public/img/mobile.png)

Print the QR code so you can share with family and guests.

![alt text](/public/img/print.png)

## Run the nodejs/express 4 server

```shell
npm run app:install

npm run start:dev
```

## Run stylus and watch

```shell
npm run style:watch
```

## API Endpoint

```
http://localhost:8000/qr
```
Endpoint response example

```json
{"status":"success","wifi":{"qr":{"ssid":"myHomeWifi","password":"pass1234","encryptionType":"WPA"},"png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATMSURBVO3BQY4jRxAEwfAC//9l1x7zVECjk6PRKszwj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhZ98hKQn6TmDSA3aiYgk5o3gExqboD8JDVvnFQtOqladFK16JNlajYBeQLIpGZSswnIjZpJzQRkUnOjZhOQTSdVi06qFp1ULfrky4A8oeYJIDdAJjWb1DwBZBOQJ9R800nVopOqRSdViz75y6mZgNyouQHyhpoJyN/kpGrRSdWik6pFn/zPqJmA3KiZgNyoeULN3+SkatFJ1aKTqkWffJma30zNBGRSc6NmAnKjZpOa3+SkatFJ1aKTqkWfLAPyb1IzAZnUTEAmNROQSc0EZFIzAbkBMqm5AfKbnVQtOqladFK16JOX1PxmaiYgk5oJyCY1E5An1PyXnFQtOqladFK16JOXgExqJiCb1ExqJiCTmjfUTECeADKpeQLIJjXfdFK16KRq0UnVIvwjLwCZ1ExAJjUTkEnNDZBJzf8JkCfU3ACZ1LxxUrXopGrRSdWiT5YBuQEyqZmAPAFkUjMBuVFzA2STmgnIpOZGzRNAJjXfdFK16KRq0UnVok+WqbkBcqPmBsgNkBs1E5BJzY2aCcik5gbIG0Bu1ExqftJJ1aKTqkUnVYs++TIgTwC5UTMBmdRMQCYgk5oJyA2QSc0E5EbNTwLyk06qFp1ULTqpWoR/5IuA3Kh5Asik5g0gk5oJyBNqJiA3am6A3KiZgLyh5o2TqkUnVYtOqhbhH3kByKTmBsg3qZmA3Ki5ATKpuQHyhpr/spOqRSdVi06qFn3ykpoJyBNqJiCTmgnIDZBJzTcBmdTcAJnUTEA2qflJJ1WLTqoWnVQt+uSHqZmA3ACZ1DwBZFIzAZnUTGomIDdAbtRsUvObnFQtOqladFK16JOXgExqboBMaiYgk5oJyI2aSc0EZFLzhppNam6AvAHkRs0bJ1WLTqoWnVQt+uTLgExqbtRMQG7UTECeADKpmYA8AeRGzQRkUnOj5gkgN2o2nVQtOqladFK16JMfBmRSc6NmAjIBmdRMQCY1T6i5ATKpeQPIJjU3QCY1b5xULTqpWnRSteiTL1MzAZmATGomIJOaGyCTmhsgk5obIJOa30TNDZBvOqladFK16KRqEf6R/zAgk5oJyI2aGyCTmgnIpGYC8oSaJ4DcqPlJJ1WLTqoWnVQt+uQlID9JzaTmCTU3QCY1E5BJzQRkE5BJzY2aCcikZgIyqXnjpGrRSdWik6pFnyxTswnIDZA3gNwAmdRMQG7U3AC5UfMEkH/TSdWik6pFJ1WLPvkyIE+oeUPNBOQNNROQSc0EZALyBJBNaiYgk5pNJ1WLTqoWnVQt+qSugExqbtTcALlR8wSQ3+SkatFJ1aKTqkWf/GWATGomIJuATGpu1NwAuVEzqZmATEB+0knVopOqRSdViz75MjXfpGYC8oSaGyA3aiYgT6iZ1DwBZFIzAbkBMql546Rq0UnVopOqRZ8sA/KTgExqJiCbgExqJjUTkEnNBGQTkEnNBGRSs+mkatFJ1aKTqkX4R6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYv+AU5KL0yP1J7MAAAAAElFTkSuQmCC"}}
```

# TODO: Make a console version of the same app
