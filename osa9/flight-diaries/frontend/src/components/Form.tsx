import React, { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface Props {
    addDiary: (diary: NewDiaryEntry) => void;
}

const Form = ({addDiary}: Props) => {
    
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');

    const formatDate = (date: Date) => {
        console.log(date.toISOString());
        let month = (date.getMonth()+1).toString();
        console.log(date.getMonth());
        if(month.length === 1){ month = '0'+month;}

        let day = date.getDate().toString();
        console.log(date.getDate()); 
        if(day.length === 1){ day = '0'+day;}

        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const currentDate = () => {
        const date = new Date();
        console.log(date);
        console.log(date.getTime());
        console.log(date.getDay());
        
        return formatDate(date);
    };

    const [date, setDate] = useState(currentDate);

    const submitDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addDiary({date, weather: weather as Weather, visibility: visibility as Visibility, comment});
        setComment('');
        setDate(currentDate);
        setWeather('');
        setVisibility('');
    };
    return (
        <>
        <form onSubmit={submitDiary}>
        <div>
            Date
            <input
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            />
        </div>
        <div>
            Weather
            <input type="radio" value='sunny' onChange={(e) => setWeather(e.target.value)} />sunny
            <input type="radio" value='rainy' onChange={(e) => setWeather(e.target.value)}/>rainy
            <input type="radio" value='cloudy' onChange={(e) => setWeather(e.target.value)}/>cloudy
            <input type="radio" value='stormy' onChange={(e) => setWeather(e.target.value)}/>stormy
            <input type="radio" value='windy' onChange={(e) => setWeather(e.target.value)}/>windy
        </div>
        <div>
            Visibility
            <input type="radio" value="great" onChange={(e) => setVisibility(e.target.value)} />great
            <input type="radio" value="good" onChange={(e) => setVisibility(e.target.value)} />good
            <input type="radio" value="ok" onChange={(e) => setVisibility(e.target.value)} />ok
            <input type="radio" value="poor" onChange={(e) => setVisibility(e.target.value)} />poor
        </div>
        <div>
            Comment
            <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            />
        </div>
            <button type='submit'>Submit</button>
        </form>
        </>
    );
};

export default Form;


