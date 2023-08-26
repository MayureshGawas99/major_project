import React, { useContext, useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import { useNavigate } from "react-router-dom";
import { getUserFromEmail, selectData } from "../firebaseconfig/CRUD";
import { MapContext } from "../App";
import Footer from "../components/Footer";
import axios from "axios";

export default function HomePage() {
  const { cords, setCords, time, setTime } = useContext(MapContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/cords/fetchcords`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          const { lat, lng } = response.data.cords;
          let newCords = { lat: lat, lng: lng };
          setCords((cords) => [...cords, newCords]);
          // console.log(cords);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    // Function to update the time remaining
    const updateRemainingTime = () => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 120)); // Reset to 2 minutes if time is up
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 2 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 120000); // 2 minutes in milliseconds

    // Set up an interval to update the time remaining every second
    const timeIntervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    // Clean up intervals when the component unmounts
    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2 className="text-center">Live Location {cords.length}</h2>
      {/* <div>
        <h1>Data Fetcher</h1>
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(cords, null, 2)}</pre>
        </div>
        <div>
          <p>Time remaining for the next fetch: {time} seconds</p>
        </div>
      </div> */}
      <button
        onClick={() => {
          let newCords = cords.concat([{ lat: 15, lng: 20 }]);
          setCords(newCords);
          console.log(cords);
        }}
      >
        add
      </button>

      {/* {cords.length !== 0 && <GoogleMap />} */}
      <Footer />
    </div>
  );
}
