module.exports = (sequelize, DataType) => {

    const Roles = sequelize.define('Roles', {
        role: {
            type: DataType.ENUM('ADMIN_ROLE','USER_ROLE'),
            allowNull: false,
            defaultValue: 'USER_ROLE',
            validate: {
                notEmpty: true
            }
        }
    });

    Roles.associate = (models) => {
        Roles.belongsTo(models.Users);
    }

    return Roles;
}