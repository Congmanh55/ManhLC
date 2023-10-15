

require('dotenv').config();
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt)

    return hashPassword;
}
//Create
const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);

    //khi nhap xong input se cap nhat vao database
    try {
        db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch(error) {
        console.log("Failed : " + error)
    }
}

//Read
const getUserList = async () => {
//test relationship
    // let newUser = await db.User.finAll({
    //     where: { id : 1 },
    //     include: { model: db.Group },
    //     raw: true,
    //     nest: true
    // })

    // let roles = await db.Role.findAll({
    //     include: {model: db.Group, where: { id: 1 } },
    //     raw: true,
    //     nest: true
    // })

    // console.log(newUser)
    // console.log(roles)

    let users = [];

    users = await db.User.findAll();

    return users;



    // let [results, fields] = await (await connection).execute(
    //     `SELECT * FROM User u`
    // );
    // return results;
    
};

//Delete
const deleteUser = async (userId) => {

    await db.User.destroy({
        where: {id: userId}
    })

    // let [results, fields] = await (await connection).execute(
    //     `DELETE FROM User WHERE id=?`, [id]
    // );

}

const getUserById = async (userId) => {
//luu ys: cần convert từ dạng object sequelize sang js thuần
//sử dụng user.get({plain: true})
    let user = {};

    user = await db.User.findOne({
        where: {id: userId}
    })

    return user.get({plain: true});

    // let [results, fields] = await (await connection).execute(
    //     `SELECT * FROM User WHERE id=?`, [id]
    // );

    // let user = results && results.length > 0 ? results[0] : {};

    // return user;
}

const updateUserInfor = async (email, username, id) => {

    db.User.update(
        {email: email, username: username},
        {
            where: {id: id}
        }
    );

    // const [results, fields] = await (await connection).execute(
    //     `UPDATE User SET email = ?, username = ? WHERE id=?`, [email, username, id] 
    // )
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser, 
    getUserById, 
    updateUserInfor
}