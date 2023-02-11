// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyBh72IOP8oh_dZh5Peu7QeYT2gyJ-Hxke4",

	authDomain: "employeeform-90b97.firebaseapp.com",

	databaseURL:
		"https://employeeform-90b97-default-rtdb.asia-southeast1.firebasedatabase.app/",

	projectId: "employeeform-90b97",

	storageBucket: "employeeform-90b97.appspot.com",

	messagingSenderId: "567058160396",

	appId: "1:567058160396:web:087643759ff7ea38f34729",

	measurementId: "G-31900Y25M6",
};

// Initialize Firebase

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}
export const Db = getDatabase();
// export default fireDb.database().ref();
