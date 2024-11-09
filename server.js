const FormData = require('form-data');  // Require form-data to handle file uploads
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.set('view engine','ejs');                          //setting the value for a property which we use in html
app.set('views',path.join(__dirname,"views")); 
app.use(express.urlencoded());                         //used for the parser(adding/use some browse/usertype info into our page)
app.use(express.static('assets'));

//for image
const multer = require('multer'); // npm install express multer axios
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });


// app.get('/', (req, res) => {
//     return res.render('index',{                        //render uses when we want to use js objects in html file
//         title:"krishan",
//     });
// });
app.get('/', async(req, res)=>{
    try{
        return res.render('index',{})
    }catch(err){
        console.log("err in finding home",err)
        return;
    }
})

app.get('/prediction', async(req, res)=>{
    try{
        return res.render('prediction',{})
    }catch(err){
        console.log("err in finding prediction",err)
        return;
    }
})
app.get('/navigating', async(req, res)=>{
    try{
        return res.render('navigating',{})
    }catch(err){
        console.log("err in finding navigating",err)
        return;
    }
})
app.get('/contact', async(req, res)=>{
    try{
        return res.render('contact',{})
    }catch(err){
        console.log("err in finding contact",err)
        return;
    }
})
app.post('/predict', async (req, res) => {
    // console.log("qwertyuio");
    try {
        // console.log("123");
        const response = await axios.post('http://127.0.0.1:5000/predict4', {
            input: req.body.input
        });

        const prediction = response.data.prediction;
        // if(prediction<0.5){
        //   res.json(response.data);
        // }
        // else{
        //   res.json(prediction);
        // }
        // if(prediction == "infected"){
        //     return res.render('infected',{})
        //   }else{
        //     return res.render('healthy',{})
        //   }  
        res.json(response.data.prediction);
    } catch (error) {
        res.status(500).send('Error predicting');
    }
});

app.post('/upload', upload.single('ultrasound_image'), async (req, res) => {
    const filePath = req.file.path;
    const form = new FormData();
      form.append('file', fs.createReadStream(filePath));  // Make sure to append 'file'
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict2', form,
      {
        headers: {
          ...form.getHeaders(),
        },
      //   data: fs.createReadStream(filePath)
      });
    //   res.json(response.data);
      
      const prediction = response.data.prediction;
      console.log(prediction)
      if(prediction == "infected"){
        return res.render('infected',{})
      }else{
        return res.render('healthy',{})
      }
      res.send(`Prediction from model: ${prediction}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing the image.');
    } finally {
      fs.unlinkSync(filePath);  // Delete the file after processing
    }
  });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
