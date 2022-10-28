function init()
{
	var test = navigator.geolocation.getCurrentPosition(showPosition);
	function showPosition(position) 
    {
      		var lat = position.coords.latitude;
      		var lng = position.coords.longitude;
      		const landmark = new google.maps.LatLng(lat, lng);
      		var myOptions = 
      		{
      			zoom: 13, 
          		center: landmark,
          		mapTypeId: google.maps.MapTypeId.ROADMAP
          	};
          	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
          	var marker = new google.maps.Marker(
          	{
          		position: landmark,
          		title: "Home"
          	});
          	marker.setMap(map);
          	const car = "car.png";

        	// Step 1: make an instance of XHR
        	request = new XMLHttpRequest();
        

        	// Step 2: Make request to the JSON source...
        	request.open('POST', 'https://jordan-marsh.herokuapp.com/rides', true);
        	console.log("Opened");
        	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        	console.log("setRequestHeader");
        	// Step 2A: Dealing with receiving the HTTP response from XHR
        	request.onreadystatechange = function() 
        	{
        		// This function deals with receiving HTTP response...
        		console.log("In onreadystatechange");
        		if (request.readyState == 4 && request.status == 200)  
        		{
        			
        			console.log("Passed readyState");
        			resultingData = request.responseText; // responseText => string
					parsedJsonData = JSON.parse(resultingData);
					console.log(jsonData);
					// for (var i = 0; i < parsedJsonData.length; i++) 
			  //       {
			  //           var vid = parsedJsonData[i].id;
			  //           var lat = parsedJsonData[i].latitude;
			  //           var lon = parsedJsonData[i].longitude;
			  //           var notUber = new google.maps.LatLng(lat, lon);
			  //           var marker = new google.maps.Marker({
			  //             position: notUber,
			  //             title: vid,
			  //             icon: car
			  //           });
			  //           marker.setMap(map);

			  //       }
        		}
        		
    		}
    		// Step 3: Send the request...
    		console.log("Send request");
    		var username = "uVnnFbz7";
        	var params = "username="+username+"&lat="+lat+"&lng="+lng
        	request.send(params);
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function() 
            {
            	infowindow.setContent(marker.title);
          		infowindow.open(map, marker);
          	});
  	}        
}