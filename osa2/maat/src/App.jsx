/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import countriesService from "./services/countriesService";
import weatherService from "./services/weatherService";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <div>
        find countries
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
      </div>
      <Countries filter={filter} countries={countries} />
    </>
  );
};

const Countries = ({ filter, countries }) => {
  const findMatching = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  ).length;

  if (findMatching < 10 && findMatching > 1) {
    return (
      <div>
        {countries
          .filter((c) =>
            c.name.common.toLowerCase().includes(filter.toLowerCase()) ? c : ""
          )
          .map((c) => {
            return (
              <div key={c.name.common}>
                <CountryInfo country={c} />
              </div>
            );
          })}
      </div>
    );
  } else if (findMatching == 1) {
    return (
      <>
        <Country
          country={countries.find((c) =>
            c.name.common.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </>
    );
  } else {
    return <>too many matches, spesify another filter</>;
  }
};

const CountryInfo = ({ country }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState({});
  useEffect(() => {
    weatherService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((response) => {
        setWeather(response.data);
        console.log(weather)
      });
  }, []);

  const handleClick = () => setShow(!show);

  return (
    <>
      <div>
        {country.name.common} <button onClick={handleClick}>show</button>
      </div>
      {show ? <Country country={country} weather={weather} /> : ""}
    </>
  );
};

const Country = ({ country, weather }) => {
 
  console.log(weather)
  const languages = Object.values(country.languages);
  const icon = ` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  console.log(icon)

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages</b>
      <ul>
        {languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.main.temp}</p>
      <img src={icon} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};
export default App;
