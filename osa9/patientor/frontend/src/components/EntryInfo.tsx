import { Entry, HealthCheckRating } from "../types";
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

const health = (health : HealthCheckRating) => {
    switch(health){
        case HealthCheckRating.Healthy:
            return {background: 'green'};
        case HealthCheckRating.LowRisk:
            return {background: 'yellow'};
        case HealthCheckRating.HighRisk:
            return {background: 'orange'};
        case HealthCheckRating.CriticalRisk:
            return {background: 'red'};
    }
};

const EntryInfo = ({entry} : {entry : Entry}) => {

    switch(entry.type){
        case 'Hospital':
            return(
                <>
                <p>{entry.date} <LocalHospitalRoundedIcon/></p>
                <p>{entry.description}</p>
                <p>Discharge info: {entry.discharge.date}  {entry.discharge.criteria}</p>
                </>
            );
        case 'HealthCheck':
            return(
                <>
                <div >{entry.date} <CheckBoxRoundedIcon style={health(entry.healthCheckRating)}/></div>
                <p>{entry.description}</p>
                </>
            );
        case 'OccupationalHealthcare':
            return(
                <>
                <p>{entry.date} <WorkRoundedIcon/> {entry.employerName}</p>
                <p>{entry.description}</p>
                <p>diagnose by {entry.specialist}</p>
                <p>Sickleave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p>
                </>
            );
    }
};
export default EntryInfo;