const express = require('express');
const port = 3001;
const app = express();
const route = require('./src/routes');
const cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname, './public/')));

route(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})