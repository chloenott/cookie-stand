

// Constructor for location objects.
function Location(city, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
    this.city = city,
    this.minCustomersPerHour = minCustomersPerHour,
    this.maxCustomersPerHour = maxCustomersPerHour,
    this.avgCookiesPerCustomer = avgCookiesPerCustomer,
    this.hourlySales = [];
    this.totalCookiesSold = 0;

    // Immediately simulate cookies upon object creation.
    this.simulateCookiesSold();

    // Opted for table building to be completely handled by external control.
    //this.render();
}

// Hours are shared between all locations.
Location.prototype.hoursAvailable = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

// Simulate location specific data. Function to generate this data is shared between all locations.
Location.prototype.simulateCookiesSold = function() {

    // Loop through each hour of the day, adding the sales data for each hour to unordered list.
    for (let i = 0; i < this.hoursAvailable.length; i++) {

        // [cookies sold in the current hour] = [number of cookies sold per customer] * [number of customers in the current hour], where number of customers is a random number between min and max potential customers per hour.
        let simulatedCookiesSoldInCurrentHour = this.avgCookiesPerCustomer * Math.floor((Math.random() * (1 + this.maxCustomersPerHour-this.minCustomersPerHour)) + this.minCustomersPerHour);
        this.hourlySales.push(Math.round(simulatedCookiesSoldInCurrentHour));
        
        // Keep track of how many cookies are sold as the loop progresses through each hour in the day. Use unrounded data for calculation.
        this.totalCookiesSold = this.totalCookiesSold + simulatedCookiesSoldInCurrentHour;
    }

    this.totalCookiesSold = Math.round(this.totalCookiesSold);  // Round grand total after summation is complete.

}


// Add header row (including empty first and last cells to account for row totals and city names).
function addHeaderToTable() {
    // Create first row (currently empty upon creation).
    let row = document.createElement('tr');

    // Empty first column for city names.
    row.appendChild(document.createElement('th'));

    // Labeled header cells for each hour of the day.
    for (i = 0; i < Location.prototype.hoursAvailable.length; i++) {
        let cell = document.createElement('th');
        cell.innerText = Location.prototype.hoursAvailable[i];
        row.appendChild(cell);
    }

    // Empty last column for row totals.
    let lastRowCell = document.createElement('th')
    lastRowCell.innerText = 'Totals'
    row.appendChild(lastRowCell);

    // Display row on page by adding it to the already existing table named 'results'.
    console.log(row);
    document.getElementById("results").appendChild(row);
}

// Add the passed in city's data to the table
function addLocationDataToTable(location) {
        // Create first row (currently empty upon creation).
        let row = document.createElement('tr');

        // Add city name to row.
        let rowName = document.createElement('td');
        rowName.innerText = location.city;
        row.appendChild(rowName);

        // Add city's hourly data to row.
        for (i = 0; i < Location.prototype.hoursAvailable.length; i++) {
            let cell = document.createElement('td');
            cell.innerText = Math.round(location.hourlySales[i]);
            row.appendChild(cell);
        }

        // Add row total to row.
        let rowTotal = document.createElement('td');
        rowTotal.innerText = location.totalCookiesSold;
        row.appendChild(rowTotal);

        // Add row to page.
        document.getElementById("results").appendChild(row)
}

// Add last row for hourly totals to table.
function addHourlyTotals(locationObjects) {

    let row = document.createElement('tr');

    // Add row name to table.
    let rowName = document.createElement('td');
    rowName.innerText = 'Totals';
    row.appendChild(rowName);

    // For each hour (i)...
    for (i = 0; i < Location.prototype.hoursAvailable.length; i++) {
        let totalHourlySales = 0; // This totalHourlySales value resets for each hour it gets calculated for.

        // For each city (j), at each hour (i)... increment the totalHourlySales by the hourly sales of each city, for each hour...
        for (j = 0; j < locationObjects.length; j++) {
            totalHourlySales = totalHourlySales + locationObjects[j].hourlySales[i];
        }

        grandTotal = grandTotal + totalHourlySales // increment grand total by the current hour, for every hour

        // Add total hourly data to row.
        let cell = document.createElement('td');
        cell.innerText = totalHourlySales;
        row.appendChild(cell);
    }

    // Add grand total to table.
    let grandTotalCell = document.createElement('td');
    grandTotalCell.innerText = grandTotal;
    row.appendChild(grandTotalCell);

    // Add last row to table.
    document.getElementById("results").appendChild(row);
}
 


seattle = new Location("Seattle", 23, 65, 6.3);
tokyo = new Location("Tokyo", 3, 24, 1.2);
dubai = new Location("Dubai", 11, 38, 3.7);
paris = new Location("Paris", 20, 38, 2.3);
lima = new Location("Lima", 2, 16, 4.6);

locationObjects = [seattle, tokyo, dubai, paris, lima];

// Add header row to table.
addHeaderToTable();

let grandTotal = 0;
// Add a row for each city (including location specific totals).
for (let i = 0; i < locationObjects.length; i++) {
    addLocationDataToTable(locationObjects[i]);
}

// Add last row for hourly totals.
addHourlyTotals(locationObjects);