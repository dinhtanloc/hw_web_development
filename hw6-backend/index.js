import express from 'express';
import Math from 'math';

const pi=Math.PI
// let r=2;

const app = express();

app.get("/math/circle/:r", function(req, res){
    let r=1
    const response ={'area':r,'circle':pi*pi*r}
    res.send(response);
});


app.listen(3000, function() {
    console.log("Server started on port 3000")
});