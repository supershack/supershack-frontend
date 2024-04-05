import { Link, useLocation } from 'react-router-dom';
import objectFour from "../images/object-3.png"

function FailedPage() {

    const location = useLocation();
    const errorMessage = location.state?.errorMessage;

    return (
        <div className="defaultPage-container">
            <img src={objectFour} alt="failedImage" className='objectFour-image' />
            <div className="textContainer failed">
                <p className="analysingText">FEHLER</p>
                <p className="textTop failed">Schicksal konnte nicht gefunden werden...</p>
            </div>
            <hr />
            <div className="textContainer failed">
                <p className="textSmall">Probiere es mit einem Foto, dass....</p>
                <br />
                {errorMessage
                    ? (
                        <p className="textTop">{errorMessage}</p>
                    )
                    : null}
            </div>
            <Link to={`/upload`}>
                <button className="buttonDefault">Erneut versuchen</button>
            </Link>
        </div>
    )
}

export default FailedPage