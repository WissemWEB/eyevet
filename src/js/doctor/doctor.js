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

var doctorMenu = new Menu({
    navigation: document.querySelector('.header_navigation'),
    burgerWrapper: document.querySelector('.header_menu')
});

// doctorMenu.setActive();

function UpdateItem() {

    this.refresh = function(url, templateId, dest) {
        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText),
                    template = compile(templateId, data);

                insert(template, dest);
            } else {
                console.log('No updates');
            }
        }

        request.onerror = function() {
            console.log('Error' + ' ' + request.statusText);
        }

        request.send(null);
    };

    function compile(templateId, data) {

        var source = document.getElementById(templateId).innerHTML,
            template = Handlebars.compile(source),
            html = template(data);

        return html;
    }

    function insert(template, location) {

        var dest = document.querySelector(location);

        dest.insertAdjacentHTML('beforeEnd', template);
    }
};


// var experience = new UpdateItem();

// experience.refresh('http://vet.sergin.com.ua/build/data/test.json','experience_template', '.experience_grid');

/*Initialization of image gallery*/

baguetteBox.run('.gallery',{
  captions: false,       // true|false|callback(element) - Display image captions
  buttons: 'auto',      // 'auto'|true|false - Display buttons
  async: true,         // true|false - Load files asynchronously
  preload: 2,           // [number] - How many files should be preloaded from current image
  animation: 'slideIn' // 'slideIn'|'fadeIn'|false - Animation type
});


