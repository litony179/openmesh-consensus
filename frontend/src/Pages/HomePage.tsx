import React, { useState, useEffect } from "react";
import { ModalCreateNode } from "./HomePageComponents/ModalCreateNode";
import { ViewPublicNodes } from "./HomePageComponents/ViewPublicNodes";
import { GetOwnedNodes } from "./HomePageComponents/ViewOwnedNodes";
import { clearElementsOn } from "./HomePageHelper";
import { BuildSingleNode } from "./HomePageComponents/ViewOwnedNodes";
import { GetAllUserNodes } from "../services/NodeServices/NodeService";
import consensusLogo from '../Components/consensus-logo.png';

// import { useUser } from '../Context/UserContext';
interface INode {
  _id: string; // Node id
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
}
export const HomePage = () => {
  const [nodeList, setNodeList] = useState<INode[]>([]);

  const userId: string = localStorage.getItem('userId')!;
  const JWTToken: string = localStorage.getItem('JWTToken')!;

  // const updateUserNodes = () => {
  //   // Clear insides on left box and right box
  //   clearElementsOn('user-nodes-analytics');
  //   // clearElementsOn('user-nodes-container');
  // }

  useEffect(() => {
    const fetchNodes = async () => {
      const nodes = await GetAllUserNodes(JWTToken, userId);
      setNodeList(nodes);
    };
    fetchNodes();
  }, [JWTToken, userId]);
  return (
    <>
      <div className="card text-center m-5 fullHeightDiv border-primary">
        <div className="card-header">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Create Node</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" >User Nodes</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="public-node-tab" data-bs-toggle="tab" data-bs-target="#public-node-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">public nodes</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled>In progress</button>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
            <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalCreateNode">Create node</button>
            {ModalCreateNode()}
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
            {/* <ViewOwnedNodesPage  OVER HERE/> */}
            <div className="container-fluid mt-5 d-flex m-0 djustify-content-center align-items-center">
              <div className="row w-100 mx-auto">
                {/* Proportion is currently 4:7 (left: right column size) */}
                <div id="user-nodes-analytics" className="container-fluid col-md-4 border border-danger mx-auto mh-c" aira-label='left-column'>

                <div>
                  <div>
                    <h3>Nodes Owned</h3>
                  </div>
                  <div> 
                    <img src={consensusLogo} className="w-75 mt-4 rounded-circle" alt="inspector" />
                  </div>
                  <div className="card-title fs-2">{nodeList.length} nodes</div>
                </div>

                </div>
                <div id="user-nodes-container" className="container-fluid col-md-7 border border-danger mx-auto mh-c p-4" aria-label='right-column'>
                  <div>
                    {/* {nodeList && nodeList.map(node => (
                      <BuildSingleNode key={node._id} {...node} />
                    ))} */}
                    {nodeList.map(node => {
                      console.log("Mapping node:", node);
                      return <BuildSingleNode key={node._id} {...node} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div >
            </div>
          </div>
          <div className="tab-pane fade" id="public-node-tab-pane" role="tabpanel" aria-labelledby="public-node-tab">
            {/* {ViewPublicNodes()} */}
            <div className="row w-100 mx-auto">
              {/* Proportion is currently 4:7 (left: right column size) */}
              <div id="user-nodes-analytics" className="container-fluid col-md-4 border border-danger mx-auto mh-c" aira-label='left-column'>Public nodes</div>
              <div id="user-nodes-container" className="container-fluid col-md-7 border border-danger mx-auto mh-c p-4" aria-label='right-column'>
                <div>
                  {/* {nodeList && nodeList.map(node => (
                      <BuildSingleNode key={node._id} {...node} />
                    ))} */}
                  {nodeList.map(node => {
                    console.log("Mapping node:", node);
                    return <BuildSingleNode key={node._id} {...node} />;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex={0}>in construction</div>
        </div>
      </div>
    </>
  );
}
