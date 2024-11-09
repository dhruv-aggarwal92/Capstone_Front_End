document.getElementById('predictForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect all input values
    // const inputs = Array.from(document.querySelectorAll('input[name="input"]')).map(input => input.value);
    let age = document.getElementById("age").value;
        let height = document.getElementById("height").value;
        let weight = document.getElementById("weight").value;
        // let weight_gain = document.getElementById("weight_gain").value;
        let bmi = document.getElementById("bmi").value;

        let cycle = document.getElementById("cycle").value === "R" ? "2" : "4";
        let cycleLength = document.getElementById("cycle-length").value;

        let weight_gain = document.getElementById("weight_gain").value === "Y" ? "1" : "0";

        let skinDarkening = document.getElementById("skin-darkening").value === "Y" ? "1" : "0";
        let hairGrowth = document.getElementById("hair-growth").value === "Y" ? "1" : "0";
        let pimples = document.getElementById("pimples").value === "Y" ? "1" : "0";
        let hairLoss = document.getElementById("hair-loss").value === "Y" ? "1" : "0";

        let waist = document.getElementById("waist").value;
        let hip = document.getElementById("hip").value; 
        // Array to store the data
        let inputs = [ 
            skinDarkening, hairGrowth, weight_gain, cycle, cycleLength, pimples, bmi, hairLoss, waist, hip, weight, age
        ];

        // Log the collected data (you can replace this with further processing, e.g., sending it to the server)

    // console.log(inputs)
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: inputs })
    })
    .then(response => response.json())
    .then(data => {
        if(data<=0.5){
            document.getElementById('result').innerText = 'Prediction: Infected about ' + ((1-data)*100) + '%';
        }else{
            document.getElementById('result').innerText = 'Prediction: Healthy about ' + (data*100) + '%';
        }
    });
});



