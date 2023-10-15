
require('dotenv').config()
import { createNewUser, getUserList, deleteUser, getUserById, updateUserInfor } from '../service/userService'

const handleUserPage = async (req, res) => {
    console.log('Cookies: ', req.cookies)

    let userList = await getUserList()
    return res.render("users.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    createNewUser(email, password, username);
    
    return res.redirect("/");
}

const handleDeleteUser = async (req, res) => {
    await deleteUser(req.params.id);

    return res.redirect("/");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let userData = await getUserById(id);
    
    return res.render("user-update.ejs", {userData})
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;

    await updateUserInfor(email, username, id);

    return res.redirect("/");
}

module.exports = {
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage, 
    handleUpdateUser
}