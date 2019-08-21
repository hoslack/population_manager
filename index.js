const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_DB_URI, { useCreateIndex: true,  useNewUrlParser: true  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

app.use('/api', apiRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send({
    message: "Hello World"
  })
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));

module.exports = app;
