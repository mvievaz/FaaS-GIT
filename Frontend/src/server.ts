import express from 'express';
import apiRoutes from './routes/apiRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});