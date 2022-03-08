import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Container from "../Components/ui/Container";
import config from "../config";

export default function SatellitePage() {
  const [startDate, setStartDate] = useState(new Date("01/01/2021"));
  const [loadingData, setLoadingdata] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [requestNewDate, setRequestNewDate] = useState(false);

  // set initial state using api response
  useEffect(async () => {
    const url = "https://api.nasa.gov/planetary/earth/assets";
    const location = "lon=100.75&lat=1.5";
    const date = handleDate();
    const dim = 0.15;
    const apiKey = config.api.NASA;

    console.log(date);
    // fetch data from api
    const response = await fetch(
      `${url}?${location}&date=${date}&dim=${dim}&api_key=${apiKey}`
    );
    const dataResult = await response.json();
    console.log(dataResult);

    // set state if data is recieved
    if (dataResult) {
      setLoadingdata(false);
      setApiData(dataResult);
    }
  }, [requestNewDate]);

  // get a satellite image of a different day
  function handleSubmit() {
    const date = handleDate();
    setRequestNewDate(true);
    console.log("new date requested: ", date);
  }
  // configure the date
  function handleDate() {
    const day = "01";
    const month =
      startDate.getUTCMonth() < 9
        ? "0" + (startDate.getUTCMonth() + 1)
        : startDate.getUTCMonth() + 1;
    const year = startDate.getFullYear();

    const formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  if (loadingData) {
    return (
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h3 data-testid="loading">Loading data from api...</h3>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <h3>
          Select a a month and year to get a satellite image over your location.
        </h3>
        <div className="d-flex m-2">
          <DatePicker
            className="text-center btn btn-secondary"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            maxDate={new Date("01/01/2021")}
            showMonthYearPicker
            showYearDropdown
            scrollableYearDropdown
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="card my-3">
        <img
          data-testid="url"
          src={apiData.url}
          className="card-img-top"
          alt="Astronomy picture of the day"
        />
        <p className="card-text">
          <small className="text-muted" data-testid="date">
            Date | {apiData.date}
          </small>
        </p>
      </div>
    </Container>
  );
}
