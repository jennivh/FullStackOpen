import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;


const getPatients = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map( ({id, name, gender, occupation, dateOfBirth}) => 
    ({ id, name, gender, occupation, dateOfBirth}));
};

const addPatient = (patient: NewPatient) : Patient => {
        const id= uuid();
        const newPatient: Patient = {
            id,
            ...patient
        };

        patients.push(newPatient);
        return newPatient;

};

const addEntry = (patientId: string, entry: EntryWithoutId) : Entry => {
    const id = uuid();
    const newEntry: Entry = {
        id,
        ...entry
    };
    const patientToChange = patients.find(p => p.id === patientId);
    if(!patientToChange){ throw new Error('patient not found');}

    patientToChange.entries.push(newEntry);
    
    return newEntry;
};
export default { getPatients, getNonSensitivePatients, addPatient, getPatient, addEntry };
