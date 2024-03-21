import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ImageProcessing() {
    const [uploadedFile, setUploadedFile] = useState(null)
    const navigate = useNavigate();

    const isIOS = () => {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    const captureMode = isIOS() ? "user" : "environment";

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadedFile(file)
    }

    useEffect(() => {
        if (uploadedFile !== null) {
            navigate('/loading', { replace: true, state: { uploadedFile } });
        }
    }, [uploadedFile])

    return (
        <div>
            <div>
                <h1>Upload Image</h1>
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/heic"
                    capture={captureMode}
                    onChange={handleFileUpload}
                />
            </div>
        </div>
    );
}


export default ImageProcessing;
