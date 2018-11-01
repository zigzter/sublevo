'use strict';

const username = location.pathname.split('/')[2];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('click', (e) => {
        const artist = document.getElementById('artist').value;
        fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                artist,
            }),
        }).then(resp => resp.json()).then((data) => {
            const results = document.getElementById('results');
            results.innerHTML = '';
            data.map((item) => {
                const result = document.createElement('div');
                result.id = item.id;
                const addBtn = document.createElement('button');
                addBtn.innerText = 'Add to Profile';
                addBtn.addEventListener('click', (event) => {
                    const addedArtistName = event.currentTarget.previousSibling.innerText;
                    const addedArtistId = event.currentTarget.parentElement.id;
                    fetch(`/users/${ username }/add`, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            addedArtistName,
                            addedArtistId,
                            username,
                        }),
                    }).then();
                });
                const name = document.createElement('p');
                name.style = 'display: inline';
                name.innerText = item.name;
                result.append(name);
                result.append(addBtn);
                results.append(result);
            });
        });
    });
    document.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const { id } = event.currentTarget.parentNode;
            const seenCount = event.currentTarget.previousSibling.previousSibling.value;
            fetch(`/users/${ username }/seen`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    username,
                    seenCount,
                }),
            }).then();
        })
    });
});
