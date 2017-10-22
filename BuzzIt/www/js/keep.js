/*
*
*	Title:   Browser Storage Class
*	CREATED BY			:	Pratik Bhanushali
*	CREATED TIME		:	10 Jul 2015
*
*	LAST MODIFIED 		:   10 Jul 2015
*
*	Description: 	Abstraction class to be used for storing data on browser.
*	Dependencies: 	GSH.Misc.fnGVal() & GSH.Misc.fnErr()
*
*
*	keep.get(params)		=> 		Should get data from Cookie by default and if not found, search in Localstorage and then sessionStorage.
*
* 		params
* 			@name 		Identifier used to store a value in browser storage
*
*           e.g: 		keep.get({ name: "ld"});
*
*
*
* 	keep.set(params)		=>		Should set data in Cookie by default and if "storage=L" or "storage=S" , store in LS or SS respectively.
*
* 		params
* 			@name 		Identifier used to store a value in browser storage
* 			@key 		Key to be modified or added to the storage.
* 			@value 		Value to be stored in the browser storage.
* 			@storage 	Optional: Defaults to localStorage. Possible values are 'L'(localStorage) / 'C'(Cookies) / 'S'(session storage).
* 			@sess 		Optional: Defaults to true. Possible values are true / false.
* 			@expires 	Optional: Sets a cookie with an expiry.
* 			@path 		Optional: Defaults to '/'.
*
* 			e.g: 		keep.set({ name: "ld", value: "bms", key: "NAME", storage: "C", sess: true });
*
*
*
* 	keep.isset(params)  	=> 		Checks if the value is stored in browser storage or not
*
* 		params
*   		@name 		Identifier.
*
* 		returns 		true / false.
*
* 			e.g: 		keep.isset({ name: "ld"});
*
*
*
* 	keep.del(params) 	=> 		Deletes the value from browser storage
*
* 		params
* 			@name 		Identifier.
*
* 			e.g: 		keep.del({ name: "ld"});
*
*/

keep = {
	_defaults : {
		name 	: "" ,
		key 	: "" ,
		value 	: "" ,
		storage : "" ,
		sess 	: true ,
		path 	: "/" ,
		defVal 	: "",
		expires : "Thu, 31 Dec 2020 23:59:59 GMT"
	}
};

keep.get = function (params) {
	try {

		var name		=	(params	!=	undefined	&&	params.name		!=	undefined	&&	params.name		!=	"") ? params.name		:	keep._defaults.name	;
		var defVal		=	(params	!=	undefined	&&	params.defVal	!=	undefined	&&	params.defVal	!=	"") ? params.defVal 	:	keep._defaults.defVal	;

		var req  	  = params.name ;
		var reqCookie = params.name + "=" ;
		var cookies   = document.cookie ;
		var i		  = -1 ;
		var j		  = -1 ;
		var result    = "" ;

		/* Look Up in Cookie, else in LocalStorage and then sessionStorage */
		if(cookies.length > 0 && cookies.indexOf(reqCookie) != -1) {
			i =  cookies.indexOf(reqCookie);
			i += reqCookie.length;
			j =  cookies.indexOf(";", i);
			j = (j == -1) ? cookies.length : j;
			result = cookies.substring(i, j);
			// console.log("From Cookie");

		} else if(typeof localStorage !== "undefined" && localStorage.getItem(req) != null) {
			result = localStorage.getItem(req);
			// console.log("From LS");

		} else if(typeof sessionStorage !== "undefined" && sessionStorage.getItem(req) != null) {
			result = sessionStorage.getItem(req);
			// console.log("From SS");

		}

		result = decodeURIComponent(result);

		if(typeof params !== "undefined" && params.key != "" && typeof params.key !== "undefined") {
			result = GSH.Misc.fnGVal({ key: params.key, data: result, defVal: defVal });
		}

		return result;

	} catch(e) {
		GSH.Misc.fnErr({ fnName: "keep.get", fnParams: params, err: e });
	}
};

