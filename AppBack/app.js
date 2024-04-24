const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./config/db');

const app = express();

//Configracion de express

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})