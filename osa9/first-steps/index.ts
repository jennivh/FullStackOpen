import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)){
        res.status(400).send({ error : 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    res.json({height, weight, bmi});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises: exercises, target} = req.body;

    console.log('daily exercises', exercises);
    if(!target || !exercises){
        res.status(400).send({ error : 'parameters missing' });
    }

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, 
    @typescript-eslint/no-unsafe-member-access, 
    @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-explicit-any */
    const numberEx: number[] = exercises.map((e: any) => Number(e));

    if (isNaN(Number(target)) || numberEx.includes(NaN)){
        res.status(400).send({ error : 'malformatted parameters'});
    }

    res.json(exerciseCalculator(numberEx, Number(target)));

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});