//import groupService from '../service/groupService'
const groupService = require("../service/groupService");

const readGrFunc = async (req, res) => {
    try {
        // let data = await groupService.getGroups();
        let data = await groupService()

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    }catch(e) {
        console.log('lỗi lầm',e);
        return res.status(500).json({
            EM: 'error from service',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    readGrFunc
}