keep.set = function (params) {

	/*
	*	Default storage = 'L'
	*/
	try {
		var name 	= (params.name 		!= undefined && params.name 	!= "") ? params.name 	: keep._defaults.name ;
		var key 	= (params.key 		!= undefined && params.key 		!= "") ? params.key 	: keep._defaults.key ;
		var value 	= (params.value 	!= undefined && params.value 	!= "") ? params.value 	: keep._defaults.value ;
		var storage = (params.storage 	!= undefined && params.storage 	!= "") ? params.storage : keep._defaults.storage ;
		var sess 	= (params.sess 		!= undefined ) 						   ? params.sess 	: keep._defaults.sess  ;
		var expires = (params.expires 	!= undefined && params.expires 	!= "") ? params.expires : keep._defaults.expires ;
		var path 	= (params.path 		!= undefined && params.path 	!= "") ? params.path 	: keep._defaults.path;

		/* Converting storage value to UpperCase for Consistency */
		storage = storage.toUpperCase();

		/* If key present, get previously stored value and add key */
		if(key != "") {
			var cookie  = keep.get({ name: name });
			var arrCk	= cookie.split("|");

			var valCk = "", arrSplit, arrFullCk = new Array();

			for (var x = 0; x < arrCk.length; x++) {
				if (arrCk[x] != "") {
					arrSplit = arrCk[x].split("=");
					if (arrSplit[0] != key) {
						arrFullCk.push(new Array(arrSplit[0], arrSplit[1]));
					}
				}
			}

			//	If values differ, replace with new value
			var newVal = "";
			newVal += "|" + key + "=" + value;
			for (var z=0; z<arrFullCk.length;z++) {
				newVal += "|" + arrFullCk[z][0] + "=" + arrFullCk[z][1];
			}
			newVal += "|";
			value = newVal;
		}
		value	=	encodeURIComponent(value);

		/* Store value in Cookie / sessionStorage / localStorage */
		if(storage == "" || storage == "C") {
			document.cookie = (escape(name) + "=" + value + (!sess ? "; expires=" + expires : "") + "; path=" + path);

		} else if(storage == 'L') {
			
			if(typeof(localStorage) !== "undefined") {
				localStorage.setItem(name, value);

			} else {
				document.cookie = (escape(name) + "=" + value + (!sess ? "; expires=" + expires : "") + "; path=" + path);
			}		

		} else if(storage == 'S') {

			if(typeof(sessionStorage) !== "undefined") {
				sessionStorage.setItem(name, value);

			} else {
				document.cookie = (escape(name) + "=" + value + (!sess ? "; expires=" + expires : "") + "; path=" + path);
			}
		}

	} catch(e) {
		GSH.Misc.fnErr({ fnName: "keep.set", fnParams: params, err: e });
	}

};

keep.isset = function (params) {
	try {
		var name  	= (typeof params.name  !== "undefined" && params.name  != "") ? params.name : keep._defaults.name ;
		var key  	= (typeof params.key !== "undefined" && params.key != "" ) ? params.key : keep._defaults.key;

		var blnExists = keep.get({ name: name }) != "" ? true : false;

		if(blnExists) {
			if(key != "") {

				var data = keep.get({ name: name });
				return ( GSH.Misc.fnGVal({ key: key, data: data }) != "" ) ? true : false;

			} else {
				return true;
			}

		} else {
			return false;
		}

	} catch(e) {
		GSH.Misc.fnErr({ fnName: "keep.isset", fnParams: params, err: e });
	}
};

keep.del = function (params) {
	try {
		var name = (typeof params.name  !== "undefined" && params.name  != "") ? params.name : keep._defaults.name ;
		var path = (typeof params.path 	!== "undefined" && params.path 	!= "") ? params.path : keep._defaults.path ;

		var cookies  = document.cookie ;

		/*Delete from LS if not found, Cookies and then SS*/
		if(cookies.indexOf(name+"=") != -1) {
			document.cookie = escape(name) + "=; expires=Thu, 01 Jan 2012 00:00:01 GMT; path=" + path;

		} else if(typeof(localStorage) !== "undefined" && localStorage.getItem(name) != null) {
			localStorage.removeItem(name);

		} else if(typeof(sessionStorage) !== "undefined" && sessionStorage.getItem(name) != null) {
			sessionStorage.removeItem(name);

		}

	} catch(e) {
		GSH.Misc.fnErr({ fnName: "keep.del", fnParams: params, err: e });
	}
};

