const express = require('express');
const app = express();
const { initDb, getDb } = require('./database/dbConnect');
const routes = require('./routes');
const { getAllApostles } = require('./controllers/apostleController');
require('dotenv').config();
const cors = require('cors');

//possibly need
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { validateCreateApostle, validateAllApostles } = require('./middleware/routeValidation');

//localhost
const port = process.env.PORT || 8080;

// CORS setup
app.use(cors());

//Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Apostle API. Try /apostles for apostles.');
});

app.get('/apostles', validateAllApostles, async (req, res) => {
  try {
    const db = getDb();
    const apostleCollection = await db.collection('apostles');

    //Fetch all from apostles collection
    const apostle = await apostleCollection.find({}).toArray();

    //Response
    res.status(200).json({ message: 'Apostles retrieved successfully', apostle, });
  } catch (error) {
    console.error('Error retrieving apostles', error.message, error.stack);
    res.status(500).json({ message: 'Test DB error', error: error.message });
  }
});

app.post('/apostles', validateCreateApostle, async (req, res) => {
    try {
        const db = getDb();
        const apostlesCollection = db.collection('apostles');

        /*// Validate incoming data
        const { firstName, lastName, age, profession } = req.body;
        if (!firstName || !lastName) {
          return res.status(400).json({ error: 'firstName and lastName are required' });
        }*/

       // Create the document to insert
        const newApostle = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          profession: req.body.profession,
          createdAt: new Date(),
        };

        // Insert the document
        const result = await apostlesCollection.insertOne(newApostle);

        // Respond with the created resource
        res.status(201).json({
          message: 'Apostle created successfully',
          apostle: { _id: result.insertedId, ...newApostle },
        });
    } catch (error) {
        console.error('Create Apostle error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create apostle', details: error.message });
    }
});

app.use('/', routes);

(async () => {
  try {
    await initDb();
    console.log('Database initialized');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
})();