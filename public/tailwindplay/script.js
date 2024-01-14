const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');


btn.addEventListener('click', () => {
     // Listen to hamburger button being clicked
     // then take the btn (which is the id 'menu-btn')
     // look at the class open, if there then remove
     // if not place on in there by the toggle function
     btn.classList.toggle('open');

     // Also toggle the 2 menus
     // adds or removes the flex class (no flex in div tag)
     nav.classList.toggle('flex');
     // toggles the hidden class
     nav.classList.toggle('hidden');
});




