import {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination
} from '../service/userApiService';

const readFunc = async (req, res) => {

    try {
        if(req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }else{
            let data = await getAllUser();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            EM:'error from server', //error message
            EC: '-1', //error code
            DT: '' //data 
        })
    }

}

const createFunc = async (req, res) => {

    try {
        //validate
        let data = await createNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    }catch(e) {
        console.log(e)
        return res.status(500).json({
            EM:'error from server', //error message
            EC: '-1', //error code
            DT: '' //data 
        })
    }

}

const updateFunc = async (req, res) => {

    try {
        //validate
        let data = await updateUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    }catch(e) {
        console.log(e)
        return res.status(500).json({
            EM:'error from server', //error message
            EC: '-1', //error code
            DT: '' //data 
        })
    }


}

const deleteFunc = async (req, res) => {

    try {
        let data = await deleteUser(req.body.id);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    }catch(e) {
        console.log(e)
        return res.status(500).json({
            EM:'error from server', //error message
            EC: '-1', //error code
            DT: '' //data 
        })
    }


}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'ok',
        EC: 0,
        DT: {
            access_token: req.token,
            email: req.user.email,
            groupWithRoles: req.user.groupWithRoles,
            username: req.user.username
        }
    })
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}