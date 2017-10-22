var common = common || {};


common.getKeyValPair = function(params) {
	try {
		var strKey		=	params.key;
		var strData		=	params.data;
		var chrSplitA	=	(params.splitA	!=	undefined	&&	params.splitA	!=	"") ? params.splitA :	"|" ;
		var chrSplitB	=	(params.splitB	!=	undefined	&&	params.splitB	!=	"") ? params.splitB :	"=" ;
		var defVal		=	(params.defVal	!=	undefined	&&	params.defVal	!=	"") ? params.defVal :	"" ;

		var arrData		=	strData.split(chrSplitA);
		var strValue	=	"";

		for(var i = 0; i < arrData.length; i++) {
			var arrValue = arrData[i].split(chrSplitB);
			if(arrValue[0].toUpperCase() == strKey.toUpperCase()) {
				strValue = arrValue[1];
				break;
			}
		}
		return (strValue != "") ? strValue : defVal ;
	} catch(e) {
		console.log("common.getKeyValPair");
	}
}


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
