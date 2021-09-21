/*
    let seattle = {
    city: "Seattle",
    minCustomersPerHour: 23,
    maxCustomersPerHour: 65,
    avgCookiesPerCustomer:  6.3,
    hoursAvailable: ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'],

    // For each hour of the day:
    simulateCookiesSold: function() {

        let totalCookiesSold = 0;
        let simulatedCookiesSoldInCurrentHour = 0;

        // Create a new unordered list to contain hourly sales data
        let listEl = document.createElement('ul');
        // Loop through each hour of the day, adding the sales data for each hour to unordered list.
        for (let i = 0; i < this.hoursAvailable.length; i++) {
            // [cookies sold in the current hour] = [number of cookies sold per customer] * [number of customers in the current hour], where number of customers is a random number between min and max potential customers per hour.
            console.log('hi')
            simulatedCookiesSoldInCurrentHour = this.avgCookiesPerCustomer * Math.floor((Math.random() * (1 + this.maxCustomersPerHour-this.minCustomersPerHour)) + this.minCustomersPerHour);

            // Keep track of how many cookies are sold as the loop progresses through each hour in the day.
            totalCookiesSold = totalCookiesSold + simulatedCookiesSoldInCurrentHour

            // Create a new list element for each hour with the content being the number of cookies sold in the listed hour
            let listItem = document.createElement('li');
            listItem.innerText = this.hoursAvailable[i] + ": " + Math.round(simulatedCookiesSoldInCurrentHour) + " cookies";

            // Append the new list item (sales data for a given hour) to the unordered list
            console.log(listItem);
            listEl.appendChild(listItem);
        }

        // Show total cookies sold to end of list.
        let listItem = document.createElement('li')
        listItem.innerText = "Total: " + Math.round(totalCookiesSold) + " cookies"
        listEl.appendChild(listItem);

        // After unordered list is filled, attach it to the webpage.
        document.getElementById("Seattle").appendChild(listEl);
    }
}
*/

function Location(city, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
    this.city = city,
    this.minCustomersPerHour = minCustomersPerHour,
    this.maxCustomersPerHour = maxCustomersPerHour,
    this.avgCookiesPerCustomer = avgCookiesPerCustomer,
    this.hoursAvailable = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'],

    
    this.addHeaderToPage = function() {
        let divLoc = document.createElement('div');
        document.getElementById("salesInfo").appendChild(divLoc);
        let headerEl = document.createElement('h2');
        headerEl.innerText = this.city;
        divLoc.appendChild(headerEl);
    }
    

    // Show on webpage number of cookies sold for each hour of the day at this location.
    this.simulateCookiesSold = function() {

        let totalCookiesSold = 0;
        let simulatedCookiesSoldInCurrentHour = 0;

        // Create a new unordered list to contain hourly sales data
        let listEl = document.createElement('ul');

        // Loop through each hour of the day, adding the sales data for each hour to unordered list.
        for (let i = 0; i < this.hoursAvailable.length; i++) {

            // [cookies sold in the current hour] = [number of cookies sold per customer] * [number of customers in the current hour], where number of customers is a random number between min and max potential customers per hour.
            simulatedCookiesSoldInCurrentHour = this.avgCookiesPerCustomer * Math.floor((Math.random() * (1 + this.maxCustomersPerHour-this.minCustomersPerHour)) + this.minCustomersPerHour);

            // Keep track of how many cookies are sold as the loop progresses through each hour in the day.
            totalCookiesSold = totalCookiesSold + simulatedCookiesSoldInCurrentHour

            // Create a new list element for each hour with the content being the number of cookies sold in the listed hour
            let listItem = document.createElement('li');
            listItem.innerText = this.hoursAvailable[i] + ": " + Math.round(simulatedCookiesSoldInCurrentHour) + " cookies";

            // Append the new list item (sales data for a given hour) to the unordered list
            console.log(listItem);
            listEl.appendChild(listItem);
        }

        // Show total cookies sold to end of list.
        let listItem = document.createElement('li')
        listItem.innerText = "Total: " + Math.round(totalCookiesSold) + " cookies"
        listEl.appendChild(listItem);

        // After unordered list is filled, attach it to the webpage.
        document.getElementById("salesInfo").lastChild.appendChild(listEl);
    }

    // Immediately simulate cookies upon object creation.
    this.addHeaderToPage();
    this.simulateCookiesSold();
}

seattle = new Location("Seattle", 23, 65, 6.3)
tokyo = new Location("Tokyo", 3, 24, 1.2)
dubai = new Location("Dubai", 11, 38, 3.7)
paris = new Location("Paris", 20, 38, 2.3)
lima = new Location("Lima", 2, 16, 4.6)