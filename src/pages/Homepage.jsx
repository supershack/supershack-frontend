import { Link } from "react-router-dom";

const Homepage = () => {
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
