function init()
{
	var test = navigator.geolocation.getCurrentPosition(showPosition);

	function showPosition(position) 
    {
  		var lat = position.coords.latitude;
  		var lng = position.coords.longitude;
  		const landmark = new google.maps.LatLng("42.4085371", "-71.1204669");
  		var myOptions = 
  		{
  			zoom: 12, 
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
		            var usName = parsedData[i].username;
		            var lati = parsedData[i].lat;
		            var long = parsedData[i].lng;
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
		var nonDoxLat="42.4085371";
        var nonDoxLng="-71.1204669";
		var username = "TestyTest";
    	var params = "username="+username+"&lat="+nonDoxLat+"&lng="+nonDoxLng;
    	request.send(params);


        const landmark2 = new google.maps.LatLng("42.4085371", "-71.1204669");
    	// Step 1: make an instance of XHR
    	requestVehicles = new XMLHttpRequest();
    

    	// Step 2: Make request to the JSON source...

    	requestVehicles.open('POST', 'https://quiet-cliffs-10971.herokuapp.com/checkin', true);
    	requestVehicles.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    	// Step 2A: Dealing with receiving the HTTP response from XHR
    	requestVehicles.onreadystatechange = function() 
    	{
    		// This function deals with receiving HTTP response...
    		if (requestVehicles.readyState == 4 && requestVehicles.status == 200)  
    		{
    			resultingData = requestVehicles.responseText; // responseText => string
				parsedData = JSON.parse(resultingData);
				var closestPassenger;
				const passengerArr=[];
				for (var i = 0; i < parsedData.length; i++) 
		        {			        	
		            var usName = parsedData[i].username;
		            var lati = parsedData[i].lat;
		            var long = parsedData[i].lng;
		            var notUber = new google.maps.LatLng(lati, long);
		            var dis = google.maps.geometry.spherical.computeDistanceBetween(landmark2, notUber);
		            var disMiles = dis * 0.000621371;
		            
		            passengerArr.push(disMiles);
		            var markerPass = new google.maps.Marker({
		            	position: notUber,
		              	title: usName,
		            });
		            markerPass.setMap(map);

		        }
		        closestPassenger = Math.min.apply(Math, passengerArr);
		        for (var i = 0; i < parsedData.length; i++) 
		        {
		            var lati = parsedData[i].lat;
		            var long = parsedData[i].lng;
		            var usName = parsedData[i].username;
		            var notUber = new google.maps.LatLng(lati, long);
		            var dis = google.maps.geometry.spherical.computeDistanceBetween(landmark2, notUber);
		            var disMiles = dis * 0.000621371;
		            if (disMiles==closestPassenger) 
		            {
		            	const passPath = new google.maps.Polyline(
				        {
						    path: [landmark2, notUber],
						    geodesic: true,
						    strokeColor: "#FF0000",
						    strokeOpacity: 1.0,
						    strokeWeight: 2,
						});
						passPath.setMap(map);
		            }

		        }
		        
		        var infowindow = new google.maps.InfoWindow(
		        	{  content:"Closest Passenger is: "+closestPassenger
		        	});
		        google.maps.event.addListener(marker, 'click', function() 
	            {
	          		infowindow.open(map, marker);
	          	});
	          	google.maps.event.addListener(markerPass, 'click', function() 
	            {
	            	infowindow.setContent(markerPass.title);
	          		infowindow.open(map, markerPass);
	          	});
    		}
    		
		}
		// Step 3: Send the requestVehicles...
		var nonDoxLat="42.4085371";
        var nonDoxLng="-71.1204669";
		var username = "Vroom";
    	var params = "username="+username+"&lat="+nonDoxLat+"&lng="+nonDoxLng;
    	requestVehicles.send(params);
  	}        
}