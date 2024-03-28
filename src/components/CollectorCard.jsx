function CollectorCard({ jobData, uploadedImage }) {

  return (
    <>
      <div className={`collector-card`}>
        <img src={uploadedImage} alt="Uploaded" />
        <h3>CollectorCard</h3>
        {Object.entries(jobData).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))
        }
      </div>
    </>
  );
}

export default CollectorCard;