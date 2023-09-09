const express = require('express');
const app = express();
const books = require('./routers/books')

const PORT = process.env.PORT ?? 3001

//milddelwares
app.use(express.json())

//Rutas
app.use('/books', books)

// activar Puerto(Listening)
app.listen(PORT,()=>{
    console.log('Server on PORT: '+PORT);
});

// module.exports = express;