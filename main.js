var logger = {};
var log = document.getElementById("eParkingLog");

document.getElementById("btnpark").addEventListener("click", newPark);
document.getElementById("btnleave").addEventListener("click", newLeave);
document.getElementById("btnnew").addEventListener("click", newEntry);



function newEntry_prototype() {
    var today = new Date();
    var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();

    var x = document.createElement("TBODY");
    var y = document.createElement("TR");
    var action = document.createElement("TD");
    var place = document.createElement("TD");
    var date = document.createElement("TD");
    action.innerHTML = "Wjazd"
    place.innerHTML = "-"
    date.innerHTML = datetime;
    y.appendChild(action);
    y.appendChild(place);
    y.appendChild(date);
    x.appendChild(y);
    document.getElementById("eParkingLog").appendChild(x);
    console.log(log)
  }

  function newPark_prototype() {
    var today = new Date();
    var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();
    var placetook = document.getElementById("placePark").value;
    var x = document.createElement("TBODY");
    var y = document.createElement("TR");
    var action = document.createElement("TD");
    var place = document.createElement("TD");
    var date = document.createElement("TD");
    action.innerHTML = "Parkowanie"
    place.innerHTML = placetook
    date.innerHTML = datetime;
    y.appendChild(action);
    y.appendChild(place);
    y.appendChild(date);
    x.appendChild(y);
    document.getElementById("eParkingLog").appendChild(x);
    console.log(log)
  }
  
  function newLeave_prototype() {
    var today = new Date();
    var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();
    var placeleave = document.getElementById("placeLeave").value;
    var x = document.createElement("TBODY");
    var y = document.createElement("TR");
    var action = document.createElement("TD");
    var place = document.createElement("TD");
    var date = document.createElement("TD");
    action.innerHTML = "Opuszczanie"
    place.innerHTML = placeleave
    date.innerHTML = datetime;
    y.appendChild(action);
    y.appendChild(place);
    y.appendChild(date);
    x.appendChild(y);
    document.getElementById("eParkingLog").appendChild(x);
    console.log(log)
  }

  function newEntry(){
      newEntry_prototype();
      logAction("Wjazd",null)
  }

  function newPark(){
    var place = document.getElementById("placePark").value;
    newPark_prototype();
    logAction("Parkowanie",place)
}

function newLeave(){
   var place = document.getElementById("placeLeave").value;
    newLeave_prototype();
    logAction("Wyjazd",place)
}

function logAction(_action, _place) {
  var today = new Date();
  var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();
  

  var logEvent = {
      action: _action,
      place: _place,
      date: datetime
  };
  

  localStorage.setItem(_action, JSON.stringify(logEvent));
  let storageObject = JSON.parse(localStorage.getItem(_action));
  console.log(storageObject.action);
  console.log(storageObject.place);
  console.log(storageObject.date);

  cookieStore.get('session_id')
  cookieStore.set({ name: storageObject.action, value: storageObject.place });

}

cookieStore.addEventListener('change', (event) => {
  for (const cookie of event.changed) {
    if (cookie.name === 'session_id')
      sessionCookieChanged(cookie.value);
  }
  for (const cookie of event.deleted) {
    if (cookie.name === 'session_id')
      sessionCookieChanged(null);
  }
});