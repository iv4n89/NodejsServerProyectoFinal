const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;
const Comments = dbOpen().models.Comments;

const mismoUser = async (req, res, next) => {
    const user = req.user;

    const { commId } = req.params;
    const comment = await Comments.findByPk(commId);

    if (user.id !== comment.UserId) {
        throw new Error('The user trying to modify the comment is not the author');
    }

    next();

}

module.exports = {
    mismoUser
}