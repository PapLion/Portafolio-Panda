function toggleProyectos() {
    const proyectosExtra = document.querySelector('.proyectos-extra');
    proyectosExtra.classList.toggle('show-more');

    const toggleMoreButton = document.querySelector('.toggle-more');
    
    // Cambiar el texto del botón dependiendo del estado
    if (proyectosExtra.classList.contains('show-more')) {
        toggleMoreButton.textContent = 'Ver menos 👆';
    } else {
        toggleMoreButton.textContent = 'Ver más 👇';
    }
}
