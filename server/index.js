const express=require('express')
const bodyParser=require('body-parser')
const db=require('./DBConnection')
const route=require('./routes')
const cors=require('cors')

const app=express()
app.use(express.static(`${__dirname}/upload`));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.use('/freelancers_marketplace_api/',route)

app.listen(4036,()=>{
    console.log("Server created successfully");
})
