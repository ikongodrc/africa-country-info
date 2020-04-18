const endpoint = 'https://restcountries.eu/rest/v2/';
var countries = document.querySelectorAll('.st0');

// on clicking a country--
//pull the country code from the map
//use it to search by country code and return the country info
window.onload = () => {

    document.querySelectorAll('.st0').forEach(item => {
        item.addEventListener('click', (e) => {

            //Change all countries back to original colour
            document.querySelectorAll(".st0").forEach(country => {
                country.style.fill = "#2FAA9F";
            });

            var countryID = e.target.id;

            //set current country fill
            document.getElementById(countryID).style.fill = "black";

            //get country info
            const url = `${endpoint}name/${countryID}?fullText=true`;

            fetch(url).then(response => response.json()).then((json) => {
                var currencies = json[0]['currencies'];
                var name = json[0]['name'];
                var flag = json[0]['flag'];
                var capital = json[0]['capital'];
                document.querySelector('#capital').innerHTML = `<p><span>Capital city:</p></span><p>${capital}</p>`;
                document.querySelector('#name').innerHTML = `${name}`;

                var img = document.querySelector('#flag-img');
                img.src = flag;
                document.querySelector('#flag').appendChild(img);

                var objectCount = Object.keys(currencies).length;
                if (objectCount > 1) {
                    var currencyName = [];
                    var currencyCode = [];
                    var currencySymbol = [];
                    currencies.forEach(item => {
                        //there's a random object in currencies for Zimbabwe - it just has code="(none)" - trying to get rid of it.
                        if (item['code'] != "(none)") {
                            currencyName.push(` ${item['name']}`);
                            currencyCode.push(` ${item['code']}`);
                            currencySymbol.push(` ${item['symbol']}`);
                            document.querySelector('#currency').innerHTML = `<p><span>Currencies:</span></p>${currencyName}<br>${currencyCode}<br>${currencySymbol}</p>`;
                        }
                    });
                } else {
                    currencies.forEach(item => {
                        var currencyName = item['name'];
                        var currencyCode = item['code'];
                        var currencySymbol = item['symbol'];
                        document.querySelector('#currency').innerHTML = `<p><span>Currencies:</span></p><p>${currencyName}<br>${currencyCode}<br>${currencySymbol}</p>`;
                    });
                }
            });
        })
    });
};