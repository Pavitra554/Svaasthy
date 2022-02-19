import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  //Enter your own credentials
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
 const db = getFirestore(app);

export{auth,db,app}
