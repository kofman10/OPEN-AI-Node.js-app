const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageVariation = async (req, res) => {
   const  source = req.file;


  try {
    const response = await openai.createImageVariation( 
        fs.createReadStream(source.path),
        1,
        "1024x1024",
        
    );

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be varied',
    });
  }
};

module.exports = { imageVariation };