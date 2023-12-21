import React, { ChangeEvent, useState } from 'react';

/**
 * Functions Required:
 * 1. fetch all nodes owned.
 * 
 * A page where you can view
 * 1. All nodes you own -> show data, and if there is raw data (files) show it.
 * 3. UPLOAD A CSV FILE TO A NODE
 * REQUIREMENT: ability to inspect node.
 * 
 * @returns 
 */
export const ViewOwnedNodes = () => {
  // State for storing selection values
  const builNodeHtml = () => {

  }
  return (
    <>
      <div>
        view all nodes you own +analytics?
      </div>
      <div >
        <span>upload </span>
        <FileUploadButton />
      </div>
    </>
  );
};

const FileUploadButton: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the input
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {selectedFile && <p>File selected: {selectedFile.name}</p>}
    </div>
  );
};
