import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade]);

export const simpleSlider = () => {
    try {
        const items = document.querySelectorAll('.js-simpleSlider');

        items.forEach(item => {
            const slider = item.querySelector('.js-simpleSlider__slider');
            const pagination = item.querySelector('.js-simpleSlider__pagination');
            const prevBtn = pagination.querySelector('[data-prev]');
            const nextBtn = pagination.querySelector('[data-next]');
            const bullets = pagination.querySelector('[data-bullets]');

            const slides_count = slider.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)").length;

            const swiper = new Swiper(slider, {
                spaceBetween: 15,
                watchOverflow: true,
                loop: slides_count > 2,
                slidesPerView: 2,
                speed: 300,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                    disabledClass: 'isDisabled',
                },
                pagination: {
                    type: 'bullets',
                    el: bullets,
                    bulletActiveClass: 'isActive',
                    clickable: true
                }
            });
        });
    } catch (error) {
        console.log(error)
    }
};
