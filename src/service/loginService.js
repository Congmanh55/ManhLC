import db from '../models/index';
require('dotenv').config();
import bcrypt from 'bcryptjs';
import {Op} from 'sequelize';
import {getGroupWithRoles} from './JWTService';
import {createJWT} from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const checkEmail = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if(user) {
        return true;
    }
    return false;
}

const checkPhone = async (userPhone) => {
    let phone = await db.User.findOne({
        where: { phone: userPhone }
    })

    if(phone) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {

    try {
        //check email/phone number da ton tai chua
        let isEmail = await checkEmail(rawUserData.email);
        if (isEmail === true) {
            return {
                EM: 'Email da ton tai',
                EC: 1
            }
        }

        let isPhone = await checkPhone(rawUserData.phone);
        if (isPhone === true) {
            return {
                EM: 'Phone number da ton tai',
                EC: 1
            }
        }

        //hash password
        let hashPassword = hashUserPassword(rawUserData.password)
       
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4
        })

        

        return {
            EM: 'a user is create successfully',
            EC: 0
        }

    }catch(e) {
        return {
            EM: 'something wrong in service....',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);//tra ve true/ false
}

const handleUserLogin = async (rawData) => {
    try{
       
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin},
                    { phone: rawData.valueLogin}
                ]
            }
        })
        if(user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                //let token 

                //test Role
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRESIN
                }
                let token = createJWT(payload);
                return {
                    EM: 'okk',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        }
        return {
            EM: 'Email or phone or password khong dung',
            EC: 1,
            DT: ''
        }
        
    }catch(error){
        console.log(error)
        return {
            EM: 'Something wrongd in service...',
            EC: -2
        }
    }
}


module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmail,
    checkPhone
    
}