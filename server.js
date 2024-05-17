const htmlRoutes = require("./routes/html-routes");
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api-routes");
const PORT = process.env.PORT || 3000;


// Sets up the express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App is running on PORT http://localhost:${PORT}");
});

module.exports = app;