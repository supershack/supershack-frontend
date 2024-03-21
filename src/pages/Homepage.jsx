import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [records, setRecords] = useState(null)

  const getAllRecords = () => {
    axios.get("http://localhost:3000/api/records")
      .then(response => {
        setRecords(response.data.records)
        //console.log(response.data.records)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllRecords()
  }, [])

  return (
    <>
      <div>
        <h1>Guess Your Job Match</h1>
        <Link to={`/upload`}>Upload Image</Link>
      </div>
    </>
  );
};

export default Homepage;
