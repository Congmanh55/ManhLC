import db from '../models/index';

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'DESC']]
        })
        
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }

    }catch(error){
        console.log(error);
        return {
            EM: 'Error from service',
            EC: 1,
            DT: []
        }
    }
}

// Sử dụng hàm getGroups
// async function main() {
//     try {
//         let data = await getGroups();
//         console.log('Data:', data);
//     } catch (error) {
//         console.log('Error outside try:', error);
//     }
// }

// main();

module.exports = getGroups;