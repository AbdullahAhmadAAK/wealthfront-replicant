const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.yqfwnyh.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const infoStockSchema = new mongoose.Schema({
  riskScore: Number,
  nigerianStocks: Number,
  alternative: Number,
  commodities: Number,
  emergingStocks: Number,
  foreignBonds: Number,
  foreignStocks: Number,
  nigerianBonds: Number,
  realEstate: Number,
  tBills: Number,
  techStocks: Number
}) 

const stocksNameSchema = new mongoose.Schema({
  key: String,
  name: String
}) 

const infoStock = mongoose.model('data_stock', infoStockSchema);
const stockName = mongoose.model('stocks_name', stocksNameSchema);

app.get('/stocks', async (req, res) => {
  const stocksData = await infoStock.find();
  res.json(stocksData);
}) 

app.get('/stockNames', async (req, res) => {
  const stocksNames = await stockName.find();
  res.json(stocksNames)
})