const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
//Setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
