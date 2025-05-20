export const accordeon = (name, message) => {
    try {

        let $dropdowns = $('.js-accordeon');

        $dropdowns.each(function() {
            let $dropdown = $(this),
                $items = $dropdown.find('.js-accordeon__item');

            $items.each(function() {
                let $item = $(this),
                    $label = $item.find('.js-accordeon__label'),
                    $subMenu = $item.find('.js-accordeon__submenu');

                if($item.hasClass('isActive')) {
                    $subMenu.slideDown(300);
                } else {
                    $subMenu.slideUp(300);
                }

                $label.on('click', function(e) {
                    e.preventDefault();

                    $item.toggleClass('isActive');

                    if($item.hasClass('isActive')) {
                        $subMenu.slideDown(300);
                    } else {
                        $subMenu.slideUp(300);
                    }
                });
            });
        });
    } catch (error) {
        console.log(error)
    }
}