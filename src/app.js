import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { database } from './keys';
import path from 'path'
import morgan from 'morgan';
import flash from 'connect-flash';
import exhbrs from 'express-handlebars';
import libs from './lib/handlebars';
import routes from './routes/app.routes';
import auth from './routes/authentication.routes';
import links from './routes/links.routes';
import passport from 'passport';
const app = express();

import './lib/passport';

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbrs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: libs
}));
app.set('view engine', '.hbs');

//Middleware
app.use(session({
    secret: 'daromysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//Routes
app.use('/', routes);
app.use('/links', links);
app.use('/', auth);

//Statics files
app.use(express.static(path.join(__dirname, 'public')));

export default app;