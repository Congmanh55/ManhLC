
require("dotenv").config();
var cors = require('cors');


const configCors = (app) => {
    const corsOptions ={
        origin:'http://localhost:3000', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions))
    //add header
    app.use(function(req, res, next) {

        //Website you wish to allow to conect
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

        //Request methods you wish to connect
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

        //Request header you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        //set to true if you need the website to include cookies in the requests
        //to be API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        //Pass to next layer of middleware
        next();
    })

}

export default configCors;