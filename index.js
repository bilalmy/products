const express = require('express')
const app = express()
const port = 3000
const product=require('./Routes/productRoute')
const cors=require('cors');
app.use(cors());
app.use(express.json());


app.use('/api/product',product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})