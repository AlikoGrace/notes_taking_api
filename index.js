const express = require('express')
const fs = require('fs')

const app = express()
const port= 3000;
const notes = JSON.parse(fs.readFileSync('notes.json'))

app.use(express.json())

// CREATING A NEW NOTE
app.post('/notes', (req, res)=>{
    const {title,content}=req.body;
    const notesData = fs.readFileSync('./notes.json','utf-8');
    const notes= JSON.parse(notesData);
    //parsing it so it will become an object so i can query the properties

    const note={
        title,
        content,
        id:Date.now(),
        timestamp:new Date().toISOString()
    }

    notes.push(note)

    fs.writeFileSync('notes.json', JSON.stringify(notes))

    res.json('note created successfully')


})

//RETRIEVING A NOTE
app.get('/notes',(req,res)=>{
    const notesData = fs.readFileSync('notes.json','utf-8');
    const notes= JSON.parse(notesData);
    res.json(notes)
})


app.listen(port,()=>{
    console.log('server is running')
})