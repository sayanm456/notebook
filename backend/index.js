const connectToDB = require('./db')
const express = require('express')
var cors = require('cors')

connectToDB();
const app = express()
const port = 8080

app.use(cors())

app.use(express.json())

// available route
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`NoteBook backend listening on port http://localhost:${port}`)
})