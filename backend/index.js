const connectToMongo= require('./db')
const express = require('express')
var cors = require('cors')
const app = express()

connectToMongo();

app.use(cors())
const port = process.env.port || 5000

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})