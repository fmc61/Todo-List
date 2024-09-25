const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) =>{
   TodoModel.find()
   .then(result => res.json(result))
   .catch(err => res.json(err))
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await TodoModel.findByIdAndUpdate({ _id: id }, { done: true }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await TodoModel.findByIdAndDelete({ _id: id });
        res.json(result);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/add', (req, res) => {
    try {
        const task = req.body.task;
        const result = TodoModel.create({
            task: task
        })
        console.log(result);
        
    } catch (error) {
        console.log(res.json(error));
        
    }
   
})

app.listen(3001, ()=> {
    console.log("server is running");
    
})