import multer from "multer";
import { customAlphabet } from "nanoid";

const multerLoacl = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const nanoid = customAlphabet("0123456789MEROmero", 6);
     
      cb(null, nanoid() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });

  return upload;
};

export default multerLoacl;
