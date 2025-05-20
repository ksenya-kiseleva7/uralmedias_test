export const yandexMap = (apiKey = "152f8529-5513-4050-b5e0-25d5150b1976") => {
    try {
        let items = document.querySelectorAll('.js-map');

        if(typeof ymaps == "undefined") {
            $.getScript('https://api-maps.yandex.ru/2.1/?apikey=152f8529-5513-4050-b5e0-25d5150b1976&lang=ru_RU', function() {
                ymaps.ready(init);
                function init() {
                    items.forEach(item => {
                        let coordinates = item.dataset.coordinates;
                        if(coordinates) coordinates = coordinates.split(',').map(coord => {return coord.trim()});

                        let placemarkPath = item.dataset.placemarkPath || '/img/placemark.svg';
                        let placemarksData = item.dataset.placemarksData;
                        if(placemarksData) placemarksData = JSON.parse(placemarksData);

                        let myMap = new ymaps.Map(item, {
                            center: coordinates,
                            zoom: 13
                        });

                        placemarksData.forEach(placemarkData => {
                            let MyBalloonLayout = placemarkData.contactsForBaloon && ymaps.templateLayoutFactory.createClass(
                                            `<div class="m-baloon"><img class="m-baloon__placemark" src="${placemarkPath}">$[[options.contentLayout observeSize minWidth=380]]</div>`, {
                                                build: function () {
                                                    this.constructor.superclass.build.call(this);
                                                    this._$element = $('.m-baloon', this.getParentElement());
                                                    this.applyElementOffset();
                                                    this._$element.find('.m-baloon__placemark')
                                                            .on('click', $.proxy(this.onCloseClick, this));
                                                },
                                                clear: function () {
                                                    this._$element.find('.m-baloon__placemark')
                                                            .off('click');
                                                    this.constructor.superclass.clear.call(this);
                                                },
                                                onSublayoutSizeChange: function () {
                                                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                                                    if(!this._isElement(this._$element)) {
                                                        return;
                                                    }
                                                    this.applyElementOffset();
                                                    this.events.fire('shapechange');
                                                },
                                                applyElementOffset: function () {
                                                    this._$element.css({
                                                        left: -(this._$element[0].offsetWidth / 2),
                                                        top: -(this._$element[0].offsetHeight) - ($(window).width() <= 1023 ? 90 : 140)
                                                    });
                                                },
                                                onCloseClick: function (e) {
                                                    e.preventDefault();
                                                    this.events.fire('userclose');
                                                },
                                                getShape: function () {
                                                    if(!this._isElement(this._$element)) {
                                                        return MyBalloonLayout.superclass.getShape.call(this);
                                                    }
                                                    var position = this._$element.position();
                                                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                                                        [position.left, position.top], [
                                                            position.left + this._$element[0].offsetWidth,
                                                            position.top + this._$element[0].offsetHeight
                                                        ]
                                                    ]));
                                                },
                                                _isElement: function (element) {
                                                    return element && element[0];
                                                }
                                            }),
                                    MyBalloonContentLayout = placemarkData.contactsForBaloon && ymaps.templateLayoutFactory.createClass(
                                            `<div class="m-baloon__items">
                                    ${
                                                    placemarkData.contactsForBaloon.map(data => {
                                                        return `
                                                <div class="m-baloon__item">
                                                    <div class="m-baloon__item-label">${data.title}</div>
                                                    ${data.link
                                                                ? `<a href="${data.link}" class="m-baloon__item-value m-link m-link--black">${data.text}</a>`
                                                                : `<div class="m-baloon__item-value">${data.text}</div>`}
                                                </div>
                                            `;
                                                    }).join('')
                                            }
                                </div>`
                                    ),
                                    myPlacemark = placemarkData.coordinates && new ymaps.Placemark(placemarkData.coordinates, {}, {
                                        iconLayout: 'default#image',
                                        iconImageHref: placemarkPath,
                                        iconImageSize: $(window).width() <= 1023 ? [73, 100] : [110, 150],
                                        iconImageOffset: $(window).width() <= 1023 ? [-36.5, -100] : [-55, -150],
                                        balloonLayout: MyBalloonLayout,
                                        balloonContentLayout: MyBalloonContentLayout,
                                        balloonPanelMaxMapArea: 0,
                                        hideIconOnBalloonOpen: false
                                    });

                            if(myPlacemark) myMap.geoObjects.add(myPlacemark);
                        });

                        myMap.behaviors.disable('scrollZoom');
                    });
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}
