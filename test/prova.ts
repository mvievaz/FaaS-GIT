import fetch from 'node-fetch';

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();