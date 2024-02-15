# Harjoitustyö - React

**Tämä harjoitustyö on tehty selainohjelmoinnin kurssia varten, johon on myös liitetty paikannusteknologiat -kurssin harjoitustyö.**

**Tämän harjoitustyön backend Node.js löytyy täältä:**

> https://github.com/kajok88/Node.git

**Idea:**

> Karttasovellus, jolla voi etsiä kaupunkeja ja niistä paikallis- ja säätietoa. Hakuja voi tallentaa myös suosikkeina tietokantaan, josta ne saadaan myös noudettua. Idean sain FullStackOpen osa2 tehtävästä 2.20.

## *Toteutus*

**Näkymässä:**

- Navigointipalkki, josta linkkejä painamalla aukeaa valikot sivuista. Valikoista löytyy:

  > - API avainten syöttäminen sovellukseen (mahdollisuus laittaa avaimet myös Session Storageen halutessa).
  > - Haku kenttä maiden hakuun
  > - Kaikki maailman pääkaupunkien paikantaminen haluamallaan pinnivärillä.
  > - Pinnien tallennus tietokantaan, sekä niiden (nimien) muokkaus ja poisto-operaatiot (CRUD). Tallennettuja pinnejä voidaan myös tuoda karttaan takaisin näkyviin.
  >
- React-Leaflet karttapohja.
- Karttapohjan päälle piirrettävät infolaatikot kohteista, jotka sisältävät mm.

  > - Lipun ja vaakunan
  > - Pääkaupungin ja maan nimen
  > - Sään
  > - Puhutut kielet
  > - Koordinaatit, kaupungin ja kunnan/osavaltion
  >
- Asetettua punaista pinniä klikkaamalla tulee näkyviin kohteen kellonaika.

**Toiminta/Ominaisuudet:**

> - Käytössä on kaksi apia, jotka vaativat kirjautumisen (WeatherApi ja TimezonDB), jotta käyttöön saa api-avaimet, mutta sovellus toimii kuitenkin ilman niitä, tosin sillon joutuu luopumaan säätiedoista ja paikallisesta kellonajasta.
> - Navigaatiopalkista syötetään api avaimet valikosta
>   "Modigy/Submit API Keys". Halutessaan nämä avaimet voidaan sijoittaa selaimen Session Storageen, jolloin avaimet selviää sivun uudelleen lataamisesta. Oletuksena avaimet säilötään useContextina sovelluksen sisälle.
> - Käyttäjä näkee sivulla kartanpohjan, josta voi hiirellä valita mieleisen kohteen, jota klikkaamalla asetetaan kartalle punainen pinni ja samalla ilmestyy näkymän oikeaan laitaan punareunainen pop-up ikkuna, sisältäen paikkatietoa kyseisestä kohteesta. Näkymään ilmestyy myös säätietoikkuna, antaen paikallista säätietoa, sekä myös pienempi ikkuna, josta näkee tarkat koordinaatit, johon pinni on asetettu. Punaista pinniä klikkaamalla tulee näkyviin kyseisen paikan kellonaika.
> - Käyttäjä voi myös etsiä ja valita haluamansa maan hakupalkista, jolloin sivun vasempaan laitaan ilmestyy sinireunainen pop-up ikkuna sisältäen myös paikkatietoa, mutta tällä kertaa paikkatiedon kohteena on kyseinen maa. Samaan aikaan asetetaan kartalle sininen pinni, merkitsemään maan pääkaupunki kartalla, sekä säätietolaatikko antamaan tämänhetkisen säätiedon pääkaupungista.
> - Karttapohjan vasemmasta alanurkasta löytyy myös "paikanna minut" - nappi, jolla käyttäjä voi paikantaa itsensä kartalla. Samalla näkymään ilmestyy paikallinen säätieto sivun alaosaan.
> - Jokaisen näkymään piirretyn ikkunan voi myös yksitellen sulkea ruksista, jos niin haluaa.
> - Navigointipalkista löytyy myös valikko "More", josta käyttäjä voi tuoda kartalle näkyviin joisen maailman pääkaupungin haluamallaan pinnivärillä (punainen, sininen, vihreä tai vaaleanpunainen). Nämä pinnit voidaan myös halutessa piilottaa.
> - Navigointipalkin oikeasta reunasta löytyy vielä "Favorites" -valikko, jossa käyttäjän on mahdollista tallentaa näkymässä oleva punainen tai sininen pinni haluamallaan otsikolla MongoDB Atlas -tietokantaan. Tässä näkymässä voidaan myös muokata otsikoita, sekä poistaa tallennettuja pinnejä. Valikosta voidaan myös tuoda (fetch) kartalle tietokantaan tallennettuja pinnejä, näyttäen niistä paikkatiedon jne.

# Arkkitehtuuri

![reactht_architecture](https://github.com/kajok88/React/assets/102037428/b5b05d53-dbb5-47e0-9bd4-e2f170b67030)

**Tietokanta:**

- MongoDB Atlas
  > Vaatii tunnuksen luomisen, ilmaisversio riittää.
  >

**Kartta:**

> React-Leaflet

**Käytetyt apit:**

- Maatieto Api:
  - https://restcountries.com/v3.1/all
- Sää Api:
  - https://www.weatherapi.com/
- Reverse Geocoding Api:
  - https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api#endpoint
- Paikallisaika Api:
  - https://timezonedb.com/****

> Huom! Näistä WeatherApi ja TimezoneDB tarvitsevat kirjautumisen, jotta käyttöön saa api avaimen. Molemmista riittää ilmaisversio.

**Tyylitys:**

> Tyylityksessä on käytetty react-bootstrap:ia.

**Requirements:**

- Jotta tietokantayhteys toimii, tarvitaan käyttöön backend, joka löytyy tämän dokumentin yläosassa olevasta github -linkistä.

**Setup:**

> - Varmista että node.js backend on käynnissä. Sitten terminaalista:

- npm install
- npm run dev

**Omia huomioita:**

- Apien yhteensovittaminen tuottaa myös haasteita; Se mitä reverse geokoodaus antaa koordinaattien perusteella esim. maan nimeksi, ei välttämättä ole samaa muotoa kuin RestCountries -apissa, josta k.o. maan lisätiedot pitäisi hakea.
  > Esim:
  > reverse Geokoodaus antaa Venäjän nimeksi: "Russian Federation (the)",
  > kun taas RestCountries api tuo Venäjästä tiedot nimen "Russia" alta.
  > Tämänlaisia yhteensopivuusongelmia voi tietysti koittaa korjata (muutama maa on
  > korjattu GetGeoData.jsx komponentissa), mutta kaikkien 250 maan läpi käyminen vie
  > kyllä oman aikansa, jos siihen ryhtyy.
  >

**Parannus-/Korjausehdotuksia/Huomioita:**

    - Tietokannasta haetulle siniselle pinnille ei ilmesty CountryFormia.

    - Turhat näkymän päivitykset pois. (Huomaa mm. kun pinnaa kohteen)

    - Lisää "toggleja" näkymän muokkaukselle, niin että tietty
	komponentti pysyy kokonaan piilossa halutessa.

    - Jokin huomautus/alertti jos ei ole backend/tietokantayhteyttä.

---

## FullStackOpen -osuus

FullStackOpen tehtäviä on tullut tehtyä Osa 3, tehtävään 3.9 asti. Nämä löytyvät omista brancheista:

> - Part2: Tehtävät 2.17 asti,
> - Countries: Tehtävät 2.18-2.20,
> - Phonebook: Tehtävät 3.9 asti.
