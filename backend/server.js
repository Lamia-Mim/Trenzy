import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';

//App config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
//app.use(express.urlencoded({ extended: true })); 
app.use(cors())

//Api endpoints
app.use('/api/product', productRouter)



app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))