import axios from 'axios';
import { Diary, NewDiaryEntry } from '../types';

const baseUrl: string = 'http://localhost:3000/api/diaries';

const getDiaries = () => {
   const request = axios.get<Diary[]>(baseUrl);
    return request.then(response => response.data);
    
};

const createDiary = async (object: NewDiaryEntry) => {
    
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;

};

export default {getDiaries, createDiary};