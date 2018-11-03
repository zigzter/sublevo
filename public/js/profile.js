'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchArtist').addEventListener('click', (e) => {
        const artist = document.getElementById('artist').value;
        fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                artist,
            }),
        }).then(resp => resp.json()).then((data) => {
            const results = document.getElementById('artistResults');
            results.innerHTML = '';
            data.map((item) => {
                const result = document.createElement('div');
                result.id = item.id;
                const addBtn = document.createElement('button');
                addBtn.innerText = 'Add to Profile';
                addBtn.addEventListener('click', (event) => {
                    const addedArtistName = event.currentTarget.previousSibling.innerText;
                    const addedArtistId = event.currentTarget.parentElement.id;
                    fetch('/artists/add', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            addedArtistName,
                            addedArtistId,
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
            fetch('/artists/update', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    seenCount,
                }),
            }).then();
        })
    });
    document.getElementById('searchVenue').addEventListener('click', (event) => {
        const venueSearch = document.getElementById('venue').value;
        fetch('/api/venue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                venueSearch,
            }),
        }).then(resp => resp.json()).then((data) => {
            const results = document.getElementById('venueResults');
            results.innerHTML = '';
            data.map((venue) => {
                const p = document.createElement('p');
                p.innerText = venue.displayName;
                results.append(p);
            });
        });
    });
});