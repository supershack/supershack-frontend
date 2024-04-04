import foregroundImg from "../images/GoldenFrame-min.png"

function CollectorCard({ jobData, uploadedImage }) {

  const jobAttributeElements = document.querySelectorAll('.jobAttribute-individual');

  jobAttributeElements.forEach((element, index) => {
    // Set the width and color of the fill based on an external value
    const fillWidth = getFillWidth(index); // Example: function to get fill width based on index

    element.style.setProperty('--fill-width', fillWidth);
  });

  function getFillWidth(index) {
    // Example logic to determine fill width based on index
    if (index === 0) {
      return `${Math.floor(jobData.attribute_coolness) * 10}%`;
    } else if (index === 1) {
      return `${Math.floor(jobData.attribute_wealth) * 10}%`;
    } else if (index === 2) {
      return `${Math.floor(jobData.attribute_fun) * 10}%`;
    } else {
      return `${Math.floor(jobData.attribute_freetime) * 10}%`;
    }
  }

  console.log(jobData)

  return (
    <>
      <div className="collectorCard">
        <div className="userImage-container">
          <img src={uploadedImage} alt="userImage" className="userImage" />
          <img src={foregroundImg} alt="foregroundImage" className="foregroundImage" />
        </div>
        <div className="jobData-container">
          <div className="jobTitle-container">
            <p className="jobTitleText">{jobData.Name}</p>
          </div>
          <div className="jobAttributes-container">
            <div className="jobAttribute-individual">
              <p className="valueText">{Math.floor(jobData.attribute_coolness)}/10</p>
              <p className="attributeNameText">COOLNESS</p>
            </div>
            <div className="jobAttribute-individual">
              <p className="valueText">{Math.floor(jobData.attribute_wealth)}/10</p>
              <p className="attributeNameText">GELD</p>
            </div>
            <div className="jobAttribute-individual">
              <p className="valueText">{Math.floor(jobData.attribute_fun)}/10</p>
              <p className="attributeNameText">FUN</p>
            </div>
            <div className="jobAttribute-individual">
              <p className="valueText">{Math.floor(jobData.attribute_freetime)}/10</p>
              <p className="attributeNameText">FREIZEIT</p>
            </div>
          </div>
        </div>
        {/* {Object.entries(jobData).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))
        } */}
      </div>
    </>
  );
}

export default CollectorCard;