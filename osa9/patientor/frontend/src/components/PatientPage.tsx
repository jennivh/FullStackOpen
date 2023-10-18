import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patients from "../services/patients";
import {useEffect, useState } from "react";
import DiagnosisListItem from "./DiagnosisListItem";
import EntryInfo from "./EntryInfo";
import EntryForm from "./EntryForm";


const icon = (gender: Gender) => {
    if(gender === Gender.Female){
        return <FemaleIcon />;
    } else if(gender === Gender.Male){
        return <MaleIcon />;
    } else {
        return <TransgenderIcon />;
    }
};

interface StyleInterface {
    border: string;
    borderRadius: string;
    padding: string;
    margin: string;
}

interface Props {
    diagnosis: Diagnosis[];
}

const PatientPage = ({diagnosis} : Props) => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
   
    useEffect(() => {
        if(id !== undefined){
        patients.getPatient(id).then(p => setPatient(p));
        }
    }, [id]);

    if(id === undefined){ return <div>wrong id</div>;}
    if(patient === undefined){ return <div>No data</div>;}

   const style: StyleInterface = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 20px 5px 5px',
    margin: '5px'
   };

    return (
        <>
        <h2>{patient.name} {icon(patient.gender)}</h2>
        <p>date of birth: {patient.dateOfBirth}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>Add new entry:</h3>
        <EntryForm patient={patient} setPatient={setPatient} diagnosis={diagnosis}/>
        <h3>Entries</h3>
        {
            patient.entries?.map(e =>{
            return (
                <div style={style} key={e.id}>
               <EntryInfo entry={e} />
               <ul>
                { e.diagnosisCodes !== undefined
                    ? e.diagnosisCodes?.map(d => {
                        return(
                            <DiagnosisListItem key={d} diagnose={d} diagnosis={diagnosis} />
                        );
                    }) 
                    : ''
                }
                </ul>
                </div>
            );
            }
        )}
        </>
    );
};

export default PatientPage;