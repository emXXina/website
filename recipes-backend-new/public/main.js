const updateButton = document.querySelector('#update-button');
updateButton.addEventListener('click', _ => {
    fetch('/backend/recipe', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Wild Recipe',
            description: 'appearing out of the high grass.'
        })
    })
    .then(result => {
        if (result.ok) return result.json();
    })
    .then(response => {
        window.location.reload(true);
    })
})


const deleteButton = document.querySelector('#delete-button');
const message = document.querySelector('#message');
deleteButton.addEventListener('click', _ => {
    fetch('/backend/recipe', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Wild Recipe'
        })
    })
    .then(result => {
        if (result.ok) return result.json();
    })
    .then(response => {
        if (response === 'No recipe deleted.') {
            message.textContent = 'No random recipe to delete.';
        } else {
            window.location.reload(true);
        }
    })
})