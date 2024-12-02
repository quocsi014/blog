import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname); // Lấy đuôi file (vd: .png, .jpg)
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
};
