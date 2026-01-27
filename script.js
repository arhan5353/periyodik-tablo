function filtrele(tur) {
    const elementler = document.querySelectorAll('.element');

    elementler.forEach(el => {
        if (tur === 'hepsi') {
            el.style.display = 'block';
        } else {
            if (el.classList.contains(tur)) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        }
    });
}
