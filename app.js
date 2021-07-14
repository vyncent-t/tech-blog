require('dotenv').config();
const path = require('path');
const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controllers");


// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.DB_PORT || 3000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening ${PORT}`));
}).catch(err => {
    console.log(err)
});