# Harjoitustyö

**Tämä harjoitustyö on tehty selainohjelmoinnin kurssia varten, johon on myös liitetty paikannusteknologiat -kurssin harjoitustyö -osuus.**

**Idea:**

> Karttasovellus, jolla voi etsiä kaupunkeja ja niistä paikallis- ja säätietoa. Hakuja voi tallentaa myös suosikkeina tietokantaan, josta ne saadaan myös noudettua.

## *Suunnitelma*

**Näkymässä:**

- Aloitussivu joka kysyy palveluiden API-keyt (Sää ja kartta)
- Hakukenttä
- Karttapohja
- Kohteen tiedot:
  - Lippu
  - Väkiluku
  - Sää ja kellonaika

**Toiminta:**

> - Aloitussivulla syötetään valikosta api avaimet. Ohjelmaa pystyy käyttämään myös ilman avaimia, mutta kaikki ominaisuudet eivät ole käytössä.
> - Käyttäjä näkee sivulla kartan, josta voi hiirellä valita mieleisen koordinaattikohteen, josta ilmestyy pop-up ikkunoilla paikkatietoa kyseisestä kohteesta.
> - Käyttäjä voi myös hakea tiettyä kaupunkia/maata, josta tulee valikko mistä valitaan oikea vaihtoehto, esim. painamalla 'Show', jonka jälkeen paikka ilmestyy kartalle ja kartan viereen ilmestyy näkymä alueen/maan tiedoista tms.
> - Hakukentän vierestä löytyy 'Suosikit' -valikko, joka noutaa tietokannasta tallennetut suosikit.
> - Lisäksi otetaan käyttöön FullStackOpen Osa 2:ssa tutut ilmoitukset.

**Tietokanta:**

- MongoDB Atlas

**Apit:**

    - Maatieto Api: https://restcountries.com/v3.1/all
    - Sää Api: https://www.weatherapi.com/
    - Reverse Geocoding Api: https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api#endpoint
    - Paikallisaika Api: https://timezonedb.com/

> WeatherApi ja TimezoneDB tarvitsevat kirjautumisen, jotta käyttöön saa api avaimen.

**Setup:**

- npm install
- npm run dev

**Muuta/Omia huomioita:**

- Apien yhteensovittaminen tuottaa myös haasteita; Se mitä reverse geokoodaus antaa esim. maan nimeksi, ei välttämättä ole samaa muotoa kuin restCountries apissa, josta k.o. maan lisätiedot pitäisi hakea.
  > Esim:
  > reverse Geokoodaus antaa Venäjän nimeksi: "Russian Federation (the)",
  > kun taas RestCountries api tuo Venäjästä tiedot nimen "Russia" alta.
  > Tämänlaisia yhteensopivuusongelmia voi tietysti koittaa korjata (muutama maa on
  > korjattu GetGeoData.jsx komponentissa), mutta kaikkien 250 maan läpi käyminen vie
  > kyllä oman aikansa, jos siihen ryhtyy.
  >

# Arkkitehtuuri

![reactht_architecture](https://github.com/kajok88/React/assets/102037428/842adae8-87ab-421f-9526-1b70268e55b9)
