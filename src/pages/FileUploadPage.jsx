import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import hashToNumberConverter from '../helperFunctions/HashNumberConverter'
import objectOne from '../images/object.png'
import objectTwo from '../images/object-1.png'


function FileUploadPage() {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [shortHashValue, setShortHashValue] = useState(null)
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const isIOS = () => {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    const captureMode = isIOS() ? "user" : "environment";

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

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
        <div className="defaultPage-container">
            <img className="objectOne-image" src={objectOne} alt="disc" />
            <img className="objectTwo-image" src={objectTwo} alt="spring" />
            <div className="faceAnimation-container">
            </div>
            <div className="textContainer">
                <p className="textTop">Lade ein Potrait-Foto von Dir hoch, oder nimm ein neues Foto auf.</p>
                <hr></hr>
                <p className="textSmallerBottom">Deine Daten sind sicher & werden nicht gespeichert.</p>
            </div>
            <button className="buttonDefault" onClick={handleButtonClick}>
                Foto Upload
            </button>
            <input
                id="fileInput"
                ref={fileInputRef}
                className='file-input'
                type="file"
                accept="image/jpeg, image/png, image/heic"
                capture={captureMode}
                onChange={handleFileUpload}
            />
        </div>
    );
}


export default FileUploadPage;
