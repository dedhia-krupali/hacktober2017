var home = home || {};

home.pgLd = function() {
	try {

		// Call the Json api for UserId
		
		home.getHomeData();

	} catch(e) {

	}
}


home.getHomeData = function() {
	try {

		var user_id = common.getKeyValPair({ key: 'user_id', data: keep.get({ name : 'ud' }) });

		$.ajax({
			url: '/../json_dumps/GETHOMEDATA_' + user_id + '.json',
			type: 'GET',
			success : function(data) {
                console.log(data);
            },
            error: function(xhr, status, err) {
            	console.log(err)
            }

		});

	} catch(e) {

	}
}

$(document).ready(function(){

});