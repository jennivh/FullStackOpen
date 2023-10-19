import { useState } from "react";
import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  NewBaseEntry,
  Patient,
} from "../types";
import patientService from "../services/patients";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

interface Props {
  patient: Patient;
  setPatient: (value: Patient) => void;
  diagnosis: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const EntryForm = ({ patient, setPatient, diagnosis }: Props) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [criteria, setCriteria] = useState("");
  const [rating, setRating] = useState('');
  const [dia, setDia] = useState<string[]>([]);
  const [message, setMessage] = useState('');
 
  const [start, setStart] = useState("");
  const [end, setEnd] = useState('');

  const formatDate = (date: Date) => {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const currentDate = () => {
    const date = new Date();
    return formatDate(date);
  };

  const [date, setDate] = useState(currentDate);
  const [dischargeDate, setDischargeDate] = useState(currentDate);

  const submitEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

        console.log(dia);
        const entry: NewBaseEntry = {
          date,
          description,
          specialist,
          diagnosisCodes: dia,
        };
      
      switch (type) {
        case "OccupationalHealthcare":
            const sickLeaveTrue = start.length>0 && end.length>0;
            const sickLeave = sickLeaveTrue ? { startDate: start, endDate: end } : undefined;
          const e: EntryWithoutId = {
            ...entry,
            type,
            employerName,
            sickLeave
          };
          const newEntry: Entry = await patientService.createEntry(
            e,
            patient.id
          );
          setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
          break;
        case "Hospital":
            const discharge =  {date: dischargeDate, criteria: criteria };
          const newestEntry: EntryWithoutId = {
            ...entry,
            type,
            discharge
          };
          const newE: Entry = await patientService.createEntry(
            newestEntry,
            patient.id
          );
          setPatient({ ...patient, entries: patient.entries.concat(newE) });
          break;
        case "HealthCheck":
            console.log(rating);
          const nE: EntryWithoutId = {
            ...entry,
            type,
            healthCheckRating:(rating !== '0' ? Number(rating) : 0) as HealthCheckRating
          };
          const newEntr: Entry = await patientService.createEntry(
            nE,
            patient.id
          );
          setPatient({ ...patient, entries: patient.entries.concat(newEntr) });
          break;
      }

      setDate(currentDate);
      setDescription("");
      setEmployerName("");
      setSpecialist("");
      setEnd("");
      setStart("");
      setType("");
      setCriteria("");
      setDia([]);
      setDischargeDate(currentDate);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setMessage(error.response?.data);
        setTimeout(() => {
            setMessage('');
        }, 5000);
      }
    }
  };



  const handleChange = (event: SelectChangeEvent<typeof dia>) => {
    const {
      target: { value }
    } = event;
    setDia(
      typeof value === 'string' ? value.split(',') : value
    );
    
   
  };

  return (
    <>
    <div style={{color: 'red'}}>{message}</div>
      <form onSubmit={submitEntry}>
        <div>
          <input
            type="radio"
            name="type"
            value="Hospital"
            onChange={(e) => setType(e.target.value)}
          />
          Hospital
          <input
            type="radio"
            name="type"
            value="HealthCheck"
            onChange={(e) => setType(e.target.value)}
          />
          HealthCheck
          <input
            type="radio"
            name="type"
            value="OccupationalHealthcare"
            onChange={(e) => setType(e.target.value)}
          />
          OccupationalHealthCare
        </div>
        { type !== '' && <div>
        <div>
          Date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Specialist{" "}
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
      <FormControl size='small' sx={{ m: 2, width: 250}}>
        <InputLabel id="demo-multiple-name-label">Diagnosis</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={dia}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis" />}
          MenuProps={MenuProps}
        >
          {diagnosis.map((d) => (
            <MenuItem
              key={d.code}
              value={d.code}
            >
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <div>
          Description{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {type === "OccupationalHealthcare" ? (
          <div>
            <Employer
              employerName={employerName}
              setEmployerName={setEmployerName}
            />
            <SickLeave
              start={start}
              end={end}
              setStart={setStart}
              setEnd={setEnd}
            />
          </div>
        ) : (
          "" )}
        {type === "HealthCheck" ? <HealthCheck setRating={setRating} /> : ""}
        {type === "Hospital" ? (
          <Hospital
            criteria={criteria}
            dischargeDate={dischargeDate}
            setCriteria={setCriteria}
            setDischargeDate={setDischargeDate}
          />
        ) : (
          ""
        )}
        </div>}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default EntryForm;

interface EmployerProps {
  employerName: string;
  setEmployerName: (value: string) => void;
}

const Employer = ({ employerName, setEmployerName }: EmployerProps) => {
  return (
    <div>
      Employer{" "}
      <input
        type="text"
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
      />
    </div>
  );
};

interface SickLeaveProps {
  start: string;
  setStart: (value: string) => void;
  end: string;
  setEnd: (value: string) => void;
}
const SickLeave = ({ end, start, setStart, setEnd }: SickLeaveProps) => {
  return (
    <>
      <p>Sick Leave:</p>
      <div>
        Start{" "}
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div>
        End{" "}
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
    </>
  );
};

interface HealthCheckProps {
  setRating: (value: string) => void;
}
const HealthCheck = ({ setRating }: HealthCheckProps) => {
  return (
    <div>
      <input
        type="radio"
        name="rating"
        value={0}
        onChange={(e) => setRating(e.target.value)}
      />
      Healthy
      <input
        type="radio"
        name="rating"
        value={1}
        onChange={(e) => setRating(e.target.value)}
      />
      Low risk
      <input
        type="radio"
        name="rating"
        value={2}
        onChange={(e) => setRating(e.target.value)}
      />
      High Risk
      <input
        type="radio"
        name="rating"
        value={3}
        onChange={(e) => setRating(e.target.value)}
      />
      Critical Risk
    </div>
  );
};

interface HospitalProps {
  dischargeDate: string;
  setDischargeDate: (value: string) => void;
  criteria: string;
  setCriteria: (value: string) => void;
}

const Hospital = ({
  dischargeDate,
  setDischargeDate,
  setCriteria,
  criteria,
}: HospitalProps) => {
  return (
    <>
      <p>Discharge info:</p>
      <div>
        Date{" "}
        <input
          type="date"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
      </div>
      <div>
        Criteria{" "}
        <input
          type="text"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        />
      </div>
    </>
  );
};
