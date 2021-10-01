const { Model } = require('sequelize');

module.exports = (sequelize, DataType) => {
    class Film extends Model { }

    Film.init({
        id: {
                type: DataType.INTEGER(150),
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: DataType.STRING,
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
            }
    }, {
        sequelize,
        modelName: 'Film'
    });
}










// module.exports = (sequelize, DataType) => {

//     const Films = sequelize.define('Films', {
//         id: {
//             type: DataType.INTEGER(150),
//             primaryKey: true,
//             autoIncrement: true
//         },
//         titulo: {
//             type: DataType.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         estreno: {
//             type: DataType.BIGINT(4),
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         }
//     });

//     Films.associate = (models) => {
//         Films.hasMany(models.Comments);
//     }

//     return Films;

// }