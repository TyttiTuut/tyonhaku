
// Haetaan viittaukse HTML-div-elementteihin, joihon työpaikat lisätään
const divi = document.getElementById('Kemistityot')
const div_kemistityot2 = document.getElementById('Kemistityot2')
const div_harjoittelija = document.getElementById('Harjoittelijatyot');
const div_harjoittelija2 = document.getElementById('Harjoittelijatyot2');
const div_hakutyot = document.getElementById('Hakutyot');
const div_hakutyot2 = document.getElementById('Hakutyot2');
const div_valintatyot = document.getElementById('Valintatyot');
const div_valintatyot2 = document.getElementById('Valintatyot2');
const div_kemia = document.getElementById('Kemiatyot');
const div_Ittyot = document.getElementById('ITtyot');
const div_Ittyot2 = document.getElementById('ITtyot2');


// Lisätään tapahtumankäsittelijä kemisti-nappulan klikkaukselle
document.getElementById('Kemisti').addEventListener('click', function () {
    console.log('Button kemisti clicked'); // Tulostetaan konsoliin 'Button Kemisti clicked'
    // Kutsutaan haeKemisti-funktiota annetulla URL:lla ja haeJaNaytaTyot annetulla URL:lla
    haeKemisti('https://duunitori.fi/api/v1/jobentries?search=kemian+alan+teht%C3%A4v%C3%A4t+%28ala%29');
    haeJaNaytaTyot('https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=2113&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---', div_kemistityot2)
});

// Funktio kemisti-työpaikkojen hakemiseen ja lisäämiseen sivulle
const haeKemisti = (url) => {
    // Tehdään HTTP-pyyntö annettuun URL:ään
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlText => {
            // Parsitaan XML-vastaus tekstistä XML-dokumentiksi
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Haetaan kaikki 'item'-elementit XML-dokumentista
            const items = xmlDoc.querySelectorAll('item'); 
            // Käydään läpi jokainen 'item'-elementti
            items.forEach(item => {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const description = item.querySelector('description').textContent;
                const pubdate = item.querySelector('pubDate').textContent;

                // Muunnetaan päivämäärä haluttuun muotoon
                const dateObj = new Date(pubdate);
                const formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;


                // Tarkistetaan, sisältääkö kuvaus tai otsikko sanan "kemisti"
                if (description.toLowerCase().includes('kemisti')|| title.toLowerCase().includes('kemisti')) {
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    divi.innerHTML += `<h2>${title} (julkaistu: ${formattedDate})</h2><p><a href="${link}" target="_blank">${link}</a></p>`;
                }
            });
        })
        .catch(error => {
            // Virheenkäsittely: jos pyyntö epäonnistuu, tulostetaan virhe konsoliin
            console.error('Fetch error:', error);
        });
}

// Lisätään tapahtumankäsittelijä harjoittelija-nappulan klikkaukselle
document.getElementById('Harjoittelija').addEventListener('click', function () {
    console.log('Button Harjoittelija clicked'); // Tulostetaan konsoliin 'Button Harjoittelija clicked'
    // Kutsutaan haeHarjoittelija-funktiota annetulla URL:llä
    haeHarjoittelija('https://duunitori.fi/api/v1/jobentries?search=tieto-+ja+tietoliikennetekniikka+%28ala%29', div_harjoittelija);
    haeHarjoittelija('https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=351&valitutAmmattialat=251&valitutAmmattialat=252&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---', div_harjoittelija2)
});

