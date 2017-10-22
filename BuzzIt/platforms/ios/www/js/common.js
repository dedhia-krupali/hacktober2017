$(document).ready(function () {
	document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
  window.plugins.sim.getSimInfo(successCallback, errorCallback);
}
 
function successCallback(result) {
  alert("Success", result);
}

function errorCallback(error) {
	alert("Error", error);
}

