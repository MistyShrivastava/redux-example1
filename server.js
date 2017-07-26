const express = require('express')
const app = express()

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/app', express.static(__dirname + '/app/'));

 app.get('*', function(req, res) {
		res.sendfile("./index.html");
 });

app.listen(3000, function () {
  console.log('Go check!')
})