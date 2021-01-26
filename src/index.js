import express from "express";
import routes from './routes/index'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
dotenv.config({ path: './.env' })

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

const DB = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
// const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB Connection Successful!'))
    .catch((err) => console.log(err))

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port ${PORT}`))

export default app
