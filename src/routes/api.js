import express from "express"
import { testApi, 
        handleRegister, 
        handleLogin 
} from '../controllers/apiController';
import {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc
} from "../controllers/userController";

import {
    readGrFunc
} from "../controllers/groupController";
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction'

const router = express.Router();

const initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermission);

    //rest APi 
    router.get('/test-api', testApi);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);

    //R
    router.get('/user/read', readFunc)

    //C
    router.post("/user/create", createFunc)

    //update
    router.put("/user/update", updateFunc)

    //delete
    router.delete("/user/delete", deleteFunc)

    router.get("/group/read", readGrFunc);

    return app.use('/api/v1/', router);

}

module.exports = initApiRoutes
