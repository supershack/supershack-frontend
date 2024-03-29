import { Link } from "react-router-dom";
//import Flower from "../components/Flower";
import CanvasComponent from '../components/flower/CanvasComponent';

const Homepage = () => {
  return (
    <>
      <div>
      <CanvasComponent /> 
        <h1>Guess Your Job Match</h1>
        <Link to={`/upload`}>Upload Image</Link>
      </div>
    </>
  );
};

export default Homepage;
