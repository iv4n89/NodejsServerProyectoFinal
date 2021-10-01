module.exports = (sequelize, DataType) => {

    const Comments = sequelize.define('Comments', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        puntuacion: {
            type: DataType.BIGINT(2),
            allowNull: true,
            validate: {
                min: 1,
                max: 10
            }
        }
    });

    Comments.associate = (models) => {
        Comments.belongsTo(models.Films);
    };

    return Comments;

}