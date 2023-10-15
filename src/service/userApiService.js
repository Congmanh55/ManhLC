import db from '../models/index';
import {checkEmail, checkPhone, hashUserPassword} from "./loginService"

const getAllUser = async (req, res) => {

    let data = {
        EM: '',
        EC: '',
        DT: ''
    }

    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex", "address" ],
            include: { model: db.Group, attributes: ["name", "description"]},
        });
        if(users){
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        }else{
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }

    }catch(e) {
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try{
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description", "id"]},
            order: [['id', 'DESC']]
        })

        let totalPages = Math.ceil(count/limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
        
    }catch(e){
        console.log(e)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {

    try {
        //check email, phone
        let isEmail = await checkEmail(data.email);
        if (isEmail === true) {
            return {
                EM: 'Email da ton tai',
                EC: 1,
                DT: []
            }
        }

        let isPhone = await checkPhone(data.phone);
        if (isPhone === true) {
            return {
                EM: 'Phone number da ton tai',
                EC: 1,
                DT: []
            }
        }

        //hash password
        let hashPassword = hashUserPassword(data.password)
       
        await db.User.create({...data, password: hashPassword})
        return {
            EM: 'Create ok',
            EC: 0,
            DT: []
        }

    }catch(e) {
        return {
            EM: 'error from service',
            EC: -2,
            DT: []
        }
    }

}

const updateUser = async (data) => {

    try {
        if(!data.groupId) {
            return {
                EM: 'Error with empty groupId',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if(user){
            
           await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId

            })
            return {
                EM: 'Update user success',
                EC: 0,
                DT: ''
            }
            
        }else{
            return {
                EM: 'User not found',
                EC: -1,
                DT: ''
            }
        }

    }catch(e) {
        console.log(e)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }

}

const deleteUser = async (id) => {

    try {
        let user = await db.User.findOne({
            where: {id: id}
        })

        if(user) {
            await user.destroy();
            return {
                EM: 'delete user success ok',
                EC: 0,
                DT: []
            }
        }else{
            return {
                EM: 'user khong ton tai',
                EC: 1,
                DT: []
            }
        }

    }catch(e) {
        return {
            EM: 'error from service',
            EC: -1,
            DT: []
        }
    }

}

module.exports = {
    getAllUser,
    updateUser, 
    createNewUser,
    deleteUser, 
    getUserWithPagination
}