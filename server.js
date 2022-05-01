// All we need
let express = require('express');
let app = express();

// Serve files from the static directory
app.use(express.static('./src'));
app.listen(3000, () => console.log('Server running on PORT 3000'));
console.log("Please go to http://localhost:3000/index.html to see the magic :D");
