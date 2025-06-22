const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid') //destructuring 
const auth = require('../auth')

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route /api/
router.get('/', (req, res) => {
  res.send(`Welcome to the Product API!  Go to /api/products to see all products.`);
});


// for GET /api/products  /api/products
router.get('/products',auth, (req, res) => {
  res.json(products);
});



//GET specific product
router.get('/products/:id',  (req,res)=>{
  const id = req.params.id
  const product = products.find((product)=>{
    return product.id === id;
  })
  if (!product){
    return res.status(404).send({message: "sorry! we couldn't find the product"});
  }
  else {
    return res.status(200).send(product)
  }
})

// POST /api/products - Create a new product
router.post('/products', (req, res)=>{
  const {name, description, price, category, inStock} = req.body;

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    }
    products.push(newProduct)
    res.status(201).send({message: "product successfully created", product: newProduct})
  }
)

// /api/products/:id - Update a product

router.put('/products/:id', (req, res)=>{
  const id = req.params.id
  const product = products.find((product)=>{
    return product.id === id
  })
  if (!product) {
    return res.status(404).send('product not found')
  }
  else{
    const {name, description, price, category, inStock} = req.body;
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (typeof inStock !== Boolean) product.inStock = inStock;

    return res.status(200).json({message: 'successfully updated!', product: product})
}
})


// DELETE /api/products/:id - Delete a product
router.delete('/products/:id', (req, res)=>{
  const id = req.params.id
  const product = products.find(product=>product.id === id)
  if (!product){
    res.status(404).json({message:"unable to locate product"})
  }
  else{
    const productIndex = products.findIndex(product=>product.id === id)
    if (productIndex == -1) return res.status(404).send('No matching id')
    const deletedproducts = products.splice(productIndex, 1)
    //console.log(deletedproducts)
    res.status(200).send(`{message: productID:${product.id}: Successfully Removed, product: ${products}}`)
  }
})
// ,TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling


router.get('/products/:page1', ()=>{
  const {page=1, limit=5} = req.query()
  console.log(page)
})


//  Search products by name
router.get('/products/search/:keyword', (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  const results = products.filter(product =>
    product.name.toLowerCase().includes(keyword)
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No products match your search." });
  }

  res.status(200).json(results);
});


// Get product statistics by category
router.get('/products/stats/category', (req, res) => {
  const stats = {};

  products.forEach(product => {
    const category = product.category;
    stats[category] = (stats[category] || 0) + 1;
  });

  res.status(200).json(stats);
});


module.exports = router;