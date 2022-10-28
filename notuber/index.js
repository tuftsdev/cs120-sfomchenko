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
					parsedData = JSON.parse(resultingData);
					console.log(parsedData);
					// picSection = document.getElementById("meow");
					// picSection.innerHTML = picSection.innerHTML + "<img src=" + catData.file + ">"; 
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