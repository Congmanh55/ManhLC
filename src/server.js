import express from "express";
import bodyParser from "body-parser";//co query, params
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/CORS';
import cookieParser from 'cookie-parser';

require('dotenv').config();

let app = express();
let port = process.env.PORT || 8080;

//config CORS
configCors(app);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);

//config cookie parser
app.use(cookieParser());

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(port, () => {
    console.log("Backend running in the port:" + port);
})

