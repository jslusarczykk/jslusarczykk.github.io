//non-unique "https://my.api.mockaroo.com/data.json?key=75d9d5a0"
fetch("https://my.api.mockaroo.com/data.json?key=75d9d5a0").then((data)=>{
    //console.log(data); json format
    return data.json(); //converted to object
}).then((objectData)=>{
    //console.log(objectData) dziala :PP
    console.log(objectData[0].country);
    let tableData=""; //using map method
    objectData.map((values)=>{
        tableData+=`<tr>
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
     </tr>`; //wystarczy dodac plusa przed rowna sie aby generowalo
    });
    document.getElementById("table_body").
    innerHTML=tableData;
}).catch((err)=>{
    console.log(err)
})

//wykresy

 
const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Dollar', 'Euro', 'Yuan', 'Hryvna', 'Rupiah ', 'Krona', 'Peso', 'Zloty', ],
      datasets: [{
        label: 'The popularity of currency',
        data: [10, 17, 6, 3, 8, 5],
        borderWidth: 1,
        backgroundColor: 'rgb(139, 177, 201)'
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

const ctx2 = document.getElementById('myChart2');
  new Chart(ctx2, {
      type: 'pie',
      data: {
          labels: ['English', 'Telugu', 'Ukrainian', 'Chinese', 'Polish'],
          datasets: [{
              label: 'The popularity of specific languages',
              data: [8, 15, 6, 20, 9],
              backgroundColor: [
                  '#e6e6e6',
                  '#cccccc',
                  '#b3b3b3',
                  '999999',
                  '#808080'
              ],
              hoverOffset: 4
          }]
      }
    });
  