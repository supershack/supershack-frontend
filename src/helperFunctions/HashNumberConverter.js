function hashToNumberConverter(hash) {
    let firstCharacters = hash.slice(0, 2);

    let finalValue = 0;

    for (let i = 0; i < firstCharacters.length; i++) {
        let character = firstCharacters.charAt(i);
        finalValue += character.charCodeAt(0);
    }

    return finalValue;
}

export default hashToNumberConverter;
