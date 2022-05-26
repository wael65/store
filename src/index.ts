import express from 'express';

// create instant server
const app = express();

const port = 3000;

// add routing for / path
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍',
  })
})


// start express server
app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
    });
    

export default app
