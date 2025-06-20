import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
  },
  destination: (req, file, cb) => { 
    cb(null, 'uploads/images');  
  },  
});

const upload = multer({ 
  storage :storage,
 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) { 
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Optional: Limit file size (2MB)
});
export default upload;


// Set storage engine
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile'); // Save in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
 
// Initialize multer
export const uploadProfile = multer({
  storage: storageProfile,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  } 
}).fields([ 
  { name: 'Myimage', maxCount: 1 },
  { name: 'showroomCardImage', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {  
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}




