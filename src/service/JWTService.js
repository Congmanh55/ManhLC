import db from "../models/index";

const getGroupWithRoles = async (user) => {
    //scope
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        // attributes: ["id", "url", "description"],
        include: [{
                    model: db.Role, 
                    attributes: ["id", "url", "description"],
                    // through: {attributes: []}
                }]
    })

    console.log(roles)
    return roles ? roles : {};
}

module.exports = {
    getGroupWithRoles
}