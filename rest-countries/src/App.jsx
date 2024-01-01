import { useEffect, useState } from "react";
import axios from "axios";
import View from "./components/View";
import Form from "./components/Form";
import "./App.css";
import ContentList from "./components/ContentList";
import Weather from "./components/Weather";

function App() {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
  const [countries, setCountries] = useState([]);
  const [varSearch, setVarSeacrh] = useState("");
  const [showView, setShowView] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/all`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setVarSeacrh(e.target.value);
  };
  const countriesToShow =
    varSearch !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(varSearch.toLowerCase())
        )
      : countries;
  // console.log(countriesToShow[0].capital);
  // setCityName(countriesToShow[0].capital);

  // const cityName = countriesToShow[0].capital;

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=${api_key}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setCityWeather(res.data);
  //     });
  // }, []);

  const handleShowView = (country) => {
    // const countryData = countriesToShow.find((n) => n.name === name);
    setShowView(country);
  };

  return (
    <>
      <h1>Rest Countries</h1>
      <Form varSearch={varSearch} handleChange={handleChange} />
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          <>
            <View country={countriesToShow[0]} />
            <Weather country={countriesToShow[0]} />
          </>
        ) : (
          countriesToShow.map((country) => (
            <div>
              <ContentList country={country} handleShowView={handleShowView} />
              {showView === country.name.common ? (
                <View country={country} />
              ) : (
                ""
              )}
            </div>
          ))
        )}
        {showView !== "" ? <View country={showView} /> : ""}
      </div>
    </>
  );
}

export default App;
