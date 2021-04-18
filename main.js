var logger = {};
var log = document.getElementById("eParkingLog");
init();

document.getElementById("btnpark").addEventListener("click", newPark);
document.getElementById("btnleave").addEventListener("click", newLeave);
document.getElementById("btnnew").addEventListener("click", newEntry);

function newEntry_prototype() {
  var today = new Date();
  var datetime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " Time: " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  var x = document.createElement("TBODY");
  var y = document.createElement("TR");
  var action = document.createElement("TD");
  var place = document.createElement("TD");
  var date = document.createElement("TD");
  action.innerHTML = "Wjazd";
  place.innerHTML = "-";
  date.innerHTML = datetime;
  y.appendChild(action);
  y.appendChild(place);
  y.appendChild(date);
  x.appendChild(y);
  document.getElementById("eParkingLog").appendChild(x);
  console.log(log);
}

function newPark_prototype() {
  var today = new Date();
  var datetime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " Time: " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  var placetook = document.getElementById("placePark").value;
  var x = document.createElement("TBODY");
  var y = document.createElement("TR");
  var action = document.createElement("TD");
  var place = document.createElement("TD");
  var date = document.createElement("TD");
  action.innerHTML = "Parkowanie";
  place.innerHTML = placetook;
  date.innerHTML = datetime;
  y.appendChild(action);
  y.appendChild(place);
  y.appendChild(date);
  x.appendChild(y);
  document.getElementById("eParkingLog").appendChild(x);
  console.log(log);
}

function newLeave_prototype() {
  var today = new Date();
  var datetime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " Time: " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  var placeleave = document.getElementById("placeLeave").value;
  var x = document.createElement("TBODY");
  var y = document.createElement("TR");
  var action = document.createElement("TD");
  var place = document.createElement("TD");
  var date = document.createElement("TD");
  action.innerHTML = "Opuszczanie";
  place.innerHTML = placeleave;
  date.innerHTML = datetime;
  y.appendChild(action);
  y.appendChild(place);
  y.appendChild(date);
  x.appendChild(y);
  document.getElementById("eParkingLog").appendChild(x);
  console.log(log);
}

function newEntry() {
  newEntry_prototype();
  logAction("Wjazd", null);
  formDataToDb("Wjazd", 0).then(function () {
    if (registration.sync) {
      registration.sync.register("message-to-log").catch(function (err) {
        return err;
      });
    }
  });
}

function newPark() {
  var place = document.getElementById("placePark").value;
  newPark_prototype();
  logAction("Parkowanie", place);
  formDataToDb("Wjazd", 0).then(function () {
    console.log("Zaczynam zapis parkowania");
    if (registration.sync) {
      console.log("Mamy synchro")
      registration.sync.register("message-to-log").catch(function (err) {
        return err;
      });
    }
  });
}

function newLeave() {
  var place = document.getElementById("placeLeave").value;
  newLeave_prototype();
  logAction("Wyjazd", place);
  formDataToDb("Wyjazd", place).then(function () {
    if (registration.sync) {
      registration.sync.register("message-to-log").catch(function (err) {
        return err;
      });
    }
    else{
      console.log("nie pyklo " + registration.sync);
    }
  });
}

function logAction(_action, _place) {
  var today = new Date();
  var datetime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " Time: " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  var logEvent = {
    action: _action,
    place: _place,
    date: datetime,
  };

  localStorage.setItem(_action, JSON.stringify(logEvent));
  let storageObject = JSON.parse(localStorage.getItem(_action));
  console.log(storageObject.action);
  console.log(storageObject.place);
  console.log(storageObject.date);

  cookieStore.get("session_id");
  cookieStore.set({ name: storageObject.action, value: storageObject.place });
}

cookieStore.addEventListener("change", (event) => {
  for (const cookie of event.changed) {
    if (cookie.name === "session_id") sessionCookieChanged(cookie.value);
  }
  for (const cookie of event.deleted) {
    if (cookie.name === "session_id") sessionCookieChanged(null);
  }
});

function init() {
  initializeIndexedDb();
}

function initializeIndexedDb() {
  let messageLog = indexedDB.open("Parking");

  messageLog.onupgradeneeded = (event) => {
    let db = event.target.result;
    let logObjStore = db.createObjectStore("logObjStore", {
      autoIncrement: true,
    });

    logObjStore.createIndex("action", "action", { unique: false });
    logObjStore.createIndex("place", "place", { unique: false });
    logObjStore.createIndex("date", "date", { unique: false });
  };
}

function formDataToDb(_action, _place) {
  return new Promise((resolve, reject) => {
    let messageLog = indexedDB.open("Parking");

    console.log("Lecimy z formem");
    messageLog.onsuccess = (event) => {
      let objStore = messageLog.result
        .transaction("logObjStore", "readwrite")
        .objectStore("logObjStore");
      objStore.add(this.logAction(_action, _place));
      console.log("Zapisane ez");
      resolve();
    };

    messageLog.onerror = (err) => {
      console.log("Cos nie dziala");
      reject(err);
    };
  });
}
function formDataToServer() {
  console.log(JSON.stringify(this.getFormData()));
}
