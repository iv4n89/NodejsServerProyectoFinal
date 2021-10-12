const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, extensiones = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombre_cortado = archivo.name.split('.');
        const extension = nombre_cortado[nombre_cortado.length - 1];

        if (!extensiones.includes(extension)) {
            return reject(`La extension ${extension} no es permitida. Extensiones: ${extensionesValidas}`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(uploadPath);
        });
    });

}

module.exports = {
    uploadFiles
}