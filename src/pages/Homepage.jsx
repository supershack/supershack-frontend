import { Link } from "react-router-dom";
//import Flower from "../components/Flower";
import CanvasComponent from '../components/flower/CanvasComponent';

const Homepage = () => {
  return (
    <>
      <div className="collectorCard-page">
        <CanvasComponent />
        <Link to={`/upload`}>
          <button className="buttonDefault starten">Starten</button>
        </Link>
      </div>
    </>
  );
};

export default Homepage;
