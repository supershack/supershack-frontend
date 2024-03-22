import CollectorCard from "../components/CollectorCard";
import { useLocation } from 'react-router-dom';

function CollectorCardPage() {

    const location = useLocation();
    const uploadedImage = location.state?.uploadedImage
    const jobData = location.state?.jobData

    return (
        <div>
            <CollectorCard />
            {uploadedImage
                ? <img src={uploadedImage} alt="Uploaded" />
                : null}
            {jobData !== null
                ? (
                    Object.entries(jobData.fields).map(([key, value]) => (
                        <div key={key}>
                            {key}: {value}
                        </div>
                    ))
                )
                : null
            }
        </div>
    )
}

export default CollectorCardPage