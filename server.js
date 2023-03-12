import express from 'express'
import morgan from 'morgan'
import dotenv from "dotenv"
import cors from "cors"
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import router from './routes/routes.js'

// Use environment variables
dotenv.config({path: './config.env'})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middleware

if (process.env.NODE_ENV === 'development') {

    app.use(morgan('dev'));

}

app.use(cors({
    origin: 'https://pfcode-wifi-qr.onrender.com/'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

process.on('uncaughtException', err => {

    console.log(`Uncaught Exception. 💥 Shutting down the server...`)

    console.log(err.name, err.message)

    process.exit(1)

})

const port = process.env.PORT || 5000

const server = app.listen(port, () => {

    console.log(`App running on port: http://localhost:${port}`)

})

// Handle all promise unhandled rejection

process.on('unhandledRejection', (err) => {

    console.log(`Unhandled Rejection. 💥 Shutting down the server...`)

    console.log(err.name, err.message)

    // Gracefully shutting down the server

    server.close(() => {
        process.exit(1)
    })

})

