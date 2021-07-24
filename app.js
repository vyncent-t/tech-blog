require('dotenv').config();
const path = require('path');
const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controllers");


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));


app.engine("handlebars", exphbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening ${PORT}`));
}).catch(err => {
    console.log(err)
});