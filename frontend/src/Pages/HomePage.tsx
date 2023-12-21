import React, { useState } from "react";
import { ModalCreateNode } from "./HomePageComponents/ModalCreateNode";
import { ViewPublicNodes } from "./HomePageComponents/ViewPublicNodes";
import { ViewOwnedNodes } from "./HomePageComponents/ViewOwnedNodes";
export const HomePage = () => {
  return (
    <>
      <div className="card text-center m-5 fullHeightDiv border-primary">
        <div className="card-header">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Create Node</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">upload file</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">User Nodes</button>
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
            <div>first</div>
          </div>
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
            {ViewOwnedNodes()}
            <div>second</div>
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
            {ViewPublicNodes()}
            <div>third</div>
          </div>
          <div className="tab-pane fade" id="public-node-tab-pane" role="tabpanel" aria-labelledby="public-node-tab">
           
            <div>fourth</div>
          </div>
          <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex={0}>in construction</div>
        </div>
      </div>
    </>
  );
}
