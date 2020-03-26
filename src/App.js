import React, {useState} from 'react';
const api = {
  key: 'cecdfdd1e201a0dace22817d40f14528',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder=(e)=>{
    let months = ['Styczeń', "Luty", "Marzec", "Kwiecień", "Maj", "CZerwiec", "Lipiec", "Sierpień", "Wrzesień", "Pażdziernik", "Listopad", "Grudzień"];
    let days = ["Poniedziałek", "Wtorek", "Środa", "CZwartek", "Piątek", "Sobota", "Niedziela"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="wyszukaj..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined')?(
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)} &#176;C
          </div>
          <div className="weather">
            {/* {weather.weather[0].main} */}
          </div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
