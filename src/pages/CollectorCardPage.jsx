import CollectorCard from "../components/CollectorCard";
import { useLocation } from 'react-router-dom';

function CollectorCardPage() {

    const location = useLocation();
    const uploadedImage = location.state?.uploadedImage

    console.log(uploadedImage)

    return (
        <div>
            <CollectorCard />
            {uploadedImage
                ? <img src={uploadedImage} alt="Uploaded" />
                : null}
        </div>
    )
}

export default CollectorCardPage