if (!Modernizr.flexwrap) {
    window.location.href = 'error.html';
}

function Menu(elements) {

    var menu = elements.navigation,
        burgerWrapper = elements.burgerWrapper,
        span = burgerWrapper.getElementsByTagName('span'),
        links = menu.getElementsByTagName('a');


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

        var currentLink = window.location.pathname.split('/').pop();

        [].forEach.call(links, function(item) {

            if (item.href.lastIndexOf(currentLink) !== -1 && currentLink.length > 0) {
                item.classList.add('active');
            }

        });
    }
}

var articlesMenu = new Menu({
    navigation: document.querySelector('.header_navigation'),
    burgerWrapper: document.querySelector('.header_menu')
});

//articlesMenu.setActive();

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


function show(elements) {
    var arrows = elements.arrows;

    [].forEach.call(arrows, function(item) {

        item.addEventListener('click', function() {

            item.classList.toggle('show');
            var grid = item.parentElement.querySelector('.service_grid');
            grid.classList.toggle('hidden');

        });

        item.addEventListener('mousedown', function(e) {
            e.preventDefault();
        })
    });
}

show({
    arrows: document.querySelectorAll('.mobile_arrow')
});


// var test = new UpdateItem();

// test.refresh('http://vet.sergin.com.ua/build/data/articles_test.json','article_template', '.articles');