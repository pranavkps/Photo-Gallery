const { Router } = require("express");
const multer = require('multer');
const UploadModel = require("../models/dataModel");

const router = Router();

router.get("/get", async (req, res) => {
  const allPhotos = await UploadModel.find();
  res.send(allPhotos);
});
const storage = multer.diskStorage({
  destination: '../Images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({storage});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const image = new UploadModel(req.body);
      await image.save();
      res.json(image);
      console.log(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save image.' });
  }
});

router.post('/upload', async(req,res)=>{
  try{
    const data = new UploadModel(req.body);
    await data.save();
    res.json(data);
  }
  catch(error){
    console.log(eror);
    res.status(500).json({ message: 'Failed to save image.' });
  }
});

router.get('/search', (req, res) => {
  const searchTerm = req.body; 

  UploadModel.find({ $or: [{tags: { $regex: new RegExp(searchTerm,'i')}}, { description: { $regex: new RegExp(searchTerm,'i')}}]})
    .then(results => {
      res.send(results); 
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

module.exports = router;