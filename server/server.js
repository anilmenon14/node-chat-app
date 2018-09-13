const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname + "/../public/");



var app = express();

const port = process.env.PORT || 3000;

//Option 1

app.use(express.static(publicPath));  // '/' path of URL is served up with contents in the folder publicPath


//Option 2
// app.get('/', (req,res) => {
//
// res.sendFile(publicPath + "index.html");
//
// });


app.listen(port,() => {
  console.log('Started on port ',port);
});
