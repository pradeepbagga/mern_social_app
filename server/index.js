const express = require('express');
const app = express();
// const port = 5000;
const path = require('path');
const authRoute = require('./routes/auth-routes');
const postRoute = require('./routes/post-route');
const userRoute = require('./routes/user-route');

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'server/.env' });
}

const port = process.env.PORT;
require('./db/mongodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoute);
app.use('/api', postRoute);
app.use('/api', userRoute);

/* ####################  #################### */
if (process.env.NODE_ENV == "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
    });
}
/* ####################  #################### */

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});