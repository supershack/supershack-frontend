import CollectorCard from "../components/CollectorCard";
import { useLocation } from 'react-router-dom';
import EmailForm from "../components/EmailForm";

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
            <EmailForm jobId={jobData.id} />
        </div>
    )
}

export default CollectorCardPage