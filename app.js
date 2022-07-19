const express = require('express')
const path = require('path')
const app = express()

const indexRoutes = require('./routes/index')
//port number
const port = process.env.port || 3002

app.set('views',path.join(__dirname,"views"))
app.set('view engine','pug')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
    extended:false
}))

app.use('/',indexRoutes)

app.listen(port,(req,res)=>{
    console.log("front end working at port : "+port)
})



module.exports = app