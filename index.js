const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const mongoURI = 
"mongodb+srv://kaviyaa_a:ABSK020507@cluster0.8rtm2.mongodb.net/crud_db?retryWrites=true&w=majority";


mongoose
.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB conncted..."))
.catch((err) => console.error("MongoDB connection error:", err));

//Mongoose Schemas & Model
const itemSchema = new mongoose.Schema({
    name : {type: String, required:true},
});

const Item = mongoose.model("Item", itemSchema);

//Routes

//Get all items
app.get("/items", async (req, res) => {
    try{
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//create a new item
app.post("/items", async (req, res) => {
    const newItem = new Item ({name: req.body.name});
    try{
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//update an item
app.put("items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByAndUpdate(
            req.params.id,
            {name:req.body.name},
            {new:true},
        );
        res.json(updatedItem);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});

//delete an item 
app.delete("/items/:id", async (req, res) => {
    try{
        await Item.fintBYAndDelete(req.params.id);
        res.json({success:true});
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//start the sever
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});