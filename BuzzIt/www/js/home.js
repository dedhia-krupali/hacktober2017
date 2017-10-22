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

		var str = "";
		str += "<div class=\"row\">";

		$.each(objData, function(key, value) {

			// console.log("Key", key, " val ", value);
			
			if(value['story_id'] == 'S1000') {
				str += "<div onclick=\"home.overlay('" + value['story_id'] + "', '" + value['story_img_url'] + "')\" class=\"col-xs-4\" style=\"padding-bottom: 5px;\">\
							<img src=\"https://shopplymouthmeetingmall.com/filesystem/plymouth-meeting-mall/644307_10151495304543895_2126949323_n.jpg\" style=\"width: 25%;height: auto;float: left;position: absolute;border-radius: 20px;left: 74px;top: 41px;\">\
	                        <img style=\"border-radius:40px;border-radius: 28px;border-color: #e20075;border-width: 2px;border-style: dashed;\" class=\"media-object\" width=\"200\" src=\"" + value['image_url'] + "\" alt=\"\">\
	                    </div>";
				
			} else {
				str += "<div onclick=\"home.overlay('" + value['story_id'] + "', '" + value['story_img_url'] + "')\" class=\"col-xs-4\" style=\"padding-bottom: 5px;\">\
                        <img style=\"border-radius:40px;border-radius: 28px;border-color: #e20075;border-width: 2px;border-style: solid;\" class=\"media-object\" width=\"200\" src=\"" + value['image_url'] + "\" alt=\"\">\
                    </div>";	
			}		

		});

		str += "</div>";

		console.log("str", str);

		$("#storiesContainer").html(str);




	} catch(e) {

	}
}


home.getStoryData = function(interest_id, callback) {
	try {


		$.ajax({
			url: '/../json_dumps/GETHOMEDATA_' + home.user_id + '_' + interest_id + '.json',
			type: 'GET',
			success : function(data) {
                // console.log(data);

                callback(data);
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

		document.location = './profile.html';

	} catch(e) {

	}
}


home.changeSections = function(id, interest_name) {
	try {

		console.log('Clicked', interest_name);

		home.getStoryData(id, function(data) {

			/* Render Data */
			home.renderStories(data);
		});


	} catch(e) {

	}
}


home.overlay = function(id, story_url) {
	try {

		home.story_id = id;
		home.story_img_url = story_url;

		$("#overlay_img").attr('src', story_url);

		$("#overlay").fadeIn();

        setTimeout(function(){
        	home.overlayOff();
        }, 5000);

	} catch(e) {

	}
}

home.overlayOff = function() {

	home.story_id = '';
	home.story_img_url = '';
	$("#overlay").fadeOut();
}


home.claim = function() {
	try {

		// read global
		// update JSON
		
		// See if there's JSON in local storage;
		// if there, read and update
		// else call API, read and dump to LocalStorage

		if(keep.isset({ name : 'GETUSERPROFILE_' + home.user_id })) {
			home.newData = JSON.parse(keep.get({ name : 'GETUSERPROFILE_' + home.user_id }));
		
		} else {

			$.ajax({
				url: '/../json_dumps/GETUSERPROFILE_' + home.user_id + '.json',
				type: 'GET',
				success : function(data) {
	                
	                home.newData = data;
	                console.log(home.newData);


	                home.newData[0].claims.push({
	                	story_id : home.story_id,
						story_img_url : home.story_img_url
	                });

	                keep.set({ name: 'GETUSERPROFILE_' + home.user_id, value: JSON.stringify(home.newData), storage: "L", sess: false });
	                
	            },
	            error: function(xhr, status, err) {
	            	console.log(err)
	            }

			});
		}


	} catch(e) {

	}
}


$(document).ready(function(){
	home.pgLd();
});