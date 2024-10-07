import CollectorCard from "../components/CollectorCard";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { toBlob } from "html-to-image";
import EmailForm from "../components/EmailForm";
import getRandomImage from "../helperFunctions/ImageLoader";

function CollectorCardPage() {

    // Risk of animation running when not intended?
    // Set to false on "Benachrichtigen" click, but make 
    // sure it doesn't start again after translation or
    // in any reload. Maybe set to false and find a work around?
    const [isAnimated, setIsAnimated] = useState(true);
    const [isEmailSet, setIsEmailSet] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [isMovedUp, setIsMovedUp] = useState(false);
    const [showNewDesign, setShowNewDesign] = useState(false);
    const [isMovedRight, setIsMovedRight] = useState(false);

    const imageRef = useRef(null);
    const location = useLocation();
    const uploadedImage = location.state?.uploadedImage;
    const job = location.state?.jobData;

    const [jobData, setJobData] = useState({
        Name: '',
        attribute_fun: 0,
        attribute_wealth: 0,
        attribute_freetime: 0,
        attribute_coolness: 0,
        attribute_percentage:0
    });

    useEffect(() => {
        setRandomBackground();
    }, []);

    useEffect(() => {
        if (job) {
            setJobData({
                Name: job.fields.Name,
                attribute_fun: job.fields.attribute_fun,
                attribute_wealth: job.fields.attribute_wealth,
                attribute_freetime: job.fields.attribute_freetime,
                attribute_coolness: job.fields.attribute_coolness,
                attribute_percentage: job.fields.attribute_percentage
            });
        }
    }, [job]);

    const setRandomBackground = () => {
        const collectorCardElm = document.getElementsByClassName("collectorCard");
        const randomBackground = getRandomImage();
        if (collectorCardElm[0]) {
            collectorCardElm[0].style.backgroundImage = `url(${randomBackground})`;
        }
    };

    const handleChange = (value) => {
        setIsEmailSet(value);
        if (value) {
            setIsMovedRight(true); 
                setShowNewDesign(true);
        }
    };

    useEffect(() => {
}, [isMovedRight]);

    const showEmailForm = (event) => {
        event.preventDefault();
        setIsAnimated(false);
        setIsMovedUp(true);
        setTimeout(() => {
            setIsHidden(false);
        }, 500);
    };

    const handleShare = async () => {
        try {
            setIsAnimated(false);
            const newFile = await toBlob(imageRef.current);
            if (!newFile) {
                console.error('Error: Failed to generate image Blob');
                return;
            }
            const data = {
                files: [new File([newFile], 'image.png', { type: newFile.type })],
                title: 'Image',
                text: 'image',
            };
            if (!navigator.canShare(data)) {
                console.error("Error: Sharing not supported");
                return;
            }
            await navigator.share(data);
            setIsAnimated(true);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="defaultPage-container result">
            <div
                className={`collectorCard-container ${isAnimated ? 'animation' : ''} ${isMovedUp ? 'move-up' : ''} ${isMovedRight ? 'move-right-spinning' : ''}`}
                ref={imageRef}
            >
                <CollectorCard jobData={jobData} uploadedImage={uploadedImage} />
            </div>
            

            {showNewDesign ? (
                <div className="new-design-container">
                    {/* <div className="card-preview">
                        <CollectorCard jobData={jobData} uploadedImage={uploadedImage} />
                    </div> */}
                    <div className="success-content">
                        <h2 className="percentage">{` ${job.fields.attribute_percentage}%`}</h2>
                        <p className="chance-text">So hoch ist Deine Chance</p>
                        <p className="description">...einen Job zu finden, der dir genauso gut oder besser gefällt, wie der Errechnete.</p>
                        <p className="join-text">Tritt unserer Community bei und mach 100% draus!</p>
                        <a href="https://www.rukki.de" className="community-button" target="_blank">
                        Zur Community
                        </a>
                    </div>
                </div>
            ) : isHidden ? (
                <>
                    <div className={`textContainer ${isHidden ? '' : 'hidden'}`}>
                        <p className="textTop">Wow, Dein Schicksal! Wir sagen dir Bescheid, sobald dieser Job verfügbar ist.</p>
                    </div>
                    <div className="shareNotify-buttonContainer">
                    <div className="shareButton" onClick={handleShare}>
                    <img src="src/images/Fill 103.svg" alt="Share" className="share-icon" />
                    </div>
                    <button 
                        className="buttonDefault" 
                        onClick={showEmailForm}>
                        Benachrichtigen
                    </button>
                    </div>
                </>
            ) : (
                <div className={`textContainer final ${isHidden ? 'hidden' : ''}`}>
                    <p className="findJob-text">WIR FINDEN IHN</p>
                    <EmailForm jobId={job?.id} isEmailSet={isEmailSet} onChange={handleChange} />
                </div>
            )}
        </div>
    );
}

export default CollectorCardPage;