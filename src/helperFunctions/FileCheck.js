function FileCheck(file) {
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    const acceptedContentTypes = ["image/jpg", "image/jpeg", "image/png", "image/heic"];

    if (file.size > MAX_FILE_SIZE) {
        return "File size limit exceeded. Max file size is 3MB.";
    }

    if (!acceptedContentTypes.includes(file.type)) {
        return "Invalid file type. Must be .jpg, .png, or .heic.";
    }
}

export default FileCheck;
