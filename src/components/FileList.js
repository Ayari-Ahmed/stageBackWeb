import React, { useState, useEffect } from "react";

function PdfViewer() {
  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/files")
      .then((response) => response.json())
      .then((data) => setPdfFiles(data))
      .catch((error) => console.error("Error fetching PDF files:", error));
  }, []);

  return (
    <div>
      {pdfFiles.length > 0 ? (
        <div>
          <h2>Available PDFs:</h2>
          <ul>
            {pdfFiles.map((filename, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:3001/api/files/${encodeURIComponent(
                        filename
                      )}`,
                      "_blank"
                    )
                  }
                >
                  {filename}
                </button>
                <img
                  className="but_Topics"
                  src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/00bfa6/external-pdf-file-online-learning-flatart-icons-outline-flatarticons.png"
                  alt="logo_PDF"
                  onClick={() =>
                    window.open(
                      `http://localhost:3001/api/files/${filename}`,
                      "_blank"
                    )
                  }
                />
                {filename}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No PDFs available</p>
      )}
    </div>
  );
}

export default PdfViewer;
