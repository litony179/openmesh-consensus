import React, { useState } from "react";
import { ModalCreateNode } from "./HomePageComponents/ModalCreateNode";
import { ViewPublicNodes } from "./HomePageComponents/ViewPublicNodes";
import { ViewOwnedNodes } from "./HomePageComponents/ViewOwnedNodes";
export const HomePage = () => {
  return (
    <>
      <div>
        <h1>Crappy Home Page</h1>
        <div>
          <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalCreateNode">Create node</button>
        </div>
        <div>
          {ModalCreateNode()}
        </div>
        <div>
          {ViewOwnedNodes()}
        </div>
        <div>
          {ViewPublicNodes()}
        </div>
      </div>
    </>
  );
}
