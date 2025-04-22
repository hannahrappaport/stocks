// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS)
// app.use(express.static(path.join(__dirname, 'public')));

// // View 1: Home Page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'home.html'));
// });

// View 2: Process View (handle GET request from form)
// app.get('/process', (req, res) => {
//   const query = req.query.query;
//   const type = req.query.type;

//   res.send(`<h2>You searched for ${type === 'ticker' ? 'Ticker Symbol' : 'Company Name'}: ${query}</h2>`);
// });

// app.listen(PORT, () => {
//   console.log(`✅ App running on http://localhost:${PORT}`);
// });


var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
//var port = 8080;   //uncomment to run local
console.log("This goes to the console window");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  if (urlObj.pathname == "/") 
  {
     res.write ("Success!  This app is deployed online");
     res.write("<h2>This is my hello application</h2>");
     s = "<form method='get' action='/process'>" +
         "Enter the secret ID <input type='text' name='id'><br /><input type='submit'></form>"
     res.write(s)
     res.end()
  }
  else if (urlObj.pathname == "/process") {
  id = urlObj.query.id
  
  res.write ("The id is: " + id)
  res.end();
  console.log('hey')
  }
}).listen(port);