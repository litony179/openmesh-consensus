import React, { ChangeEvent, useState, useEffect } from 'react';
import { GetAllUserNodes } from '../../services/NodeServices/NodeService';

interface INode {
  _id: string; // Node id
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
}

/**
 * BUILT WITHIN A CONTAINER ID user-nodes-container
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
export const GetOwnedNodes = (userId: string, JWTToken: string) => {
  console.log('getowned nodes')
  // State for storing selection values
  const [nodeList, setNodeList] = useState<INode[]>([{
    _id: "string", // Node id
    userId: "string",
    dataType: "string",
    createDate: "string",
    connectionType: "string",
  }]); // Add type annotation to nodeList
  useEffect(() => {
    const fetchNodes = async () => {
      console.log('FETCHING NODES')
      const nodes = await GetAllUserNodes(JWTToken, userId);
      setNodeList(nodeList);
      console.log(nodes);
    };
    fetchNodes();
  }, [JWTToken, userId]);

  return (
    <div>
      {nodeList.map(node => (
        <BuildSingleNode key={node._id} {...node} />
      ))}
    </div>
  );
};

// NODE OBJECT
interface INodeProps {

  _id: string,
  userId: string,
  dataType: string,
  createDate: string,
  connectionType: string,

}

// create inidvidual modal for each of them
export const BuildSingleNode: React.FC<INodeProps> = ({ _id, userId, dataType, createDate, connectionType }) => {
  // THIS MIGHT NOT WORK ....
  const getId = () => {
    localStorage.setItem('nodeId', _id);
    console.log('nodeId: ', _id);
  }

  return (
    <div onClick={getId}>
      <div className="card border-success mb-3" style={{ maxWidth: '100%' }}>
        <div className="card-body text-success">
          <div className="text-start">
          <p className="card-text">nodeId:{_id}</p>
          <p className="card-text">type:{dataType}</p>
          <p className="card-text">connectionType:{connectionType}</p>
          </div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#nodeModal-${_id}`}>
            Inspect
          </button>
        </div>
        <NodeModal _id={_id} userId={userId} dataType={dataType} createDate={createDate} connectionType={connectionType} />
      </div>
    </div>
  )
}

/**
 * Creates a node modal for each node. 
 * Uses local storage on click, to identify what node Id it is.
 * @param _id 
 * @returns 
 */
const NodeModal: React.FC<INodeProps> = ({ _id, userId, dataType, createDate, connectionType }) => {
  // Unique ID for each modal based on nodeId
  const modalId = `nodeModal-${_id}`;

  return (
    <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div> nodeId: {_id} </div>
            <div>userId: {userId} </div>
            <div>dataType: {dataType}</div>
            <div>createDate: {createDate}</div>
            <div>connectionType: {connectionType}</div>
            <FileUploadButton />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
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

