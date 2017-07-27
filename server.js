const express = require('express')
const app = express()

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/simpleApp', express.static(__dirname + '/simpleApp/'));
app.use('/reduxApp', express.static(__dirname + '/reduxApp/'));
app.use('/immutableReduxApp', express.static(__dirname + '/immutableReduxApp/'));

 app.get('*', function(req, res) {
		res.sendfile("./index.html");
 });

app.listen(3000, function () {
  console.log('Go check!')
})