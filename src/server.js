import express from 'express'
import cors from 'cors'
import router from './router.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:3000/`)
})