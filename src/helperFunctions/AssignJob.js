const MIN_VALUE = 96;
const MAX_VALUE = 244;

function assignJob(value, arrayLength) {
    // Ensure value stays within the range
    value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value));

    // Calculate the index based on linear interpolation
    return Math.floor(((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * arrayLength);
}

export default assignJob;
