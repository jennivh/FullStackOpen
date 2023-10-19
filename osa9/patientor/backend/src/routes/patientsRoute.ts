
import express from "express";
import patientsService from "../services/patientsService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientsService.getPatient(id));
});

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.send(addedPatient);
    } catch(error: unknown){
        let errorM = 'something went wrong';
        if(error instanceof Error){
            errorM = errorM + 'Error' + error.message;
        }
        res.status(400).send(errorM);
    }
});

router.post('/:id/entries', (req, res) => {
    try{
        const newEntry = toNewEntry(req.body);
        console.log(newEntry);
        const entries = patientsService.addEntry(req.params.id, newEntry);
        res.send(entries);
    } catch(error){
        let errorM = 'something went wrong';
        if(error instanceof Error){
            errorM = errorM + 'Error' + error.message;
        }
        res.status(400).send(errorM);
    }

});

export default router;
