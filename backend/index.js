const connectMongo = require('./db');
const express = require('express')

// Used cors for database work using website
var cors = require('cors') 


const app = express()
const port = 3080

connectMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})
