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
       <td>${values.languages}</td>
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
