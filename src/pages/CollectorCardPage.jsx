import CollectorCard from "../components/CollectorCard";
import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { toBlob } from "html-to-image";
import EmailForm from "../components/EmailForm";

function CollectorCardPage() {

    const imageRef = useRef(null);

    const [jobData, setJobData] = useState({
        Name: '',
        attribute_fun: 0,
        attribute_wealth: 0,
        attribute_freetime: 0,
        attribute_coolness: 0
    })

    const [isHidden, setIsHidden] = useState(true)
    const [isMovedUp, setIsMovedUp] = useState(false);

    const location = useLocation();
    const uploadedImage = location.state?.uploadedImage
    const job = location.state?.jobData

    const showEmailForm = (event) => {
        event.preventDefault()

        setIsHidden(false)
        setIsMovedUp(true);
    }

    const handleShare = async () => {
        try {
            // Convert HTML element to Blob object
            const newFile = await toBlob(imageRef.current);

            // Ensure Blob object is valid
            if (!newFile) {
                console.error('Error: Failed to generate image Blob');
                return;
            }

            // Create data object for sharing
            const data = {
                files: [
                    new File([newFile], 'image.png', {
                        type: newFile.type,
                    }),
                ],
                title: 'Image',
                text: 'image',
            };

            // Check if sharing is supported
            if (!navigator.canShare(data)) {
                console.error("Error: Sharing not supported");
                return;
            }

            // Share image data
            await navigator.share(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };


    useEffect(() => {
        setJobData({
            Name: job.fields.Name,
            attribute_fun: job.fields.attribute_fun,
            attribute_wealth: job.fields.attribute_wealth,
            attribute_freetime: job.fields.attribute_freetime,
            attribute_coolness: job.fields.attribute_coolness
        })
    }, [job])


    return (
        <div className="collectorCard-page">
            <div className={`collectorCard-flashDesign ${isMovedUp ? 'move-up' : ''}`} ref={imageRef}>
                <img src={uploadedImage} alt="userImage" className="userImage" />
            </div>
            {/* <CollectorCard jobData={jobData} uploadedImage={uploadedImage} /> */}
            <div className={`shareNotify-container ${isHidden ? '' : 'hidden'}`}>
                <p className="shareTitle">Wow, Dein Schicksal! Wir sagen dir Bescheid, sobald dieser Job verfügbar ist.</p>
                <div className="shareNotify-buttonContainer">
                    <div className="shareButton">

                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" onClick={handleShare}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.9656 0.403664C19.9186 0.315664 19.8476 0.243664 19.7596 0.196664C17.6736 -0.913336 5.19458 2.95466 1.96658 4.81666C1.12558 5.30166 0.750575 5.87166 0.853575 6.50766C1.15058 8.34966 6.11358 9.74566 8.80658 10.3707L13.8636 5.31466C14.1566 5.02166 14.6316 5.02166 14.9246 5.31466C15.2176 5.60766 15.2176 6.08266 14.9246 6.37566L9.81858 11.4797C10.4596 14.2007 11.8406 19.0157 13.6536 19.3077C13.7216 19.3187 13.7896 19.3247 13.8566 19.3247C14.4106 19.3247 14.9106 18.9447 15.3436 18.1947C17.2056 14.9697 21.0766 2.49266 19.9656 0.403664Z" fill="white" />
                        </svg>
                    </div>
                    <button
                        className="notifyButton"
                        onClick={showEmailForm}>
                        Benachrichtigen
                    </button>
                </div>
            </div>
            <div className={`submitEmail-container ${isHidden ? 'hidden' : ''}`}>
                <p className="findJob-text">WIR FINDEN IHN</p>
                <EmailForm jobId={job.id} />
            </div>
        </div>
    )
}

export default CollectorCardPage