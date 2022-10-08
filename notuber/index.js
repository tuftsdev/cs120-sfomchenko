function init()
      {
        var landmark = new google.maps.LatLng(42.352271, -71.05524200000001);
      
        var myOptions = {
          zoom: 13, 
          center: landmark,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        var marker = new google.maps.Marker({
          position: landmark,
          title: "South Station"
        });
        marker.setMap(map);

        const car = "car.png";
        jsonData = '[{"id":"mXfkjrFw","latitude":"42.3453","longitude":"-71.0464"},{"id":"nZXB8ZHz","latitude":"42.3662","longitude":"-71.0621"},{"id":"Tkwu74WC","latitude":"42.3603","longitude":"-71.0547"},{"id":"5KWpnAJN","latitude":"42.3472","longitude":"-71.0802"},{"id":"uf5ZrXYw","latitude":"42.3663","longitude":"-71.0544"},{"id":"VMerzMH8","latitude":"42.3542","longitude":"-71.0704"}]';
        var parsedJsonData = JSON.parse(jsonData);
        for (var i = 0; i < parsedJsonData.length; i++) 
        {
            var vid = parsedJsonData[i].id;
            var lat = parsedJsonData[i].latitude;
            var lon = parsedJsonData[i].longitude;
            var notUber = new google.maps.LatLng(lat, lon);
            var marker = new google.maps.Marker({
              position: notUber,
              title: vid,
              icon: car
            });
            marker.setMap(map);

        }
        
        var infowindow = new google.maps.InfoWindow();
        
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(marker.title);
          infowindow.open(map, marker);
        });
      }