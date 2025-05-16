export const logoTrain = () => {
    try {
        const items = document.querySelectorAll('.js-logoTrain');

        items.forEach(item => {
            const rows = item.querySelectorAll('.js-logoTrain__row');

            rows.forEach(row => {
                let widthElements = 0;
                const images = row.querySelectorAll('.js-logoTrain__item');

                images.forEach(image => {
                    const boundingClientRect = image.getBoundingClientRect();
                    const width = boundingClientRect.width;

                    widthElements += width;
                });
                images.forEach(image => row.appendChild(image.cloneNode()));
                images.forEach(image => row.appendChild(image.cloneNode()));

                item.setAttribute('style', `--rowWidth: ${widthElements}px;`);
            });
        });
    } catch (error) {
        
    }
}