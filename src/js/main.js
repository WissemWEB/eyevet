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

        [].forEach.call(span, function(item){
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

var mainMenu = new Menu({ navigation: document.querySelector('.header_navigation'), burgerWrapper: document.querySelector('.header_menu')});

// mainMenu.setActive();