// Funktio harjoittelija-työpaikkojen hakemiseen ja lisäämiseen sivulle
const haeHarjoittelija = (url,div) => {
    // Tehdään HTTP-pyyntö annettuun URL:ään
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlText => {
            // Parsitaan XML-vastaus tekstistä XML-dokumentiksi
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Haetaan kaikki 'item'-elementit XML-dokumentista
            const items = xmlDoc.querySelectorAll('item'); 
            // Käydään läpi jokainen 'item'-elementti
            items.forEach(item => {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const description = item.querySelector('description').textContent;
                const pubdate = item.querySelector('pubDate').textContent;

                // Muunnetaan päivämäärä haluttuun muotoon
                const dateObj = new Date(pubdate);
                const formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Tarkistetaan, sisältääkö kuvaus tai otsikko harjoittelijaan viittavia sanoja
                if (description.toLowerCase().includes('harjoi') || title.toLowerCase().includes('harjoi') ||
                    description.toLowerCase().includes('junior') || title.toLowerCase().includes('junior') ||
                    description.toLowerCase().includes('train') || title.toLowerCase().includes('train')  ||
                    description.toLowerCase().includes('academy') || title.toLowerCase().includes('academy') ||
                    description.toLowerCase().includes('rekrykoulu') || title.toLowerCase().includes('rekrykoulu') ||
                    description.toLowerCase().includes('rekrytoiva') || title.toLowerCase().includes('rekrytoiva')
                    ) {
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    div.innerHTML += `<h2>${title} (julkaistu: ${formattedDate})</h2><p><a href="${link}" target="_blank">${link}</a></p>`;
                }
            });
        })
        .catch(error => {
            // Virheenkäsittely: jos pyyntö epäonnistuu, tulostetaan virhe konsoliin
            console.error('Fetch error:', error);
        });
}

// Haetaan viittaus hakukenttään
const hakukentta = document.getElementById('textfield');

// Lisätään tapahtumankäsittelijä enter-näppäimen painallukselle hakukenttään
hakukentta.addEventListener('keypress', function (event) {
    // Tarkistetaan, onko painallus enter-näppäin
    if (event.key === 'Enter') {
        // Haetaan syötetty sana hakukentästä
        const hakusana = hakukentta.value.trim();
        // Tarkistetaan, ettei hakukenttä ole tyhjä
        if (hakusana !== '') {
            // Muodostetaan URL hakusanan perusteella
            const url = `https://duunitori.fi/api/v1/jobentries?search=${encodeURIComponent(hakusana)}`;
            // Tyhjennetään hakutulokset div-elementistä
            div_hakutyot.innerHTML = '';
            // Kutsutaan haeJaNaytaTyot-funktiota annetulla URL:llä ja div-elementillä
            haeJaNaytaTyot(url, div_hakutyot);
            // Muodostetaan URL hakusanan perusteella
            const url2 = `https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?hakusana=${encodeURIComponent(hakusana)}&hakusanakentta=sanahaku&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---`;
            // Tyhjennetään hakutulokset div-elementistä
            div_hakutyot2.innerHTML = '';
            // Kutsutaan haeJaNaytaTyot-funktiota annetulla URL:llä ja div-elementillä
            haeJaNaytaTyot(url2, div_hakutyot2);
        }
        // Tyhjennetään syöttökenttä
        hakukentta.value = '';
    }
});

