function toggleContainer(containerId) {
    var container = document.getElementById(containerId);
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';
}

var checkboxes = document.querySelectorAll('input[type=checkbox]');
var resultSpan = document.getElementById('result');
var ageInput = document.getElementById('age');

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', updatePoints);
});
 // unnötig 
function calculateRisk() {
    var age = parseFloat(ageInput.value);
    var totalPoints = updatePoints();
    var totalRisk = age + totalPoints;
    resultSpan.textContent = totalRisk.toFixed(1);
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
    let closestAge = matrix.ages[0]; // Initialize with the first age value
    let minDifference = Math.abs(userEnteredAge - matrix.ages[0]);

    // Loop through the ages in the matrix and find the closest age
    for (const age of matrix.ages) {
        const difference = Math.abs(userEnteredAge - age);
        if (difference < minDifference) {
            minDifference = difference;
            closestAge = age;
        }
    }

    // Return the closest age
    return closestAge;
}




function update() {
    // Example usage:
    const userEnteredAge = parseInt(document.getElementById("age").value);
    const closestAge = findClosestAge(userEnteredAge);
    console.log("Closest Age:", closestAge);

    const userEnteredGender = document.getElementById("gender").value;
    console.log("Gender:", userEnteredGender);

    const userEnteredBMD = document.getElementById("BMD").value;
    console.log("BMD:", userEnteredBMD);

    updatePoints()
}

// erstellen der Matrix
let matrix = {
    bmdScores: ["Ohne BMD", "T0.0", "T-0.5", "T-1.0", "T-1.5", "T-2.0", "T-2.5", "T-3.0", "T-3.5", "T-4.0"],
    ages: [50, 55, 60, 65, 70, 75, 80, 85, 90],
    therapyThresholds: ["3%", "5%", "10%"],
    values: []
};

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

// Die Werte für [.][.][1] werden in einer 2D-Array-Form vorliegen:
let newDataForThirdTherapy = [
    [43, 42, 31, 23, 17, 13, 9, 7, 5, 3.7],
    [25, 28, 21, 16, 12, 9, 6, 5, 3.5, 2.5],
    [15, 19, 14, 11, 8, 6, 4.4, 3.2, 2.4, 1.7],
    [9, 14, 10, 7.5, 6, 4, 3.1, 2.3, 1.7, 0],
    [6, 10, 7, 5.5, 4.1, 3, 2.2, 1.6, 0, 0],
    [3.5, 8, 6, 4.2, 3.1, 2.2, 1.6, 1.2, 0, 0],
    [2.2, 6, 4.4, 3.2, 2.4, 1.7, 1.3, 0, 0, 0],
    [1.4, 5, 3.6, 2.6, 1.9, 1.3, 0, 0, 0, 0],
    [4, 3, 2.1, 1.5, 0, 0, 0, 0, 0, 0]
];
let newDataForSecondTherapy = [
    [22, 21, 16, 12, 9, 6, 5, 3.5, 2.5, 2],
    [13, 14, 10, 8, 6, 4, 3, 2.3, 1.7, 0],
    [8, 10, 7, 5, 4, 3, 2.2, 1.6, 0, 0],
    [5, 7, 5, 4, 3, 2.1, 1.5, 0, 0, 0],
    [2.8, 5, 4, 2.7, 2.1, 1.5, 1.1, 0, 0, 0],
    [1.8, 4, 3, 2.1, 1.5, 1.1, 0, 0, 0, 0],
    [1.1, 3, 2.2, 1.6, 1.1, 0, 0, 0, 0, 0],
    [0, 2.4, 1.8, 1.3, 0, 0, 0, 0, 0, 0],
    [0, 2, 1.4, 0, 0, 0, 0, 0, 0, 0]
];
let newDataForFirstTherapy = [
    [13, 13, 9, 7, 5, 4, 3, 2.1, 1.5, 0],
    [8, 8, 6, 5, 3.5, 2.6, 1.9, 1.4, 0, 0],
    [5, 6, 4, 3, 2.4, 1.8, 1.3, 0, 0, 0],
    [3, 4, 3, 2.3, 1.7, 1.2, 0, 0, 0, 0],
    [1.7, 3, 2.2, 1.6, 1.2, 0, 0, 0, 0, 0],
    [1.1, 2.3, 1.7, 1.2, 0, 0, 0, 0, 0, 0],
    [0, 1.8, 1.3, 0, 0, 0, 0, 0, 0, 0],
    [0, 1.5, 1.1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1.2, 0, 0, 0, 0, 0, 0, 0, 0]
];
// Nutzen Sie zwei Schleifen, um die 2D Matrix an die richtige Stelle in Ihrer 3D Matrix einzufügen:
for (let b = 0; b < matrix.bmdScores.length; b++) {
    for (let a = 0; a < matrix.ages.length; a++) {
        matrix.values[b][a][0] = newDataForFirstTherapy[a][b]; 
          matrix.values[b][a][1] = newDataForSecondTherapy[a][b]; 
            matrix.values[b][a][2] = newDataForThirdTherapy[a][b];
      // Beachten Sie die Verwendung von `a` und `b` hier, um sicherzustellen, dass Sie auf den richtigen Wert zugreifen
    }
}


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

