import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import hashToNumberConverter from '../helperFunctions/HashNumberConverter'


function FileUploadPage() {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [shortHashValue, setShortHashValue] = useState(null)

    const navigate = useNavigate();

    const isIOS = () => {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    const captureMode = isIOS() ? "user" : "environment";

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result; // Image data as a Data URL
            const hash = CryptoJS.SHA256(imageData).toString();
            setShortHashValue(hashToNumberConverter(hash));
        };

        reader.readAsDataURL(file);
        setUploadedFile(file)
    }

    useEffect(() => {
        if (uploadedFile !== null && shortHashValue !== null) {
            navigate('/loading', { replace: true, state: { uploadedFile, shortHashValue } });
        }
    }, [uploadedFile, shortHashValue])

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


export default FileUploadPage;
