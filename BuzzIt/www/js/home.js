var home = home || {};

home.pgLd = function() {
	try {

		// Call the Json api for UserId
		
		home.user_id = common.getKeyValPair({ key: 'user_id', data: keep.get({ name : 'ud' }) });
		home.getHomeData();


	} catch(e) {

	}
}


home.getHomeData = function() {
	try {

		$.ajax({
			url: '/../json_dumps/GETHOMEDATA_' + home.user_id + '_I1000.json',
			type: 'GET',
			success : function(data) {
                console.log(data);

                home.renderStories(data);
            },
            error: function(xhr, status, err) {
            	console.log(err)
            }

		});

	} catch(e) {

	}
}


home.renderStories = function(objData) {
	try {

		// var str += "";

		$.each(objData, function(key, value) {

			console.log("Key", key, " val ", value);
		});




	} catch(e) {

	}
}


home.getStoryData = function(event) {
	try {

		var interest_id;

		$.ajax({
			url: '/../json_dumps/GETHOMEDATA_' + home.user_id + '_' + interest_id + '.json',
			type: 'GET',
			success : function(data) {
                console.log(data);

                home.renderStories(data);
            },
            error: function(xhr, status, err) {
            	console.log(err)
            }

		});


	} catch(e) {

	}
}


home.navigate = function() {
	try {

		document.location = '';

	} catch(e) {

	}
}


$(document).ready(function(){
	home.pgLd();
});