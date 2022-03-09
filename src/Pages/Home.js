import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Components/Loading";
import Container from "../Components/ui/Container";
import config from "../config";

export default function HomePage() {
  const [startDate, setStartDate] = useState(new Date());
  const [loadingData, setLoadingdata] = useState(true);
  const [apiData, setApiData] = useState([]);

  // use effect to only run the code once
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${config.api.NASA}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Not successful");
        }
      })
      .then((data) => {
        console.log(data);
        setLoadingdata(false);
        setApiData(data);
      });
  }, []);

  // get a different day
  function getNewDate(date) {
    console.log("requested", date);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${config.api.NASA}&date=${date}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Not successful");
          return apiData;
        }
      })
      .then((data) => {
        setApiData(data);
      });
  }
  // sorts date and calls the api function
  function handleRequest() {
    const day =
      startDate.getDate() < 10
        ? "0" + startDate.getDate()
        : startDate.getDate();
    const month =
      startDate.getUTCMonth() < 9
        ? "0" + (startDate.getUTCMonth() + 1)
        : startDate.getUTCMonth() + 1;
    const year = startDate.getFullYear();

    //console.log(startDate);
    const formattedDate = year + "-" + month + "-" + day;
    getNewDate(formattedDate);
  }
  if (loadingData) {
    return <Loading />;
  }
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <h3>Select the date from below to view the image of the day.</h3>

        <div className="d-flex m-2">
          <DatePicker
            className="text-center btn btn-secondary"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
          />
        </div>
        <button className="btn btn-primary" onClick={handleRequest}>
          Submit
        </button>
      </div>
      <div className="card my-3">
        <img
          data-testid="url"
          src={apiData.hdurl}
          className="card-img-top"
          alt="Astronomy picture of the day"
        />
        <div className="card-body">
          <h5 className="card-title text-center" data-testid="title">
            {apiData.title}
          </h5>
          <p className="card-text" data-testid="explanation">
            {apiData.explanation}
          </p>
          <p className="card-text">
            <small className="text-muted" data-testid="date">
              Date | {apiData.date}
            </small>
          </p>
        </div>
      </div>
    </Container>
  );
}
