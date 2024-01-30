import express from 'express';
import routes from './routes/apiRoutes';

const app = express();

// Mount routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

