const { QueryTypes } = require("sequelize");

module.exports = (sequelize, DataType) => {

    const Films = sequelize.define('Films', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        estreno: {
            type: DataType.BIGINT(4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        img: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: "https://www.euroresidentes.com/suenos/img_suenos/pelicula-suenos-euroresidentes.jpg"
        },
        puntuacion_media: {
            type: DataType.DOUBLE,
            allowNull: true,
            defaultValue: 0.00,
            get: async function () {
                const sum = await sequelize.query(`SELECT FilmId, SUM(puntuacion) as total FROM comments WHERE FilmId = ${this.id}`, {type: QueryTypes.SELECT});
                const total = await sequelize.query(`SELECT CommentId, COUNT()`)
                console.log(sum);
                return sum;
            }
        }
    });

    Films.associate = (models) => {
        Films.hasMany(models.Comments, {onDelete: 'cascade', hooks: true});
        Films.belongsTo(models.Users);
    }

    return Films;

}