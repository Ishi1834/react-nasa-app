import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Container from "../Components/ui/Container";
import config from "../config";
import Loading from "../Components/Loading";

export default function SatellitePage() {
  const [startDate, setStartDate] = useState(new Date("01/01/2021"));
  const [loadingData, setLoadingdata] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [requestNewDate, setRequestNewDate] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [location, setLocation] = useState("lon=100.75&lat=1.5");

  // set initial state using api response
  useEffect(() => {
    // make a function that get gps location
    function getLocation() {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation(
          `lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        );
      });
    }
    getLocation();

    const url = "https://api.nasa.gov/planetary/earth/assets";
    const date = handleDate();
    const dim = 0.15;
    const apiKey = config.api.NASA;

    // fetch data from api
    const fetchData = async () => {
      const data = await fetch(
        `${url}?${location}&date=${date}&dim=${dim}&api_key=${apiKey}`
      ).then((res) => res.json());

      // set loading state and display content if data is recieved
      if (data) {
        if (data.msg === "No imagery for specified date.") {
          setLoadingdata(false);
          setDisplayErrorMessage(true);
          console.log("No imagery for specified date.");
        } else {
          setLoadingdata(false);
          setApiData(data);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestNewDate]);

  // get a satellite image of a different day
  function handleSubmit() {
    setLoadingdata(true);
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
    return <Loading />;
  }
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <h3 className="text-center">
          Select a a month and year to get a satellite image over your location.
        </h3>
        <p>
          The satellite passes over each point on earth roughly once every
          sixteen days.
        </p>
        <div className="d-flex m-2">
          <DatePicker
            className="text-center btn btn-secondary"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={new Date("01/01/2021")}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            closeOnScroll={true}
          />
        </div>
        {displayErrorMessage ? (
          <h5 className="text-danger">specified data could not be found</h5>
        ) : null}
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
        <p className="card-text mt-2">
          <small className="text-muted " data-testid="date">
            Date of capture | {apiData.date}
          </small>
        </p>
      </div>
    </Container>
  );
}
