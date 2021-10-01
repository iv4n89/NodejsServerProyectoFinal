module.exports = (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        img: {
            type: DataType.STRING,
            allowNull: true
        },
        role: {
            type: DataType.ENUM,
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            allowNull: false,
            defaultValue: 'USER_ROLE',
            validate: {
                notEmpty: true
            }
        },
        state: { //borrar
            type: DataType.BOOLEAN,
            defaultValue: true
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Comments);
    }

    return Users;

}