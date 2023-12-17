import { apiCallGet } from "./api";
import { getJWT } from "./jwtManager";
export const handleLogout = (e: any) => {
  e.preventDefault();

  apiCallGet('/logout',getJWT)
    .then((r) => {
      // Logout -> delete jwt -> nav to home page
      // ASSERT that nav bar is not in 'log in mode'
      console.log('Logged off', r);
      console.log('did i log off')
    });
};
