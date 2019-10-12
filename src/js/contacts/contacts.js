if (!Modernizr.flexwrap) {
    window.location.href = 'error.html';
}

function Menu(elements) {

    var menu = elements.navigation,
        burgerWrapper = elements.burgerWrapper,
        span = burgerWrapper.getElementsByTagName('span');


    burgerWrapper.addEventListener('mousedown', function(e) {
        e.preventDefault();
    });

    burgerWrapper.addEventListener('click', function(e) {

        menu.classList.toggle('show_mobile');

        [].forEach.call(span, function(item) {
            item.classList.toggle('clicked');
        });

    });

    this.setActive = function() {
        var links = menu.getElementsByTagName('a'),
            currentLink = window.location.pathname.split('/').pop();

        [].forEach.call(links, function(item) {

            if (item.href.lastIndexOf(currentLink) !== -1 && currentLink.length > 0) {
                item.classList.add('active');
            }

        });
    }
}

var contactsMenu = new Menu({
    navigation: document.querySelector('.header_navigation'),
    burgerWrapper: document.querySelector('.header_menu')
});

// contactsMenu.setActive();

function initialize() {

    var stylesArray = [{
        "stylers": [{
            "hue": "#004cff"
        }, {
            "gamma": 1.5
        }, {
            "saturation": 75
        }]
    }];

    var styledMap = new google.maps.StyledMapType(stylesArray, {
        name: "Клиника \'Зоолюкс\'"
    });

    var location = {
        lat: 50.452190,
        lng: 30.48884
    };

    var mapOptions = {
        zoom: 19,
        center: location,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var contentString = '<div class="map_info">' +
        '<h1> Клиника "Зоолюкс"</h1>' + '<p> <span>Врач</span>: Нестерчук Владимир Анатолиевич </p>' +
        '<p> <span>Тел</span>: +38 (050) 901-74-52</p>' + '<p> <span>Тел</span>: +38 (044) 587-51-02</p>' + '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
    });

    iconPath = 'build/icons/dog_marker.png';

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Клиника \'Зоолюкс\'',
        icon: iconPath
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}