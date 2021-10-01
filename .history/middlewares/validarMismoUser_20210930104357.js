const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const mismoUser = (req, res, next) => {
    const user = req.user;
    console.log(user);

    const commentUser = req.body;
    console.log(commentUser);

    if (user.id !== commentUser.UserId) {
        throw new Error('The user trying to modify the comment is not the author');
    }

    next();

}

module.exports = {
    mismoUser
}