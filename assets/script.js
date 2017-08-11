document.addEventListener('DOMContentLoaded', () => {
    const typefaces = {
        HKGrotesk_Regular: [
            { weight: 300, style: 'normal' }
        ],
        HKGrotesk_SemiBold: [
            { weight: 300, style: 'normal' }
        ],
        Cormorant_Bold: [
            { weight: 700, style: 'normal' }
        ],
    }

    // We loop over the typafces
    Object.keys(typefaces).forEach(name => {
        // We loop over the variant of each typefaces
        const variants = typefaces[name].map(variant => {
            // We create a FontFaceObserver for each combination
            const loader = new FontFaceObserver(name, variant)
            // Calling load returns a promise that resolves when
            // each font is finished loading.
            return loader.load()
        })
        Promise.all(variants).then(() => {
            console.log(`All variants loaded for ${name}`)
            // Once all the promises are resolved (when our webfonts are loaded)
            // we style our document in order to make it take into account our
            // freshly loaded webfonts.
            document.documentElement.classList.add('fonts-loaded');
        })
    })

    // Similate FlashOfUnstyledText (FOUT)
    window.addEventListener('click', () => {
        document.documentElement.classList.toggle('fonts-loaded')
    })
});