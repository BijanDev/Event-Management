const express = require('express'); //
const cors = require('cors');
const mongoose = require('mongoose');
const eventRoute = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

PORT = process.env.PORT;


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected");

        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error", err);
    })

app.use('/api', eventRoute);