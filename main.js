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
    place.innerHTML = "0"
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
      var today = new Date();
      var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();

      logger ["Akcja"] = "Wjazd";
      logger ["Miejsce"] = "0";
      logger ["Data"] = datetime;
      console.log(logger);
      newEntry_prototype();
  }

  function newPark(){
    var today = new Date();
    var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();
    var place = document.getElementById("placePark").value;
    logger ["Akcja"] = "Parkowanie";
    logger ["Miejsce"] = place;
    logger ["Data"] = datetime;
    console.log(logger);
    newPark_prototype();
}

function newLeave(){
    var today = new Date();
    var datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" Time: "+ today.getHours() +":"+ today.getMinutes() +":"+ today.getSeconds();
    var place = document.getElementById("placeLeave").value;
    logger ["Akcja"] = "Opuszczanie";
    logger ["Miejsce"] = place;
    logger ["Data"] = datetime;
    console.log(logger);
    newLeave_prototype();
}

