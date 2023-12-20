import React, { useState } from 'react';

//notes: Might want to re-confirm user on creating a node.
/**
 * 
 * @returns 
 */
export const ModalCreateNode = () => {
  // State for storing selection values
  const [dataType, setDataType] = useState('health');
  const [connectionType, setConnectionType] = useState('RESTful');

  // Handlers for selection changes
  const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataType(event.target.value);
  };

  const handleConnectionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setConnectionType(event.target.value);
  };

  // Handler for save changes
  const handleSaveChanges = () => {
    console.log(`Data Major: ${dataType}, Connection Type: ${connectionType}`);
    // Here you can add code to send data to backend or perform other actions
  };

  return (
    <div className="modal fade" id="modalCreateNode" tabIndex={-1} aria-labelledby="modalCreateNode" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" >Create new Node</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="data-major-selections">
              <label htmlFor="dataMajor">Data Type:</label>
              <select name="dataType" id="dataType" value={dataType} onChange={handleDataTypeChange}>
                <option value="health">Health</option>
                <option value="gaming">Gaming</option>
                <option value="entertainment">Entertainment</option>
                <option value="crypto">Crypto</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            <div className="data-connectiontype-selections">
              <label htmlFor="connectionType">Connection Type:</label>
              <select name="connectionType" id="connectionType" value={connectionType} onChange={handleConnectionTypeChange}>
                <option value="RESTful">RESTful</option>
                <option value="WebSocket">WebSocket</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges} data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};