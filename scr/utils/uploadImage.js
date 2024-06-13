import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';

// confi Ruta absoluta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// TODO: Configuracion MULTER
const storage = multer.diskStorage(
    {
        // Ubicacion del directorio donde voy a guardar los archivos
        destination: function (req, file, cb) {
            let folder = '';
            switch (req.body.tipo) {
                case 'perfil':
                    folder = 'profiles';
                    break;
                case 'producto':
                    folder = 'products';
                    break;
                case 'documento':
                    folder = 'documents';
                    break;
                default:
                    return cb(new Error('Tipo no válido'));
            }

            const uploadPath = join(__dirname, '..', 'public', 'img', folder);
            cb(null, `${uploadPath}`)
        },

        // Seteamos el nombre del archivo
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    }
)


export const uploader = multer({
    storage,
    // si se genera algun error, lo pcapturamos
    onError: function (err, next) {
        console.log(err);
        next()
    }
})

