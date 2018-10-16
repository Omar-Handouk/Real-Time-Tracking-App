$(document).ready(() => { // eslint-disable-line

    let update_interval = 10000;

    let current_device;

    let map;

    let marker = null;

    $('#FIND').click(function (e) { // eslint-disable-line
        e.preventDefault();

        $('#Locator').empty(); // eslint-disable-line

        current_device = $('#DEV_ID').val(); // eslint-disable-line

        $('#Locator').append('<div id="map"></div>'); // eslint-disable-line
        initMap();

        marker = null;

        movePosition();
    });

    function initMap() {
        let options = {
            'center': {
                'lat': 21.0,
                'lng': 0
            },
            'zoom': 8
        };
        map = new google.maps.Map(document.getElementById('map'), options); // eslint-disable-line
    }

    function movePosition() {
        $.get('/GetLocation', { // eslint-disable-line
            'DEV_ID': current_device
        }, (response) => {
            let Coordinates = response.Coordinates;
            let Device = response._id;
            let latlng = new google.maps.LatLng(Coordinates.Latitude, Coordinates.Longitude); // eslint-disable-line

            if (marker == null) {
                marker = new google.maps.Marker({ // eslint-disable-line
                    'title': Device,
                    'position': {
                        'lat': Coordinates.Latitude,
                        'lng': Coordinates.Longitude
                    },
                    'map': map
                });
                map.panTo(latlng);
            } else {
                marker.setPosition(new google.maps.LatLng(Coordinates.Latitude, Coordinates.Longitude)); // eslint-disable-line
                map.panTo(latlng);
            }

            window.setTimeout(movePosition, update_interval);
        }, 'json');
    }

    $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCj9B_lUMBxSpH4xamTurUOMNi9daqrjsU&callback=initMap" async defer></script>'); // eslint-disable-line
});