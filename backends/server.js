const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const productsData = {
    "electronics": [
        { id: 1, name: "Smartphone", price: 699, rating: 4.5, company: "CompanyA" },
        { id: 2, name: "Laptop", price: 1299, rating: 4.7, company: "CompanyB" },
    ],
    "clothing": [
        { id: 3, name: "Jeans", price: 49, rating: 4.1, company: "CompanyC" },
        { id: 4, name: "T-shirt", price: 19, rating: 4.3, company: "CompanyD" },
    ]
    
};
app.get('/categories/:categoryname/products', (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sortBy = 'rating', order = 'desc' } = req.query;
    
    if (!productsData[categoryname]) {
        return res.status(404).send({ error: 'Category not found' });
    }

    let products = productsData[categoryname];
    products = products.sort((a, b) => order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);

    const start = (page - 1) * n;
    const end = start + parseInt(n);

    res.send(products.slice(start, end));
});
app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { categoryname, productid } = req.params;
    
    if (!productsData[categoryname]) {
        return res.status(404).send({ error: 'Category not found' });
    }

    const product = productsData[categoryname].find(p => p.id == productid);

    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}`);
});
