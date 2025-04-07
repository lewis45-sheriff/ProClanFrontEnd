const apiUrl = 'http://localhost:8081/api/v1/year';

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('year-select');
    if (!select) return;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const years = data.entity; // this is an array of objects

            years.forEach(item => {
                const option = document.createElement('option');
                option.value = item.year;
                option.textContent = item.year;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching years:', error);
        });
});
