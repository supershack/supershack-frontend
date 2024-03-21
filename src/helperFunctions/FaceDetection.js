import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl"; // Import the WebGL backend
import "@tensorflow/tfjs-backend-cpu"; // Import the CPU backend for fallback

export async function setBackend() {
    try {
        // Check if WebGL is available
        const isWebGLAvailable = await tf.ready();
        if (isWebGLAvailable) {
            // WebGL is available, use it as the backend
            await tf.setBackend("webgl");
        } else {
            // WebGL is not available, fall back to CPU backend
            await tf.setBackend("cpu");
        }
        return true; // Backend successfully set
    } catch (error) {
        console.error("Error setting backend:", error);
        return false; // Failed to set backend
    }
}

export async function detectFaces(imageElement) {
    const model = await cocoSsd.load();
    const predictions = await model.detect(imageElement);
    return predictions.filter((prediction) => prediction.class === "person");
}
