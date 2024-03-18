import { useEffect, useState } from "react";
import axios from "axios";
import CollectorCard from "../component/CollectorCard";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [records, setRecords] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setErrorMessage(undefined)
      })
      .catch((error) => {
        console.error(error);
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      });
  };

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
        <CollectorCard />
        <form onSubmit={handleSubmit}>
          <input id='input' type="file" onChange={handleFileChange} />
          <button id='image' type="submit">Upload</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Homepage;
