// All we need
let express = require('express');
let app = express();
let PORT_default = 3000;
//let PORT = PORT_default || process.env.PORT;
let PORT = process.env.PORT || 8080;

// Serve files from the static directory
app.use(express.static('./src'));
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
console.log( `Please go to http://localhost:${PORT}/index.html to see the magic :D`);
