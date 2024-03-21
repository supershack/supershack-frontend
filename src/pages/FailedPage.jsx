import { Link, useLocation } from 'react-router-dom';

function FailedPage() {

    const location = useLocation();
    const errorMessage = location.state?.errorMessage;

    return (
        <div>
            {errorMessage
                ? (
                    <>
                        <h1>Error uploading the file</h1>
                        <h3>Description:</h3>
                        <p>{errorMessage}</p>
                    </>
                )
                : null}
            <Link to={`/upload`}>Try again</Link>
        </div>
    )
}

export default FailedPage