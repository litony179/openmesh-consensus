import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import { GetAllUserNodes } from '../../services/NodeServices/NodeService';

interface INode {
  nodeId: string;
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
}

type INodeArray = INode[];


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
  const { user, JWTToken } = useContext(UserContext);
  const [nodeList, setNodeList] = useState<INodeArray>([]); // Add type annotation to nodeList
  useEffect(() => {
    const fetchNodes = async () => {
      if (user?.UserInfo.userId && JWTToken) {
        const nodes = await GetAllUserNodes(JWTToken, user.UserInfo.userId);
        setNodeList(nodes);
        console.log(nodes);
      }
    };

    fetchNodes();
  }, [user, JWTToken]);
  // const nodeList = [
  //   {
  //     nodeId: '1',
  //     userId: 'node1',
  //     dataType: 'type1',
  //     createDate: 'data1',
  //     connectionType: 'data1',

  //   },
  //   {
  //     nodeId: '2',
  //     userId: 'node2',
  //     dataType: 'type2',
  //     createDate: 'data2',
  //     connectionType: 'data2',

  //   },
  // ];

  return (
    <>
      <div className="container-fluid mt-5 d-flex m-0 djustify-content-center align-items-center">
        <div className="row w-100 mx-auto">
          {/* Proportion is currently 4:7 (left: right column size) */}
          <div className="container-fluid col-md-4 border border-danger mx-auto mh-c" aira-label='left-column'>Number of nodes + analytics here</div>
          <div className="container-fluid col-md-7 border border-danger mx-auto mh-c p-4" aria-label='right-column'>
            {/* {nodeList.map(node => (
              <BuildSingleNode key={node.nodeId} {...node} />
            ))} */}
          </div>
        </div>
      </div>
      <div >

      </div>
    </>
  );
};

// NODE OBJECT
interface INodeProps {

  nodeId: string,
  userId: string,
  dataType: string,
  createDate: string,
  connectionType: string,

}

// create inidvidual modal for each of them
const BuildSingleNode: React.FC<INodeProps> = ({ nodeId, userId, dataType, createDate, connectionType }) => {
  // THIS MIGHT NOT WORK ....
  const getId = () => {
    localStorage.setItem('nodeId', nodeId);
    console.log('nodeId: ', nodeId);
  }

  return (
    <div onClick={getId}>
      <div className="card border-success mb-3" style={{ maxWidth: '18rem' }}>
        <div className="card-body text-success">
          <p className="card-text">This is inline node</p>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#nodeModal-${nodeId}`}>
            Inspect
          </button>
        </div>
        <NodeModal nodeId={nodeId} userId={userId} dataType={dataType} createDate={createDate} connectionType={connectionType} />
      </div>
    </div>
  )
}

/**
 * Creates a node modal for each node. 
 * Uses local storage on click, to identify what node Id it is.
 * @param nodeId 
 * @returns 
 */
const NodeModal: React.FC<INodeProps> = ({ nodeId, userId, dataType, createDate, connectionType }) => {
  // Unique ID for each modal based on nodeId
  const modalId = `nodeModal-${nodeId}`;

  return (
    <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div> nodeId: {nodeId} </div>
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
