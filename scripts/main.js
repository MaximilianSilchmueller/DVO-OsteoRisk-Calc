var checkboxes = document.querySelectorAll('input[type=checkbox]');
var resultSpan = document.getElementById('result');
var ageInput = document.getElementById('age');

const bmdScores = ["Ohne BMD", "T0.0", "T-0.5", "T-1.0", "T-1.5", "T-2.0", "T-2.5", "T-3.0", "T-3.5", "T-4.0"]
const ages = [50, 55, 60, 65, 70, 75, 80, 85, 90]
const therapyThresholds = ["3%", "5%", "10%"]

const calculatedThresholds = {
    female: {
        firstTherapy:{
            "T NA": {
                age50: 13,
                age55: 8,
                age60: 5,
                age65: 3,
                age70: 1.7,
                age75: 1.1,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T >0.0": {
                age50: 13,
                age55: 8,
                age60: 6,
                age65: 4,
                age70: 3,
                age75: 2.3,
                age80: 1.8,
                age85: 1.5,
                age90: 1.2,
            },
            "T -0.5": {
                age50: 9,
                age55: 6,
                age60: 4,
                age65: 3,
                age70: 2.2,
                age75: 1.7,
                age80: 1.3,
                age85: 1.1,
                age90: 0,
            },
            "T -1.0": {
                age50: 7,
                age55: 5,
                age60: 3,
                age65: 2.3,
                age70: 1.6,
                age75: 1.2,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -1.5": {
                age50: 5,
                age55: 3.5,
                age60: 2.4,
                age65: 1.7,
                age70: 1.2,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -2.0": {
                age50: 4,
                age55: 2.6,
                age60: 1.8,
                age65: 1.2,
                age70: 0,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -2.5": {
                age50: 3,
                age55: 1.9,
                age60: 1.3,
                age65: 0,
                age70: 0,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -3.0": {
                age50: 2.1,
                age55: 1.4,
                age60: 0,  
                age65: 0,  
                age70: 0,  
                age75: 0,  
                age80: 0,  
                age85: 0,  
                age90: 0,  
            },
            "T -3.5": {
                age50: 1.5,
                age55: 0,  
                age60: 0,  
                age65: 0,  
                age70: 0,  
                age75: 0,  
                age80: 0,  
                age85: 0,  
                age90: 0,  
            },
            "T -4.0": {
                age50: 0,
                age55: 0,  
                age60: 0,  
                age65: 0,  
                age70: 0,  
                age75: 0,  
                age80: 0,  
                age85: 0,  
                age90: 0,
            },
        },
        secondTherapy:{
            "T NA": {
                age50: 22,
                age55: 13,
                age60: 8, 
                age65: 5, 
                age70: 2.8,
                age75: 1.8,
                age80: 1.1,
                age85: 0, 
                age90: 0, 
            },
            "T >0.0": {
                age50: 21, 
                age55: 14, 
                age60: 10, 
                age65: 7,  
                age70: 5,  
                age75: 4,  
                age80: 3,  
                age85: 2.4,
                age90: 2,  
            },
            "T -0.5": {
                age50: 16, 
                age55: 10, 
                age60: 7,  
                age65: 5,  
                age70: 4,  
                age75: 3,  
                age80: 2.2,
                age85: 1.8,
                age90: 1.4,
            },
            "T -1.0": {
                age50: 12, 
                age55: 8,  
                age60: 5,  
                age65: 4,  
                age70: 2.7,
                age75: 2.1,
                age80: 1.6,
                age85: 1.3,
                age90: 0,  
            },
            "T -1.5": {
                age50: 9,  
                age55: 6,  
                age60: 4,  
                age65: 3,  
                age70: 2.1,
                age75: 1.5,
                age80: 1.1,
                age85: 0,  
                age90: 0,  
            },
            "T -2.0": {
                age50: 6,  
                age55: 4,  
                age60: 3,  
                age65: 2.1,
                age70: 1.5,
                age75: 1.1,
                age80: 0,  
                age85: 0,  
                age90: 0,  
            },
            "T -2.5": {
                age50: 5,  
                age55: 3,  
                age60: 2.2,
                age65: 1.5,
                age70: 1.1,
                age75: 0,  
                age80: 0,  
                age85: 0,  
                age90: 0,  
            },
            "T -3.0": {
                age50: 3.5,
                age55: 2.3,
                age60: 1.6,
                age65: 0,  
                age70: 0,  
                age75: 0,  
                age80: 0,  
                age85: 0,  
                age90: 0,  
            },
            "T -3.5": {
                age50: 2.5,
                age55: 1.7,
                age60: 0, 
                age65: 0, 
                age70: 0, 
                age75: 0, 
                age80: 0, 
                age85: 0, 
                age90: 0, 
            },
            "T -4.0": {
                age50: 2,
                age55: 0,
                age60: 0,
                age65: 0,
                age70: 0,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
        },
        thirdTherapy:{
            "T NA": {
                age50: 43,
                age55: 25,
                age60: 15,
                age65: 9,
                age70: 6,
                age75: 3.5,
                age80: 2.2,
                age85: 1.4,
                age90: 4,
            },
            "T >0.0": {
                age50: 42,
                age55: 28,
                age60: 19,
                age65: 14,
                age70: 10,
                age75: 8,
                age80: 6,
                age85: 5,
                age90: 3,
            },
            "T -0.5": {
                age50: 31,
                age55: 21,
                age60: 14,
                age65: 10,
                age70: 7,
                age75: 6,
                age80: 4.4,
                age85: 3.6,
                age90: 2.1,
            },
            "T -1.0": {
                age50: 23,
                age55: 16,
                age60: 11,
                age65: 7.5,
                age70: 5.5,
                age75: 4.2,
                age80: 3.2,
                age85: 2.6,
                age90: 1.5,
            },
            "T -1.5": {
                age50: 17,
                age55: 12,
                age60: 8,
                age65: 6,
                age70: 4.1,
                age75: 3.1,
                age80: 2.4,
                age85: 1.9,
                age90: 0,
            },
            "T -2.0": {
                age50: 13,
                age55: 9,
                age60: 6,
                age65: 4,
                age70: 3,
                age75: 2.2,
                age80: 1.7,
                age85: 1.3,
                age90: 0,
            },
            "T -2.5": {
                age50: 9,
                age55: 6,
                age60: 4.4,
                age65: 3.1,
                age70: 2.2,
                age75: 1.6,
                age80: 1.3,
                age85: 0,
                age90: 0,
            },
            "T -3.0": {
                age50: 7,
                age55: 5,
                age60: 3.2,
                age65: 2.3,
                age70: 1.6,
                age75: 1.2,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -3.5": {
                age50: 5,
                age55: 3.5,
                age60: 2.4,
                age65: 1.7,
                age70: 0,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
            "T -4.0": {
                age50: 3.7,
                age55: 2.5,
                age60: 1.7,
                age65: 0,
                age70: 0,
                age75: 0,
                age80: 0,
                age85: 0,
                age90: 0,
            },
        },
    },
    male: {
        firstTherapy :{
        "T NA": {
            age50: 12,
            age55: 9,
            age60: 6,
            age65: 5,
            age70: 3,
            age75: 2.4,
            age80: 1.6,
            age85: 0,
            age90: 0,
        },
        "T >0.0": {
            age50: 10,
            age55: 8,
            age60: 6,
            age65: 5,
            age70: 4,
            age75: 3,
            age80: 2.4,
            age85: 2,
            age90: 1.4,
        },
        "T -0.5": {
            age50: 7,
            age55: 5,
            age60: 4,
            age65: 3,
            age70: 2.5,
            age75: 2,
            age80: 1.6,
            age85: 1.3,
            age90: 1,
        },
        "T -1.0": {
            age50: 5,
            age55: 3.7,
            age60: 2.8,
            age65: 2.2,
            age70: 1.7,
            age75: 1.4,
            age80: 1.1,
            age85: 0,
            age90: 0,
        },
        "T -1.5": {
            age50: 3.4,
            age55: 2.5,
            age60: 1.9,
            age65: 1.5,
            age70: 1.1,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
        "T -2": {
            age50: 2.3,
            age55: 1.7,
            age60: 1.3,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
        "T -2.5": {
            age50: 1.6,
            age55: 1.2,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
        "T -3": {
            age50: 1.1,
            age55: 0,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
        "T -3.5": {
            age50: 0,
            age55: 0,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
        "T -4": {
            age50: 0,
            age55: 0,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
    },
    secondTherapy:{
        "T NA": {
            age50: 19,
            age55: 14,
            age60: 11, 
            age65: 8, 
            age70: 6,
            age75: 4,
            age80: 2.7,
            age85: 1.6, 
            age90: 0, 
        },
        "T >0.0": {
            age50: 17, 
            age55: 9, 
            age60: 7, 
            age65: 5,  
            age70: 4,  
            age75: 3.4,  
            age80: 2.7,  
            age85: 2.1,
            age90: 1.5,  
        },
        "T -0.5": {
            age50: 12, 
            age55: 9, 
            age60: 7,  
            age65: 5,  
            age70: 4,  
            age75: 3.4,  
            age80: 2.7,
            age85: 2.1,
            age90: 1.5,
        },
        "T -1.0": {
            age50: 8, 
            age55: 6,  
            age60: 5,  
            age65: 3.6,  
            age70: 2.8,
            age75: 2.3,
            age80: 1.8,
            age85: 1.4,
            age90: 0,  
        },
        "T -1.5": {
            age50: 6,  
            age55: 4,  
            age60: 3.2,  
            age65: 2.4,  
            age70: 1.9,
            age75: 1.5,
            age80: 1.2,
            age85: 0,  
            age90: 0,  
        },
        "T -2.0": {
            age50: 4,  
            age55: 2.9,  
            age60: 2.2,  
            age65: 1.6,
            age70: 1.3,
            age75: 0,
            age80: 0,  
            age85: 0,  
            age90: 0,  
        },
        "T -2.5": {
            age50: 2.6,  
            age55: 2,  
            age60: 1.5,
            age65: 0,
            age70: 0,
            age75: 0,  
            age80: 0,  
            age85: 0,  
            age90: 0,  
        },
        "T -3.0": {
            age50: 1.8,
            age55: 0,
            age60: 0,
            age65: 0,  
            age70: 0,  
            age75: 0,  
            age80: 0,  
            age85: 0,  
            age90: 0,  
        },
        "T -3.5": {
            age50: 0,
            age55: 0,
            age60: 0, 
            age65: 0, 
            age70: 0, 
            age75: 0, 
            age80: 0, 
            age85: 0, 
            age90: 0, 
        },
        "T -4.0": {
            age50: 0,
            age55: 0,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
    },
    thirdTherapy:{
        "T NA": {
            age50: 39,
            age55: 29,
            age60: 21, 
            age65: 15, 
            age70: 11,
            age75: 8,
            age80: 5,
            age85: 3.2, 
            age90: 1.6, 
        },
        "T >0.0": {
            age50: 33, 
            age55: 26, 
            age60: 20, 
            age65: 16,  
            age70: 12,  
            age75: 10,  
            age80: 8,  
            age85: 7,
            age90: 5,  
        },
        "T -0.5": {
            age50: 23, 
            age55: 18, 
            age60: 14,  
            age65: 11,  
            age70: 8,  
            age75: 7,  
            age80: 5,
            age85: 4,
            age90: 3,
        },
        "T -1.0": {
            age50: 16, 
            age55: 12,  
            age60: 9,  
            age65: 7,  
            age70: 6,
            age75: 4.5,
            age80: 3.6,
            age85: 2.8,
            age90: 2,  
        },
        "T -1.5": {
            age50: 11,  
            age55: 8,  
            age60: 6,  
            age65: 5,  
            age70: 4,
            age75: 3,
            age80: 2.4,
            age85: 1.8,  
            age90: 1.3,  
        },
        "T -2.0": {
            age50: 8,  
            age55: 6,  
            age60: 4,  
            age65: 3,
            age70: 2.5,
            age75: 2.0,
            age80: 1.6,  
            age85: 1.2,  
            age90: 0,  
        },
        "T -2.5": {
            age50: 5,  
            age55: 4,  
            age60: 3,
            age65: 2.2,
            age70: 1.7,
            age75: 1.3,  
            age80: 0,  
            age85: 0,  
            age90: 0,  
        },
        "T -3.0": {
            age50: 3.6,
            age55: 2.6,
            age60: 1.9,
            age65: 1.5,  
            age70: 0,  
            age75: 0,  
            age80: 0,  
            age85: 0,  
            age90: 0,  
        },
        "T -3.5": {
            age50: 2.5,
            age55: 1.8,
            age60: 0, 
            age65: 0, 
            age70: 0, 
            age75: 0, 
            age80: 0, 
            age85: 0, 
            age90: 0, 
        },
        "T -4.0": {
            age50: 1.7,
            age55: 0,
            age60: 0,
            age65: 0,
            age70: 0,
            age75: 0,
            age80: 0,
            age85: 0,
            age90: 0,
        },
    },
    },
};

function toggleContainer(containerId) {
    var container = document.getElementById(containerId);
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';
}

function updatePoints() {
    // Get all the container divs that contain checkboxes
    const containerDivs = document.querySelectorAll('.container');
    
    // Initialize an object to store the highest points for each group
    const highestPointsByGroup = {};
    
    // Loop through each container div
    containerDivs.forEach(containerDiv => {
        // Get all the checkboxes within the current container
        const checkboxes = containerDiv.querySelectorAll('input[type="checkbox"]');
        
        // Initialize the highest points for this group
        let highestPoints = 0.0; // Start with a very low value
        
        // Loop through the checkboxes and find the highest points
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const points = parseFloat(checkbox.getAttribute('data-points'));
                if (points > highestPoints) {
                    highestPoints = points;
                }
            }
        });
        
        // Store the highest points for this group in the object
        const groupId = containerDiv.getAttribute('data-group');
        highestPointsByGroup[groupId] = highestPoints;
    });
    
    // Display the highest points for each group
    for (const groupId in highestPointsByGroup) {
        const resultElement = document.getElementById(`resultSpan${groupId}`);
        if (resultElement) {
            resultElement.textContent = highestPointsByGroup[groupId];
        }
    }
    const resultElement = document.getElementById('resultSpanTotal')
    if (resultElement) {
        let totalPoints = 1.0
        for (const groupPoints of Object.values(highestPointsByGroup)) {
            if (groupPoints !== 0) {
                totalPoints *= groupPoints;
            }
        }
        resultElement.textContent = Math.round(totalPoints * 10) / 10;
    }
}

function findClosestAge(userEnteredAge) {
    // Initialize variables to keep track of the closest age and the minimum difference
    let closestAge = ages[0]; // Initialize with the first age value
    let minDifference = Math.abs(userEnteredAge - ages[0]);

    for (const age of ages) {
        const difference = Math.abs(userEnteredAge - age);
        if (difference < minDifference) {
            minDifference = difference;
            closestAge = age;
        }
    }
    return closestAge;
}

function update() {
    const userGender = document.getElementById("gender").value;
    console.log("Gender:", userGender);

    const userBMD = document.getElementById("BMD").value;
    console.log("BMD:", userBMD);

    const userAge = parseInt(document.getElementById("age").value);
    const closestAge = "age" + findClosestAge(userAge);
    console.log("Closest Age:", closestAge);

    updatePoints()
    const resultSpanTotal = document.getElementById("resultSpanTotal").textContent;
    console.log("resultSpanTotal:", resultSpanTotal);

    var recommendedTherapy = "Keine Therapy"
    var tensorValue = calculatedThresholds[userGender]["firstTherapy"][userBMD][closestAge];
    console.log("Tensor Value 1:", tensorValue);
    if (resultSpanTotal > tensorValue) {
        recommendedTherapy = "1   (<5% Risiko)"
        tensorValue = calculatedThresholds[userGender]["secondTherapy"][userBMD][closestAge];
        console.log("Tensor Value 2:", tensorValue);
        if (resultSpanTotal > tensorValue) {
            recommendedTherapy = "2   (5-10 % Risiko)"
            tensorValue = calculatedThresholds[userGender]["thirdTherapy"][userBMD][closestAge];
            console.log("Tensor Value 3:", tensorValue);
            if (resultSpanTotal > tensorValue) {
                recommendedTherapy = "3   (>10% Risiko)"
            }
        }
    }
    document.getElementById("therapyLevel").textContent = recommendedTherapy
    console.log("recommendedTherapy:", recommendedTherapy);
}

// Initialisieren Sie den 'values'-Bereich mit leeren Werten.
for (let b = 0; b < matrix.bmdScores.length; b++) {
    matrix.values[b] = [];
    for (let a = 0; a < matrix.ages.length; a++) {
        matrix.values[b][a] = [];
        for (let t = 0; t < matrix.therapyThresholds.length; t++) {
            matrix.values[b][a][t] = null;  // null repräsentiert einen leeren Wert.
        }
    }
  
}

// Nutzen Sie zwei Schleifen, um die 2D Matrix an die richtige Stelle in Ihrer 3D Matrix einzufügen:
for (let b = 0; b < matrix.bmdScores.length; b++) {
    for (let a = 0; a < matrix.ages.length; a++) {
        matrix.values[b][a][0] = newDataForFirstTherapy[a][b]; 
          matrix.values[b][a][1] = newDataForSecondTherapy[a][b]; 
            matrix.values[b][a][2] = newDataForThirdTherapy[a][b];
      // Beachten Sie die Verwendung von `a` und `b` hier, um sicherzustellen, dass Sie auf den richtigen Wert zugreifen
    }
}

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', update);
});

document.addEventListener('DOMContentLoaded', function() {
    let table = document.getElementById('matrixTable');
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Schleifen durch alle "ages", um jede Zeile der Tabelle zu erstellen
    matrix.ages.forEach((age, aIndex) => {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = age + " Jahre";
        tr.appendChild(th);
        
        // Schleifen durch alle "bmdScores", um jede Zelle der Zeile zu erstellen
        matrix.bmdScores.forEach((score, bIndex) => {
            let td = document.createElement('td');
            // Dies nimmt an, dass wir den 2. Therapieschwellenwert anzeigen möchten, ändern Sie dies entsprechend Ihrer Anforderung
            td.innerText = matrix.values[bIndex][aIndex][0] || '-';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    // Kopfzeile hinzufügen
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let emptyTh = document.createElement('th');
    headerRow.appendChild(emptyTh);
    matrix.bmdScores.forEach(score => {
        let th = document.createElement('th');
        th.innerText = score;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.insertBefore(thead, tbody);
});

