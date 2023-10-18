import { useState } from "react";
import {Entry, EntryWithoutId, HealthCheckRating, NewBaseEntry, Patient } from "../types";
import patientService from "../services/patients";
import axios from "axios";

interface Props {
    patient: Patient;
    setPatient: (value: Patient) => void;
}

const EntryForm = ({ patient, setPatient} : Props) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [employerName, setEmployerName] = useState('');
    //const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
    const [criteria, setCriteria] = useState('');
    const [rating , setRating] = useState('');
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    
    
    const formatDate = (date: Date) => {
        let month = (date.getMonth()+1).toString();
        let day = date.getDate().toString();
     
        if(month.length === 1){ month = '0'+month;}
        if(day.length === 1){ day = '0'+day;}
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const currentDate = () => {
        const date = new Date();
        return formatDate(date);
    };

  
    const [end, setEnd] = useState(currentDate);
    const [dischargeDate, setDischargeDate] = useState(currentDate);

    const submitEntry = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
        //const diagnosis = diagnosisCodes?.map( d => d.code);
        const entry: NewBaseEntry = {date, description, specialist};
        switch(type){
            case 'OccupationalHealthcare':
                const e : EntryWithoutId = {
                    ...entry,
                    type,
                    employerName,
                    sickLeave: {startDate: start, endDate: end}
                };
                const newEntry: Entry =  await patientService.createEntry(e, patient.id);
                setPatient({ ...patient, entries: patient.entries.concat(newEntry)});
              break;
            case 'Hospital':
                const newestEntry : EntryWithoutId = {
                    ...entry,
                    type,
                   discharge: {date: dischargeDate, criteria: criteria}
                };
                const newE: Entry =  await patientService.createEntry(newestEntry, patient.id);
                setPatient({ ...patient, entries: patient.entries.concat(newE)});
                break;
            case 'HealthCheck':
                const nE : EntryWithoutId = {
                    ...entry,
                    type,
                    healthCheckRating: Number(rating) as HealthCheckRating
                };
                const newEntr: Entry =  await patientService.createEntry(nE, patient.id);
                setPatient({ ...patient, entries: patient.entries.concat(newEntr)});
                break;
        }
        
        setDate(currentDate);
        setDescription('');
        setEmployerName('');
        setSpecialist('');
        setEnd('');
        setStart('');
        setType('');
        setCriteria('');
        //setDiagnosisCodes([]);
        setDischargeDate(currentDate);

        } catch(error: unknown){
            if(axios.isAxiosError(error)){
                console.log(error);
            }
        }
    };

    return(
        <>
        <form onSubmit={submitEntry}>
            <div><input type="radio" name='type' value='Hospital' onChange={e => setType(e.target.value)}/>Hospital
            <input type="radio" name='type' value='HealthCheck' onChange={e => setType(e.target.value)}/>HealthCheck
            <input type="radio" name='type' value='OccupationalHealthCare' onChange={e => setType(e.target.value)}/>OccupationalHealthCare
            </div>
            <div>Date  <input type="date" value={date} onChange={e => setDate(e.target.value)}/></div>
            <div>Specialist  <input type="text" value={specialist} onChange={e => setSpecialist(e.target.value)}/></div>
            <div>Description  <input type="text" value={description} onChange={e => setDescription(e.target.value)}/></div>
            {type === 'OccupationalHealthCare' 
            ? <div><Employer employerName={employerName} setEmployerName={setEmployerName}/> 
              <SickLeave start={start} end={end} setStart={setStart} setEnd={setEnd} /></div>
            : ''}
            {type === 'HealthCheck' ? <HealthCheck setRating={setRating} /> : ''}
            {type === 'Hospital' 
            ? <Hospital criteria={criteria} dischargeDate={dischargeDate} setCriteria={setCriteria} setDischargeDate={setDischargeDate} />
            : ''}
            <button type="submit">submit</button>
        </form>
        </>
    );
};

export default EntryForm;

interface EmployerProps {
    employerName: string;
    setEmployerName: (value : string) => void;
}

const Employer = ({employerName, setEmployerName}: EmployerProps) => {
    return(
        <div>Employer  <input type="text" value={employerName} onChange={e => setEmployerName(e.target.value)}/></div>
    );
};

interface SickLeaveProps {
    start: string;
    setStart: (value: string) => void;
    end: string;
    setEnd: (value: string) => void;
}
const SickLeave = ({end, start, setStart, setEnd} : SickLeaveProps) => {
    return(
        <>
        <p>Sick Leave:</p>
        <div>Start <input type="date" value={start} onChange={e => setStart(e.target.value)}/></div>
        <div>End <input type="date" value={end} onChange={e => setEnd(e.target.value)}/></div>
        </>
    );
};

interface HealthCheckProps{
    setRating: (value: string) => void
}
const HealthCheck = ({setRating} : HealthCheckProps) => {
    return(
        <div>
            <input type="radio" name='rating' value={0} onChange={e => setRating(e.target.value)}/>Healthy
            <input type="radio" name='rating' value={1} onChange={e => setRating(e.target.value)}/>Low risk
            <input type="radio" name='rating' value={2} onChange={e => setRating(e.target.value)}/>High Risk
            <input type="radio" name='rating' value={3} onChange={e => setRating(e.target.value)}/>Critical Risk
        </div>
    );
};

interface HospitalProps {
    dischargeDate: string,
    setDischargeDate: (value: string) => void,
    criteria: string,
    setCriteria: (value: string) => void
}

const Hospital = ({dischargeDate, setDischargeDate, setCriteria, criteria} : HospitalProps) => {
    return (
        <>
        <p>Discharge info:</p>
        <div>Date <input type="date" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)}/></div>
        <div>Criteria <input type="text" value={criteria} onChange={e => setCriteria(e.target.value)} /></div>
        </>
    );
};