'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
