import { useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined)

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

  return (
    <>
      <div>
        <h1>Guess Your Job Match</h1>
        <form className='image' onSubmit={handleSubmit}>
          <input id='input' type="file" onChange={handleFileChange} />
          <button id='image' type="submit">Upload</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Homepage;
