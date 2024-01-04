// Fetching API data
fetch("https://my.api.mockaroo.com/countries.json?key=79c3a9f0").then((data) => {
    return data.json();
}).then((objectData) => {
    console.log(objectData[0].country);
    let tableData = "";
    objectData.forEach((values) => {
        tableData += `<tr>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.id}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.country}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.population}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.area}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.language}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.sea_access}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.in_EU}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.phone_code}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.capital}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.currency}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.time_zone}</td>
            <td style="background-color: rgb(176, 214, 214);" onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='rgb(176, 214, 214)';">${values.industry}</td>
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
        const response = await fetch('https://my.api.mockaroo.com/countries.json?key=79c3a9f0', {
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
                },
                x: {
                    ticks: {
                        color: 'rgb(255, 255, 255)' // Set label font color to bright white
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'rgb(255, 255, 255)' // Set legend font color to bright white
                    }
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
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'rgb(255, 255, 255)' // Set font color to bright white
                    }
                }
            }
        }
    });
}

// Call the functions to render both charts
renderBarChart();
renderEuPieChart();
