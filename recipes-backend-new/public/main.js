const button = document.querySelector('#update-button');

button.addEventListener('click', _ => {
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