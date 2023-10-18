import express from 'express';
import diagnosesRouter from './routes/diagnosesRoute';
import patientsRouter from './routes/patientsRoute';
import cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('ping pong');
    res.send('pong');
});

app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen( PORT, () => {
    console.log(`app listening on port ${PORT}`);
    
});