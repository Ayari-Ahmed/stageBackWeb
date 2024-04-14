import React, { useState } from "react";

const MyIframeComponent = () => {
  const [iframeSrc, setIframeSrc] = useState("/DashBoard");

  const handleLinkClick = (newSrc) => {
    setIframeSrc(newSrc);
  };

  return (
    <div>
      <h1>My React App</h1>
      <ul>
        <li>
          <button onClick={() => handleLinkClick("/DashBoard/Sections")}>
            Link 1
          </button>
        </li>
        <li>
          <button onClick={() => handleLinkClick("/DashBoard/Matieres")}>
            Link 2
          </button>
        </li>
        {/* Add more links as needed */}
      </ul>
      <iframe
        title="Embedded Content"
        width="100%"
        height="900px"
        src={iframeSrc}
        frameBorder="1"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MyIframeComponent;
