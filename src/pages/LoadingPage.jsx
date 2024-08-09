import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FileCheck from '../helperFunctions/FileCheck';
import { setBackend, detectFaces } from '../helperFunctions/FaceDetection'
import assignJob from '../helperFunctions/AssignJob';
import objectThree from '../images/object-2.png'

function LoadingPage() {

    const [isLoading, setIsLoading] = useState(true)
    const [isBackendSet, setIsBackendSet] = useState(false)
    const [jobsData, setJobsData] = useState(null)
    const [jobId, setJobId] = useState(null)
    const [jobData, setJobData] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [faces, setFaces] = useState(null);
    const [percentage, setPercentage] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const uploadedFile = location.state?.uploadedFile;
    const shortHashValue = location.state?.shortHashValue;

    //ADD COMMENTS

    //PREVENT GETS AND PROCESSING IF THERE'S AN ERROR WITH THE FILE? 

    const getAllJobs = () => {
        axios.get("http://localhost:3000/api/jobs")
            .then(response => {
                setJobsData(response.data.records)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllJobs()
    }, [])

    const getJobById = () => {
        axios.get(`http://localhost:3000/api/jobs/${jobsData[jobId].id}`)
            .then(response => {
                setJobData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (jobsData) {
            setJobId(assignJob(shortHashValue, jobsData.length))
        }
    }, [jobsData])

    useEffect(() => {
        if (jobId !== null) {
            getJobById()
        }
    }, [jobId])

    useEffect(() => {
        const checkUploadedFile = () => {
            if (!uploadedFile) {
                setErrorMessage("Failed to upload file");
                return;
            }
            if (FileCheck(uploadedFile) !== undefined) {
                setErrorMessage(FileCheck(uploadedFile));
                return;
            }
            setUploadedImage(URL.createObjectURL(uploadedFile));
            setErrorMessage(undefined);
        };

        checkUploadedFile();
    }, [uploadedFile]);

    const faceDetectionError = (detectedFaces) => {
        if (detectedFaces.length === 0) {
            setErrorMessage('Make sure to upload a picture where a person is visible.')
        }

        if (detectedFaces.length > 1) {
            setErrorMessage('Please upload an image with exactly one face.')
        }
    }

    const processImage = async () => {
        if (!uploadedImage) {
            setErrorMessage("No image");
            return;
        }

        const image = new Image();
        image.src = uploadedImage;

        image.onload = async () => {
            try {
                const detectedFaces = await detectFaces(image);
                faceDetectionError(detectedFaces);
                setFaces(detectedFaces);
            } catch (error) {
                console.error("Error processing image:", error);
                setErrorMessage("Error processing image");
                setIsLoading(false); // Set loading to false in case of error
            }
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isBackendSet) {
                    await setBackend();
                    setIsBackendSet(true);
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
                setErrorMessage("Error in fetchData");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (uploadedImage && isBackendSet && jobData) {
            processImage(); // Trigger processImage after uploadedImage is set and backend is set
        }
    }, [uploadedImage, isBackendSet, jobData]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout); // Cleanup function to clear timeout on component unmount or update

    }, [faces, errorMessage]); // Triggered whenever faces or errorMessage change

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setPercentage(prevPercentage => {
                    const newPercentage = prevPercentage + 1;
                    return newPercentage <= 100 ? newPercentage : 100;
                });
            }, 30); // Adjust interval duration as needed
        }

        return () => {
            clearInterval(interval);
        };
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading && faces && faces.length === 1) {
            navigate('/result', { replace: true, state: { uploadedImage, jobData } });
        }
        if (!isLoading && errorMessage) {
            navigate('/failed', { replace: true, state: { errorMessage } });
        }
    }, [isLoading, faces, errorMessage]);

    return (
        <div className='defaultPage-container loading'>
            <img className="objectThree-image loading" src={objectThree} alt="disc" />
            <div className="textContainer loading">
                <div className="loadingText">
                    <span className="numberText">{percentage}</span>
                    <span className="percentageText">%</span>
                </div>
                <p className="analysingText">ANALYSIERE...</p>
                <p className="textTop">Bitte gedulde Dich einen Moment, <br></br>während Dein Foto verarbeitet <br></br>wird.</p>
            </div>
        </div>
    )
}

export default LoadingPage