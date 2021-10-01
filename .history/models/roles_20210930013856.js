module.exports = (sequelize, DataType) => {

    const Roles = sequelize.define('Roles', {
        role: {
            type: DataType.STRING,
            allowNull: false,
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