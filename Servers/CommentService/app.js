const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const commentRoute = require('./routes/commentRoute');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })

app.use('/api', commentRoute);