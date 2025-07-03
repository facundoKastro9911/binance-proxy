const express = require('express');
const { fetch } = require('undici');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de Binance' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
