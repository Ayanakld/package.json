const openMenu = () => {
    const burger = $(".burger");
    const nav = $(".nav-links");

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

openMenu();