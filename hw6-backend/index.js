import express from 'express';
import Math from 'math';
import axios from 'axios';

//HW1

const pi=Math.PI
// let r=2;

const app = express();

app.get("/math/circle/:r", function(req, res){
    let r=parseFloat(req.params.r);
    const response ={'area':Math.pow(r,2),'circle':pi*pi*r}
    res.send(response);
});

//HW2

app.get('/math/rectangle/:width/:height',function(req, res){
    let width = parseFloat(req.params.width);
    let height = parseFloat(req.params.height);
    const response ={'area':width*height,'circle':(width+height)*2}
    res.send(response);
    
})

//HW3
app.get('/math/power/:base/:exponent',function(req, res){
    let base = parseInt(req.params.base);
    let exponent=parseInt(req.params.exponent)
    let root = req.query.root
    if (root=='true'){
        const response ={'result':Math.pow(base,exponent),'root':exponent}
        res.send(response);
        
    }
    else{
        const response ={'result':Math.pow(base,exponent)}
        res.send(response);

    }
    
})

//hw4
const categories = {
    'cake': [
        { 'joke': 'Why did the cake go to school? Because it wanted to be a layer!' },
        { 'joke': 'What did the cake say to the fork? You want a piece of me?' }
    ],
    'cafe': [
        { 'joke': 'What do you call a cow who’s just given birth? De-calf-einated!' },
        { 'joke': 'Why did the coffee file a police report? It got mugged!' }
    ],
    'tea': [
        { 'joke': 'What type of tea is hard to swallow? Reality!' },
        { 'joke': 'How do you organize a tea party in space? You planet!' }
    ]
};

// Endpoint 1: /jokebook/categories
app.get('/jokebook/categories', (req, res) => {
    const categoryKeys = Object.keys(categories);
    let response = '';

    categoryKeys.forEach((category, index) => {
        response += `a possible category is ${category}\n`;
    });

    res.send(response);
});

// Endpoint 2: /jokebook/joke/:category
app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    
    if (!categories[category]) {
        return res.status(404).json({ 'error': `no category listed for ${category}` });
    }

    const jokes = categories[category];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    
    res.json(randomJoke);
});

app.listen(3000, function() {
    console.log("Server started on port 3000")
});

