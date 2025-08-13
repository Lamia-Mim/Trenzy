import express from 'express'
import cors from 'cors'
import 'dotenv/config'


// app config
const app = express()
const PORT = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())

//apo endpoints
app.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})