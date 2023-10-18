import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from "../constants";


const getDiagnosis = async() => {
    const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return response.data;
};

export default { getDiagnosis };