import { Diagnosis } from "../types";

interface Props {
    diagnose: string;
    diagnosis: Diagnosis[];
}

const DiagnosisListItem = ({diagnose, diagnosis}: Props) => {

    const d = diagnosis.find(di => di.code === diagnose);

    return (
        <li >{diagnose} {d?.name}</li>
    );
};

export default DiagnosisListItem;