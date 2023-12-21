import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

import { popularJobs } from "../constants/dummy-data";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // console.log(options);
      // const response = await axios.request(options);
      // setData(response.data.results);
      setData(popularJobs);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("Error fetching data: ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
