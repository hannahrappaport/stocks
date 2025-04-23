var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
//var port = 8080;   //uncomment to run local
console.log("This goes to the console window");

const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.wla0wbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  if (urlObj.pathname == "/") 
  {
     res.write("<h2>Enter a stock ticker symbol or company name.</h2>");
     s = "<form method='get' action='/process'>" +
         "Enter ticker or company name <input type='text' name='name' required><br><label><input type='radio' name='type' value='ticker' required> Ticker Symbol</label><input type='radio' name='type' value='company' required> Company Name</label><br><button type='submit'>Search</button></form>"


     res.write(s)
     res.end()
  }
    
    
    else if (urlObj.pathname == "/process") {
        console.log("Processing search...");
      
        async function processSearch() {
          try {
            await client.connect();
            const collection = client.db("your-db-name").collection("PublicCompanies");
      
            const searchQuery = urlObj.query.name;
            const type = urlObj.query.type;
      
            let search = {};
            if (type === "ticker") {
              search = { ticker: { $regex: searchQuery, $options: 'i' } };
            } else if (type === "company") {
              search = { name: { $regex: searchQuery, $options: 'i' } };
            }
      
            const results = await collection.find(search).toArray();
      
            let html = `<h2>Search Results:</h2>`;
            if (results.length > 0) {
              results.forEach(doc => {
                html += `<div><strong>${doc.name}</strong><br>Ticker: ${doc.ticker}<br>Price: $${doc.price}<br><br></div>`;
              });
            } else {
              html += "<p>No matching results found.</p>";
            }
      
            res.write(html);
            res.end();
      
          } catch (err) {
            console.error("Error during DB search:", err);
            res.write("An error occurred.");
            res.end();
          } finally {
            await client.close();
          }
        }
      
        processSearch();
      }
      
    

  
  
}).listen(port);

// require('dotenv').config();
// const express = require('express');
// const path = require('path');
 

// const app = express();
// const PORT = process.env.PORT || 3000;


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
// }
// })

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
