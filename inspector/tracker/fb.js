import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBikQJIeX6-hLtuWBPUfIDTVNi0p8fEw4Y",
  authDomain: "raceup-2023.firebaseapp.com",
  databaseURL: "https://raceup-2023-default-rtdb.firebaseio.com",
  projectId: "raceup-2023",
  storageBucket: "raceup-2023.appspot.com",
  messagingSenderId: "224338110022",
  appId: "1:224338110022:web:959b93716b912a38884c47",
  measurementId: "G-CN8JFY7Z7C"
};

const app = initializeApp(firebaseConfig)

const db = getDatabase();

//// test 

var tempData = {
  players: []
}

for (var i = 0; i < 5; i++) {
  tempData.players.push({
    x: Math.floor(Math.random()*999),
    y: Math.round(Math.random()*999),
    isPlaying: (Math.floor(Math.random()*2) == 0 ? true : false),
    status: ['running', 'jumping', 'walking'][Math.floor(Math.random()*3)],
  })
}

//set(ref(db, '/'), tempData)


onValue(ref(db, '/'),function(snapshot){
	console.log(MAIN_VALUE = snapshot.val());
	UPDATE()
}, {
	onlyOnce: false
})

FIREBASE_DB = db,
REF = ref,
SET = set,
ONVALUE = onValue;