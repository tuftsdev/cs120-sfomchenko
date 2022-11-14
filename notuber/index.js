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
      			zoom: 2, 
          		center: landmark,
          		mapTypeId: google.maps.MapTypeId.ROADMAP
          	};
          	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
          	const car = "car.png";

        	// Step 1: make an instance of XHR
        	request = new XMLHttpRequest();
        

        	// Step 2: Make request to the JSON source...
        	request.open('POST', 'https://quiet-cliffs-10971.herokuapp.com/rides', true);
        	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        	// Step 2A: Dealing with receiving the HTTP response from XHR
        	request.onreadystatechange = function() 
        	{
        		// This function deals with receiving HTTP response...
        		if (request.readyState == 4 && request.status == 200)  
        		{
        			const car = "car.png";
        			resultingData = request.responseText; // responseText => string
					parsedData = JSON.parse(resultingData);
					var closestCar;
					const carArr=[];
					for (var i = 0; i < parsedData.length; i++) 
			        {
			        	
			            var vid = parsedData[i]._id;
			            var usName = parsedData[i].username;
			            var lati = parsedData[i].lat;
			            var long = parsedData[i].lng;
			            var createOn = parsedData[i].created_at;
			            var notUber = new google.maps.LatLng(lati, long);
			            var dis = google.maps.geometry.spherical.computeDistanceBetween(landmark, notUber);
			            var disMiles = dis * 0.000621371;
			            
			            carArr.push(disMiles);
			            var markerCar = new google.maps.Marker({
			            	position: notUber,
			              	title: usName,
			              	icon: car
			            });
			            markerCar.setMap(map);

			        }
			        closestCar = Math.min.apply(Math, carArr);
			        for (var i = 0; i < parsedData.length; i++) 
			        {
			        	var createOn = parsedData[i].created_on;
			            var vid = parsedData[i].id;
			            var lati = parsedData[i].lat;
			            var long = parsedData[i].lng;
			            var usName = parsedData[i].username;
			            var notUber = new google.maps.LatLng(lati, long);
			            var dis = google.maps.geometry.spherical.computeDistanceBetween(landmark, notUber);
			            var disMiles = dis * 0.000621371;
			            if (disMiles==closestCar) 
			            {
			            	const carPath = new google.maps.Polyline(
					        {
							    path: [landmark, notUber],
							    geodesic: true,
							    strokeColor: "#FF0000",
							    strokeOpacity: 1.0,
							    strokeWeight: 2,
							});
							carPath.setMap(map);
			            }

			        }
			        

			        var marker = new google.maps.Marker(
		          	{
		          		position: landmark,
		          		title: "Home"
		          	});

		          	marker.setMap(map);
			        var infowindow = new google.maps.InfoWindow(
			        	{  content:"Closest Car is: "+closestCar
			        	});
			        google.maps.event.addListener(marker, 'click', function() 
		            {
		          		infowindow.open(map, marker);
		          	});
		          	google.maps.event.addListener(markerCar, 'click', function() 
		            {
		            	infowindow.setContent(markerCar.title);
		          		infowindow.open(map, markerCar);
		          	});
        		}
        		
    		}
    		// Step 3: Send the request...
    		var username = "uVnnFbz7";
        	var params = "username="+username+"&lat="+lat+"&lng="+lng
        	request.send(params);
  	}        
}