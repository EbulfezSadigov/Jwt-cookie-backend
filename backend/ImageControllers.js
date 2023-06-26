const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(cors())
const path = require('path');

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// MongoDB connection
const mongoURI = 'mongodb+srv://abulfaz:ebulfez1970@cluster0.ruexthu.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conn = mongoose.connection;
conn.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a Mongoose model for the image
const Image = mongoose.model('Image', new mongoose.Schema({
  mainImage: String,
  contentImage:String
}));

// Create storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// API endpoint for uploading the image
app.post('/api/upload', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'contentImage', maxCount: 1 }
]), async (req, res) => {
  const mainImageFile = req.files['mainImage'];
  const contentImageFile = req.files['contentImage'];

  if (!mainImageFile || !contentImageFile) {
    return res.status(400).json({ error: 'No image files uploaded' });
  }

  try {
    const mainImage = mainImageFile[0].filename;
    const contentImage = contentImageFile[0].filename;

    const image = new Image({
      mainImage,
      contentImage
    });
    await image.save();

    res.status(200).json({ message: 'Images uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save images to the database' });
  }
});

app.get('/api/upload', async (req, res) => {
  const images = await Image.find()
  res.send(images)
})

app.listen(3000, () => {
  console.log('API is running on port 3000');
})