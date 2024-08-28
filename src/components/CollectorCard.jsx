import foregroundImg from "../images/GoldenFrame-min.png";
import sticker from "../images/lw-sticker-min.png";
import logo from "../images/Logo-Mono-min.png";

function CollectorCard({ jobData, uploadedImage }) {

  const getBackgroundStyle = (value) => {
    const percentage = Math.floor(value) * 10;
    return {
      height: `${percentage}%`,
    };
  };

  return (
    <div className="collectorCard">
      <div className="userImage-container">
        <img src={uploadedImage} alt="userImage" className="userImage" />
        <img src={foregroundImg} alt="foregroundImage" className="foregroundImage" />
        <img src={sticker} alt="stickerImage" className="stickerImage" />
      </div>
      <img src={logo} alt="logoImage" className="logoImage" />
      <div className="rarityText-container">
        <p className="rarityText">SUPER RARE</p>
      </div>
      <p className="leapwizeText">LEAPWIZE X YOU</p>
      <p className="cardNumberText">1 OF 1</p>
      <div className="jobData-container">
        <div className="jobTitle-container">
          <p className="jobTitleText">{jobData.Name}</p>
        </div>
        <div className="jobAttributes-container">
          {[
            { value: jobData.attribute_coolness, name: 'COOLNESS' },
            { value: jobData.attribute_wealth, name: 'GELD' },
            { value: jobData.attribute_fun, name: 'FUN' },
            { value: jobData.attribute_freetime, name: 'FREIZEIT' }
          ].map((attr, index) => (
            <div className="jobAttribute-individual" key={index}>
              <div className="backgroundFill" style={getBackgroundStyle(attr.value)}></div>
              <p className="valueText">{Math.floor(attr.value)}/10</p>
              <p className="attributeNameText">{attr.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectorCard;
