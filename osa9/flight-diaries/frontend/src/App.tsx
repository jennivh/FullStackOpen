import { useEffect, useState } from 'react';
import React from 'react';
import { Diary, NewDiaryEntry } from './types';
import Form from './components/Form';
import diariesService from './services/diariesService';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, setMessage] = useState<string>('');

 
  useEffect(() => {
    diariesService.getDiaries()
    .then( d => setDiaries(d));
  }, []);

  const addDiary = async (diary : NewDiaryEntry) => {
    try{
    const newDiary = await diariesService.createDiary(diary);
    setDiaries(diaries.concat(newDiary));
    }catch(error){
      if(axios.isAxiosError(error)){
      setMessage(error.response?.data);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
    }
  };

  const divStyle = {
    color : 'red'
  };
  
  return (
    <>
    <div style={divStyle}>{message}</div>
    <h1>Diaries</h1>
    <Form addDiary={addDiary}/>
    <ul>
    {diaries.map( d => {
      return (
          <li key={d.date}>{d.date} {d.weather} </li>
      );
    })}
    </ul>
    </>
  );
}

export default App;
