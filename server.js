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
     res.write("<h2>This is my hello application</h2>");
    //  s = "<form method='get' action='/process'>" +
    //      "Enter the secret ID <input type='text' name='id'><br /><input type='submit'></form>"
    //  res.write(s)
    //  res.end()
  }
  else if (urlObj.pathname == "/process") {
  id = urlObj.query.id
  
  res.write ("The id is: " + id)
  res.end();
  console.log('hey')
  }
}).listen(port);

// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const { MongoClient } = require('mongodb');

// const app = express();
// const PORT = process.env.PORT || 3000;

// const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.wla0wbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri);

// // Serve static HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'home.html'));
// });

// // Process search (View 2)
// app.get('/process', async (req, res) => {
//   const { query, type } = req.query;

//   try {
//     await client.connect();
//     const collection = client.db().collection('PublicCompanies');

//     let search = {};
//     if (type === 'ticker') {
//       search = { ticker: { $regex: query, $options: 'i' } }; // Case-insensitive
//     } else if (type === 'company') {
//       search = { name: { $regex: query, $options: 'i' } };
//     }

//     const results = await collection.find(search).toArray();

//     if (results.length === 0) {
//       console.log("No matches found.");
//     } else {
//       results.forEach(doc => {
//         console.log(`Name: ${doc.name}, Ticker: ${doc.ticker}, Price: $${doc.price}`);
//       });
//     }

//     // For extra credit: show results in browser
//     let html = `<h1>Results</h1>`;
//     if (results.length > 0) {
//       html += results.map(doc => `
//         <div>
//           <strong>${doc.name}</strong><br>
//           Ticker: ${doc.ticker}<br>
//           Price: $${doc.price}<br><br>
//         </div>
//       `).join('');
//     } else {
//       html += `<p>No results found.</p>`;
//     }
//     res.send(html);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error searching database.");
//   } finally {
//     await client.close();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
