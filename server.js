var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
//var port = 8080;   //uncomment to run local
console.log("This goes to the console window");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.wla0wbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  if (urlObj.pathname == "/") 
  {
     res.write("<h2>Enter a stock ticker symbol or company name.</h2>");
     s = "<form method='get' action='/process'>" +
         "Enter ticker or company name <input type='text' name='name' required><br><br><label><input type='radio' name='type' value='ticker' required> Ticker Symbol</label><input type='radio' name='type' value='company' required> Company Name</label><br><br><button type='submit'>Search</button></form>"


     res.write(s)
     res.end()
  }
    
    
    else if (urlObj.pathname == "/process") {
        console.log("Processing search...");
      
        async function processSearch() {
          try {
            await client.connect();
            const collection = client.db("Stock").collection("PublicCompanies");
      
            const searchQuery = urlObj.query.name;
            const type = urlObj.query.type;
            let search = {};
            if (type === "ticker") {
              search = { ticker: { $regex: searchQuery, $options: 'i' } };
            } else if (type === "company") {
              search = { name: { $regex: `^${searchQuery}$`, $options: 'i' } };
            }
      
            const results = await collection.find(search).toArray();
      
            let html = `<h2>Search Results:</h2>`;
            let cons = ``;
            if (results.length > 0) {
              results.forEach(doc => {
                html += `<div><strong>${doc.name}</strong><br>Ticker: ${doc.ticker}<br>Price: $${doc.price}<br><br></div>`;
                cons += `Name: ${doc.name}, Ticker: ${doc.ticker}, Price: $${doc.price} \n`;
              });
            } else {
              html += "<p>No matching results found.</p>";
            }
            
            console.log(cons);
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


