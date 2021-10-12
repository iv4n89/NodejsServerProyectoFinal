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
            type: DataType.VIRTUAL,
            // get() {
            //     // const sum = await sequelize.query(`SELECT FilmId, SUM(puntuacion) as total, COUNT(id) as comentarios FROM comments WHERE FilmId = ${this.id}`, {type: QueryTypes.SELECT});
            //     // const media = sum[0].total / sum[0].comentarios;
            //     // console.log(media);
                
            //     return sequelize.query(`SELECT FilmId, SUM(puntuacion) as total, COUNT(id) as comentarios FROM comments WHERE FilmId = ${this.id}`, {type: QueryTypes.SELECT})
            //         .then(function(result) {
            //             console.log(result);
            //             return result[0].total;
            //         });
            // }
        }
    }, {
        getterMethods: {
            puntuacion_media: async function () {
                return await this.getComments().then(result => result.puntuacion);
            }
        }
    });

    Films.associate = (models) => {
        Films.hasMany(models.Comments, {onDelete: 'cascade', hooks: true});
        Films.belongsTo(models.Users);
    }

    return Films;

}