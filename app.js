'use strict';

// Constructor for location objects.
function Location(city, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
    this.city = city;
    this.minCustomersPerHour = minCustomersPerHour;
    this.maxCustomersPerHour = maxCustomersPerHour;
    this.avgCookiesPerCustomer = avgCookiesPerCustomer;
    this.hourlySales = [];
    this.totalCookiesSold = 0;

    // Immediately simulate cookies upon object creation.
    this.simulateHourlySales();

    // Location object that gets created is stored for later use.
    Location.locationObjects.push(this);
}

// Store location objects that get created here.
Location.locationObjects = [];

// Hours are shared between all locations.
Location.prototype.hoursAvailable = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

// Simulate location specific data. Function to generate this data is shared between all locations.
Location.prototype.simulateHourlySales = function() {

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

// Add this city's data to the table
Location.prototype.render = function() {
    // Create first row (currently empty upon creation).
    let row = document.createElement('tr');

    // Add city name to row.
    let rowName = document.createElement('td');
    rowName.innerText = this.city;
    row.appendChild(rowName);

    // Add city's hourly data to row.
    for (let i = 0; i < this.hoursAvailable.length; i++) {
        let cell = document.createElement('td');
        cell.innerText = Math.round(this.hourlySales[i]);
        row.appendChild(cell);
    }

    // Add row total to row.
    let rowTotal = document.createElement('td');
    rowTotal.innerText = this.totalCookiesSold;
    row.appendChild(rowTotal);

    // Add row to page.
    document.getElementById("results").appendChild(row)
}

// Add header row (including empty first and last cells to account for row totals and city names).
function addHeaderToTable() {
    // Create first row (currently empty upon creation).
    let row = document.createElement('tr');

    // Empty first column for city names.
    row.appendChild(document.createElement('th'));

    // Labeled header cells for each hour of the day.
    for (let i = 0; i < Location.prototype.hoursAvailable.length; i++) {
        let cell = document.createElement('th');
        cell.innerText = Location.prototype.hoursAvailable[i];
        row.appendChild(cell);
    }

    // Empty last column for row totals.
    let lastRowCell = document.createElement('th')
    lastRowCell.innerText = 'Totals'
    row.appendChild(lastRowCell);

    // Display row on page by adding it to the already existing table named 'results'.
    document.getElementById("results").appendChild(row);
}

// Add last row for hourly totals to table.
function addHourlyTotals(locationObjects) {

    let row = document.createElement('tr');

    // Add row name to table.
    let rowName = document.createElement('td');
    rowName.innerText = 'Totals';
    row.appendChild(rowName);

    // For each hour (i)...
    let grandTotal = 0;
    for (let i = 0; i < Location.prototype.hoursAvailable.length; i++) {
        let totalHourlySales = 0; // This totalHourlySales value resets for each hour it gets calculated for.

        // For each city (j), at each hour (i)... increment the totalHourlySales by the hourly sales of each city, for each hour...
        for (let j = 0; j < locationObjects.length; j++) {
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

function addNewStore(e) {
    // Prevent page reload and get DOM form element from event (e).
    e.preventDefault();
    let formTarget = e.target;

    // Create new location object using form data. New location object is last item in Location.locationObjects.
    // Note that value in newLocation is the same as the last element in Location.locationObjects.
    let newLocation = new Location(formTarget.location.value, Number(formTarget.minCustomersPerHour.value), Number(formTarget.maxCustomersPerHour.value), Number(formTarget.avgCookiesPerCustomer.value))

    // Will need to delete totals row if intent is to utilize existing addHourlyTotals function.
    document.getElementById('results').lastChild.remove();

    // Add new location to data to table using render function within newLocation object.
    newLocation.render();

    // AddHourlyTotals function already exists; so to create new store just delete last row and call addHourlyTotals.
    addHourlyTotals(Location.locationObjects);
}

// Create new location objects. Note that Location stores the newly created object in the array Location.locationObjects.
new Location("Seattle", 23, 65, 6.3);
new Location("Tokyo", 3, 24, 1.2);
new Location("Dubai", 11, 38, 3.7);
new Location("Paris", 20, 38, 2.3);
new Location("Lima", 2, 16, 4.6);

// Add header row to table.
addHeaderToTable();

// Add a row for each city (including location specific totals).
for (let i = 0; i < Location.locationObjects.length; i++) {
    Location.locationObjects[i].render();
}

// Add last row for hourly totals.
addHourlyTotals(Location.locationObjects);

// Call addNewStore function when user submits form to create a new store.
document.getElementById('add-new-store').addEventListener('submit', addNewStore);
