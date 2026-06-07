const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diretorio = "public/storage/";

if (!fs.existsSync(diretorio)) {
  fs.mkdirSync(diretorio, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, diretorio);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);

    cb(null, `${fileName}${ext}`);
  },
});

module.exports = multer({ storage });
