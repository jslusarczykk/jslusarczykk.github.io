//non-unique "https://my.api.mockaroo.com/data.json?key=75d9d5a0"
fetch("https://my.api.mockaroo.com/countries.json?key=54c02180").then((data) => {
    return data.json(); //converted to object
}).then((objectData) => {
    console.log(objectData[0].country);
    let tableData = ""; //using map method
    objectData.map((values) => {
        tableData += `<tr>
        <td>${values.id}</td>
       <td>${values.country}</td>
       <td>${values.population}</td>
       <td>${values.area}</td>
       <td>${values.language}</td>
       <td>${values.sea_access}</td>
       <td>${values.in_EU}</td>
       <td>${values.phone_code}</td>
       <td>${values.capital}</td>
       <td>${values.currency}</td>
       <td>${values.time_zone}</td>
       <td>${values.industry}</td>
     </tr>`;
    });
    document.getElementById("table_body").innerHTML = tableData;
}).catch((err) => {
    console.log(err);
});

// Function to calculate the frequency of each currency in the data
function calculateCurrencyFrequency(data) {
    const frequencyMap = {};

    // Iterate through the data and count occurrences
    data.forEach(entry => {
        const currency = entry.currency;

        // If the currency is not in the frequency map, initialize it with 1, otherwise increment the count
        frequencyMap[currency] = (frequencyMap[currency] || 0) + 1;
    });

    return frequencyMap;
}

// Function to calculate the percentage of countries in the EU in the data
function calculateEuPercentage(data) {
    const totalEntries = data.length;
    let euCount = 0;

    // Count the number of countries in the EU
    data.forEach(entry => {
        if (entry.in_EU) {
            euCount++;
        }
    });

    const percentageInEu = (euCount / totalEntries) * 100;
    const percentageNotInEu = 100 - percentageInEu;

    return {
        inEu: percentageInEu,
        notInEu: percentageNotInEu
    };
}

// Function to fetch data from Mockaroo API
async function fetchData() {
    try {
        const response = await fetch('https://my.api.mockaroo.com/countries.json?key=54c02180', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render the bar chart for currencies using Chart.js
async function renderBarChart() {
    const data = await fetchData();
    const frequencyMap = calculateCurrencyFrequency(data);

    // Extract labels and data from the frequency map
    const labels = Object.keys(frequencyMap);
    const dataValues = Object.values(frequencyMap);

    // Create a Chart.js dataset
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Currency Frequency',
                data: dataValues,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to render the pie chart for EU membership using Chart.js
async function renderEuPieChart() {
    const data = await fetchData();
    const euPercentage = calculateEuPercentage(data);

    // Create a Chart.js dataset
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['In EU', 'Not in EU'],
            datasets: [{
                label: 'EU Membership Percentage',
                data: [euPercentage.inEu, euPercentage.notInEu],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                ],
                hoverOffset: 4
            }]
        }
    });
}

// Call the functions to render both charts
renderBarChart();
renderEuPieChart();
