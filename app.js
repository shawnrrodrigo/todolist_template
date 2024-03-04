const express = require("express")
const bodyParser = require("body-parser")
const { render } = require("ejs")

const app = express()

let items =["Buy food", "Cook food"]
let workItems = []

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    var today = new Date()

    var options = {
        weekday :"long",
        day: "numeric",
        month: "long"
    }
        
    var day = today.toLocaleDateString("en-US", options)

    res.render("list", {listTitle: day, newListItem: items})
})

app.post("/", (req, res) => {
    let item = req.body.newItem
    if(req.body.list === 'Work Items'){
        workItems.push(item)
        res.redirect("/work")
    } else{
        items.push(item)
        res.redirect("/")
    }
})


app.get("/work", (req, res) => {
    res.render("list", {listTitle: 'Work Items', newListItem: workItems})
})

app.post("/work", (req, res) =>  {
    let workItem = req.body.newItem
    workItems.push(workItem)
    res.redirect("/work")
})

app.listen(3000, ()=>{
    console.log("Server is running in port 3000")
})