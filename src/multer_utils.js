import multer from 'multer';
import __dirname from './utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dest = '';
        if (file.fieldname === 'profileImage') {
          dest = 'uploads/profiles/';
        } else if (file.fieldname === 'productImage') {
          dest = 'uploads/products/';
        } else if (file.fieldname === 'document' || file.fieldname === 'identificacion' || file.fieldname === 'comprobanteDomicilio' || file.fieldname === 'estadoDeCuenta') {
          dest = 'uploads/documents/';
        } else {
          dest = 'uploads/others/';
        }
        callback(null, __dirname+'/public/'+dest)
    },
    filename: function (req, file, callback) {
        callback(null,  new Date().getTime()+'_'+file.originalname)
    }
})
export const uploader = multer({storage})
