import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import FileCheck from '../helperFunctions/FileCheck';
import { setBackend, detectFaces } from '../helperFunctions/FaceDetection'
import assignJob from '../helperFunctions/AssignJob';

function LoadingPage() {

    const [isLoading, setIsLoading] = useState(true)
    const [isBackendSet, setIsBackendSet] = useState(false)
    const [jobsData, setJobsData] = useState(null)
    const [jobId, setJobId] = useState(null)
    const [jobData, setJobData] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [faces, setFaces] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const uploadedFile = location.state?.uploadedFile;
    const shortHashValue = location.state?.shortHashValue;

    //ADD COMMENTS
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
        if (!isLoading && faces && faces.length === 1) {
            navigate('/result', { replace: true, state: { uploadedImage, jobData } });
        }
        if (!isLoading && errorMessage) {
            navigate('/failed', { replace: true, state: { errorMessage } });
        }
    }, [isLoading, faces, errorMessage]);

    return (
        <div>
            {isLoading ? (
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <div>
                    {/* Your content when not loading */}
                    <h1>Data Loaded!</h1>
                    {/* Add your content here */}
                </div>
            )}
        </div>
    )
}

export default LoadingPage