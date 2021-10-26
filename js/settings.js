const settingReverse = document.querySelector('.settings img');
const settingsList = document.querySelector('.settings-list');
settingReverse.addEventListener('click', () => {
    settingReverse.classList.toggle('reverse');
})
settingReverse.addEventListener('click', () => {
    settingsList.classList.toggle('settings-list-visible');
})