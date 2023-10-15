import express from "express"
import { handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser } from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", handleUserPage)
    
    router.post('/users/create-user', handleCreateNewUser)
    router.post('/delete-user/:id', handleDeleteUser)
    router.get('/update-user/:id', getUpdateUserPage)
    router.post('/users/update-user', handleUpdateUser)

    return app.use("/", router);

}

module.exports = initWebRoutes;
