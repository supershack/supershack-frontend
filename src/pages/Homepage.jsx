import { Link } from "react-router-dom";
import Flower from "../components/Flower";

const Homepage = () => {
  return (
    <>
      <div>
      <Flower /> 
        <h1>Guess Your Job Match</h1>
        <Link to={`/upload`}>Upload Image</Link>
      </div>
    </>
  );
};

export default Homepage;
