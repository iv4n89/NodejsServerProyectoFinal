module.exports = (sequelize, DataType) => {

    sequelize.define('Tasks', {
        id: {
            type: DataType.INTEGER,
            primayKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

}