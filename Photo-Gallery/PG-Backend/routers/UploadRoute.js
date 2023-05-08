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

router.get('/search/:tags', async (req, res) => {

  const searchTerm = new RegExp(req.params?.tags,'i');
  
  if(searchTerm!==''){
    try{
      const searchResults = await UploadModel.find({ tags : searchTerm});
      if(searchResults.length === 0){
        res.status(404).json({message :"No Image found"})
      }
      else res.send(searchResults);
    }
    catch(error){
      console.log(error);
      res.status(404).json({message :"No Image found"})
    }
  }
  else{
    res.status(404).json({message :"No Image found"})
  }
});

module.exports = router;
