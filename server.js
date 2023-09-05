// MODULES
const express = require('express');
const router = require('./routes/router.js');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// CONFIGURE SERVER
// Create server
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3080;

// Create directory for static ressources
app.use(express.static('public'));


// Database connection
mongoose.connect(process.env.DB_URI, {
    dbName: 'utlagi-db'
})
    .catch((error) => console.log(error));
    
mongoose.connection.on('open', () => {
    console.log('Connexion to database successfull');
} );



// Middelware
// Auth
const oneDay = 1000 * 60 * 60 * 24;

// for production
app.set('trust proxy', 1);

if (process.env.NODE_ENV === 'production') {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: oneDay,
            sameSite: true,
        },
        proxy: true,
    }));
} else if (process.env.NODE_ENV === 'development') {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: oneDay,
            sameSite: true,
            secure: false,
        },
    }));
}

// check role and authorize access
app.use((req, res, next) => {
    const ROLE = {
        ADMIN: 'admin',
        USER: 'user'
    };

    const protectedRoutes = {
        admin: ROLE.ADMIN,
        moncompte: ROLE.USER
    };
    const currentRoute = req.url.split('/')[1];
    
    if (protectedRoutes[currentRoute] && req.session.role !== protectedRoutes[currentRoute]) {
        res.redirect('/');
        return;
    }
    
    next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 


// Parse POST request in order to provide body and files
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL-encoded payloads


app.use('/', router);


// Listen on port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});