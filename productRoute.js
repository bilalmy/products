const express = require('express')
const app = express()
const mongoose=require('mongoose');
const connect=require('../mongoconnect/db');
app.use(express.json());
const Product=require('../Models/products')
const cors=require('cors');
app.use(cors());
const router = express.Router();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

router.post('/add', async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({
    name,
    price,
    description
  });

  try {
    await product.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { name, price, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: { name, price, description }
    });

    if (updatedProduct) {
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id=req.params.id;
  const product=await Product.findOneAndDelete({id});
  if(product)
  {
    res.send('Deleted Succesafully!');
  }
  else if(!product)
  {
    res.send('Not Found!');
  }
  else
  {
    res.send('Cannot delete at this time');
  }
  })
  
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
  
    try {
      await Product.findByIdAndUpdate(id, { name, price, description });
      res.status(200).send({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error updating product', error });
    }
  });
  
  router.get('/get', async (req, res) => {
    const product=await Product.find();
    if(product)
    {
      res.json(product);
    }
    else if(!product)
{
  res.send('No record found')
}
else
    res.send('Cannot respond at this time')
  })

  router.get('/get/:id', async (req, res) => {
    const id=req.params.id;
    const product=await Product.findById(id);
    if(product)
    {
      res.json(product);
    }
    else if(!product)
{
  res.send('No record found')
}
else
    res.send('Cannot respond at this time')
  })


  //cookies Lab
  router.get('/setname',async(req,res)=>
  {
    res.cookie('name','Ali')
    res.send('Cookies sended');
  })

  router.get('/getname',(req,res)=>
  {
    res.json(req.cookies);
    console.log("req.cookies")
  })
  module.exports = router;