import React, { useContext } from "react";
import { UserContext } from '../../Context/UserContext';
import { apiCallPost } from "./apiNodeService";

interface INodeSpecs {
  dataType: string;
  connectionType: string;
}

export const CreateNode = async (JWTToken: string, nodeSpecs: INodeSpecs) => {
  console.log("CREATING NODE")
  try {
    console.log(nodeSpecs)
    const response = await apiCallPost('/createnode', JWTToken, nodeSpecs);
    console.log(response);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      return response.userAccessToken; // return the JWT
    } else {
      console.error('Login failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

// GET ALL USER NODES
export const GetAllUserNodes = async (JWTToken: string, nodeSpecs: INodeSpecs) => {
  console.log("Get all user nodes")
  try {
    console.log(nodeSpecs)
    const response = await apiCallPost('/fetchnodeUID', JWTToken, '');
    console.log(response);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      return response.userAccessToken; // return the JWT
    } else {
      console.error('Login failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

// NOTE : BASED ON WEBSOCKEET, OR DATA TYPE
export const GetPublicNodes = async (JWTToken: string, nodeSpecs: INodeSpecs) => {
  console.log("GEt all public node")
  try {
    console.log(nodeSpecs)
    const response = await apiCallPost('/fetchdnodeDT', JWTToken, '');
    console.log(response);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      return response.userAccessToken; // return the JWT
    } else {
      console.error('Login failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

