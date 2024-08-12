import multer from "multer";
import { customAlphabet } from "nanoid";
import path from "path";
import fs from "fs";

export const validExtension = {
  image: ["image/png", "image/jpeg", "image/jpg"],
  pdf: ["application/pdf"],
  video: ["video/mp4", "video/mkv"],
  doc: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
};

const multerLoacl = (customValidation, customPath) => {
  const allpath = path.resolve(`uploads/${customPath}`);
  if (!fs.existsSync(allpath)) {
    fs.mkdirSync(allpath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, allpath);
    },
    filename: function (req, file, cb) {
      const nanoid = customAlphabet("0123456789MEROmero", 6);

      cb(null, nanoid() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (customValidation.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error("png or jpg only!"), false);
  };

  const upload = multer({ fileFilter, storage });

  return upload;
};

export default multerLoacl;
