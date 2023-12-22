import { apiCallPost } from "./apiNodeService";

interface INodeSpecs {
  userId: string;
  dataType: string;
  connectionType: string;
  createDate: string;
  bucket?: {
    fileName: string,
    fileExtension: string,
    fileContent: string,
  };
}

/**
 * When the button is clicked
 * 1. sends request to create node
 * 2. Clear User Nodes
 * 3. build user nodes
 * 4. Clear public nodes
 * 5. build public nodes.
 * @param JWTToken 
 * @param nodeSpecs 
 * @returns 
 */
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
export const GetAllUserNodes = async (JWTToken: string, userId: string) => {
  console.log("Get all user nodes")
  try {
    console.log(userId)
    const response = await apiCallPost('/fetchnodeUID', JWTToken, userId);
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