// Funktio, joka käsittelee pudotusvalikon muutokset
function showUserChoice() {
    var selectElement = document.getElementById("mySelect");
    // Tyhjennetään div_valintatyot
    div_valintatyot.innerHTML = '';
    div_valintatyot2.innerHTML = '';

    // Kutsutaan funktiota, joka näyttää halutun alan työpaikat
    if (selectElement.value === 'dataanalysis') {
        const url= 'https://duunitori.fi/api/v1/jobentries?search=data+analysis+and+management+%28ala%29'
        haeJaNaytaTyot(url, div_valintatyot)
    };
    if (selectElement.value === 'järjestelmänhallinta') {
        const url= 'https://duunitori.fi/api/v1/jobentries?search=järjestelmähallinta+ja+tietohallinto+%28ala%29'
        haeJaNaytaTyot(url, div_valintatyot)
        const url2= 'https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=2521&valitutAmmattialat=2522&valitutAmmattialat=3511&valitutAmmattialat=3512&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---'
        haeJaNaytaTyot(url2, div_valintatyot2)        
    };
    if (selectElement.value === 'ohjelmointi') {
        const url= 'https://duunitori.fi/api/v1/jobentries?search=ohjelmointi+ja+ohjelmistokehitys+%28ala%29'
        haeJaNaytaTyot(url, div_valintatyot)
        const url2= 'https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=2514&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---'
        haeJaNaytaTyot(url2, div_valintatyot2)        
    };
    if (selectElement.value === 'palvelukehitys') {
        const url= 'https://duunitori.fi/api/v1/jobentries?search=palvelukehitys+ja+-suunnittelu%2C+konsultointi+%28ala%29'
        haeJaNaytaTyot(url, div_valintatyot)
        const url2= 'https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=2519&valitutAmmattialat=2511&valitutAmmattialat=2512&valitutAmmattialat=2513&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---'
        haeJaNaytaTyot(url2, div_valintatyot2)
    };
    if (selectElement.value === 'tietoliikenne') {
        const url= 'https://duunitori.fi/api/v1/jobentries?search=tietoliikennealan+tehtävät+%28ala%29'
        haeJaNaytaTyot(url, div_valintatyot)
    };
    if (selectElement.value === 'tyhjennä') {
        div_valintatyot.innerHTML = ''
        div_valintatyot2.innerHTML = ''
    };    
}

// Lisätään tapahtumankäsittelijä kemia-nappulan klikkaukselle
document.getElementById('Kemia').addEventListener('click', function () {
    console.log('Kemia button clicked');
    haeJaNaytaTyot('https://duunitori.fi/api/v1/jobentries?search=kemian+alan+teht%C3%A4v%C3%A4t+%28ala%29', div_kemia);
});

// Lisätään tapahtumankäsittelijä IT-nappulan klikkaukselle
document.getElementById('IT').addEventListener('click', function () {
    console.log('IT button clicked');
    haeJaNaytaTyot('https://duunitori.fi/api/v1/jobentries?search=tieto-+ja+tietoliikennetekniikka+%28ala%29', div_Ittyot);
    haeJaNaytaTyot('https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?valitutAmmattialat=351&valitutAmmattialat=251&valitutAmmattialat=252&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---', div_Ittyot2)
});

// Funktio työpaikkojen hakemiseen ja lisäämiseen sivulle
const haeJaNaytaTyot = (url, div) => {
    // Tehdään HTTP-pyyntö annettuun URL:ään
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlText => {
            // Parsitaan XML-vastaus tekstistä XML-dokumentiksi
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Haetaan kaikki 'item'-elementit XML-dokumentista
            const items = xmlDoc.querySelectorAll('item'); 
            // Käydään läpi jokainen 'item'-elementti
            items.forEach(item => {
                // Haetaan otsikko ('title'), linkki ('link') ja julkaisupvm ('pubDate') jokaisesta 'item'-elementistä
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const pubdate = item.querySelector('pubDate').textContent;

                // Muunnetaan päivämäärä haluttuun muotoon
                const dateObj = new Date(pubdate);
                const formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Lisätään otsikko, päivämäärä ja linkki HTML-div-elementtiin
                div.innerHTML += `<h2>${title} (julkaistu: ${formattedDate})</h2><p><a href="${link}" target="_blank">${link}</a></p>`;
            });
        })
        .catch(error => {
            // Virheenkäsittely: jos pyyntö epäonnistuu, tulostetaan virhe konsoliin
            console.error('Fetch error:', error);
        });
}

// Lisätään tapahtumankäsittelijä nappulan klikkaukselle
document.getElementById('tyhjennäkaikki').addEventListener('click', function () {

    divi.innerHTML = ''
    div_kemistityot2.innerHTML = ''
    div_harjoittelija.innerHTML = ''
    div_harjoittelija2.innerHTML = ''
    div_hakutyot.innerHTML = ''
    div_hakutyot2.innerHTML = ''    
    div_valintatyot.innerHTML = ''
    div_valintatyot2.innerHTML = ''   
    div_Ittyot.innerHTML = ''
    div_Ittyot2.innerHTML = ''
    div_kemia.innerHTML = ''
});