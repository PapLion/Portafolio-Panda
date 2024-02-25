let tog = document.getElementById('tog');
let lbl_tog = document.getElementById('lbl_tog');

tog.addEventListener('change', (event) => {
    let isChecked = event.target.checked;
    document.body.classList.toggle('dark-theme', isChecked);
});
