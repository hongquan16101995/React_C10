import { initializeApp  } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDwG1PlOS0_y6Lw8voSbSVn73tyZNich1k",
    authDomain: "tour-demo-aa0b5.firebaseapp.com",
    projectId: "tour-demo-aa0b5",
    storageBucket: "tour-demo-aa0b5.appspot.com",
    messagingSenderId: "1074066515010",
    appId: "1:1074066515010:web:f2f5cdd738e6eef94af9db",
    measurementId: "G-T2P3HWKD76"
};

initializeApp(firebaseConfig);

const storage = getStorage()
export default storage;
