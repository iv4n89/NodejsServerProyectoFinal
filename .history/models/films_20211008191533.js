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
            defaultValue: 0.00
        }
    });

    Films.associate = (models) => {
        Films.hasMany(models.Comments, {onDelete: 'cascade', hooks: true});
        Films.belongsTo(models.Users);
    }

    return Films;

}