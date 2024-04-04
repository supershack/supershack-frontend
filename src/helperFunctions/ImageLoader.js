import background1 from "../images/backgrounds/card-background-holo-1-min.png";
import background2 from "../images/backgrounds/card-background-holo-2-min.png";
import background3 from "../images/backgrounds/card-background-holo-3-min.png";
import background4 from "../images/backgrounds/card-background-holo-4-min.png";
import background5 from "../images/backgrounds/card-background-gold-1-min.png";
import background6 from "../images/backgrounds/card-background-silver-1-min.png";
import background7 from "../images/backgrounds/card-background-bubble-1-min.png";
import background8 from "../images/backgrounds/card-background-darkpurp-1-min.png";

const backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8];

function getRandomIndex() {
    return Math.floor(Math.random() * backgrounds.length);
}

function getRandomImage() {
    return backgrounds[getRandomIndex()];
}

export default getRandomImage;
