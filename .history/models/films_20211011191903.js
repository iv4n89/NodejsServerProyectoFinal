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
                notEmpty: true,
                isNumeric: true
            }
        },
        duracion: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                min: 0
            }
        },
        img: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: "https://www.euroresidentes.com/suenos/img_suenos/pelicula-suenos-euroresidentes.jpg"
        },
        genero: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: 'Sin Género'
        },
        puntuacion_media: {
            type: DataType.DOUBLE,
            allowNull: true,
            defaultValue: 0.00
        }
    });

    Films.associate = (models) => {
        Films.hasMany(models.Comments, {onDelete: 'cascade', hooks: true});
        Films.belongsTo(models.Users);
    }

    // Films.prototype.getPuntuacionMedia = async function () {
    //     const sum = await sequelize.query(`SELECT FilmId, SUM(puntuacion) as total, COUNT(id) as comentarios FROM comments WHERE FilmId = ${this.id}`, { type: QueryTypes.SELECT });
    //     const media = sum[0].total / sum[0].comentarios;
    //     console.log(media);
    //     return media;
    // }

    // Films.prototype.setPuntuacionMedia = async function (id) {
    //     const sum = await sequelize.query(`SELECT FilmId, SUM(puntuacion) as total, COUNT(id) as comentarios FROM comments WHERE FilmId = ${id}`, { type: QueryTypes.SELECT });
    //     const media = sum[0].total / sum[0].comentarios;
    //     this.setDataValue('puntuacion_media', media);
    // }

    return Films;

}