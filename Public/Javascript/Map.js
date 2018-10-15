$(document).ready(() => {
    
    let update_interval = 2000;

    let current_device;

    let map;

    let marker = null;

    $('#FIND').click(function (e) { 
        e.preventDefault();
        
        $('#Locator').empty();
        
        current_device = $('#DEV_ID').val();

        $('#Locator').append('<div id="map"></div>');
        initMap();

        marker = null;

        movePosition();
    });

    function initMap()
    {
        let options = {'center': {'lat': 0, 'lng': 0}, 'zoom': 10};
        map = new google.maps.Map(document.getElementById('map'), options);
    }

    function movePosition()
    {
        $.get('/GetLocation', {'DEV_ID': current_device}, (response) => {

            let Coordinates = response.Coordinates;
            let Device = response._id;

            if (marker == null)
            {
                marker = new google.maps.Marker({'title': Device, 'position': {'lat': Coordinates.Latitude, 'lng': Coordinates.Longitude}, 'map': map});
            }
            else
            {
                marker.setPosition(new google.maps.LatLng(Coordinates.Latitude, Coordinates.Longitude));
            }

            window.setTimeout(movePosition, update_interval);
        }, 'json');
    }
});