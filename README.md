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

> - Aloitussivulla annetaan api avaimet ja valinta hankkia api avaimet palveluiden sivuilta (linkit rekistöröitymiseen). Avaimien syöttämisen jälkeen päästään eteenpäin.
> - Käyttäjä näkee ensin sivulla kartan, josta voi hiirellä valita mieleisen koordinaattikohteen, josta ilmestyy pop-up ikkunoilla paikkatietoa jne. kyseisestä paikasta.
> - Käyttäjä voi myös hakea tiettyä kaupunkia/maata, josta tulee valikko mistä valitaan oikea vaihtoehto, esim. painamalla 'Select', jonka jälkeen paikka ilmestyy kartalle ja kartan viereen ilmestyy näkymä alueen/maan tiedoista tms.
> - Hakukentän vierestä löytyy 'Suosikit' -valikko, joka noutaa tietokannasta tallennetut suosikit.
> - Lisäksi otetaan käyttöön FullStackOpen Osa 2:ssa tutut ilmoitukset.

**Tietokanta:**

- MongoDB

**Apit:**

    - Kaupunkitieto Api: https://documenter.getpostman.com/view/1134062/T1LJjU52#intro
    - Maatieto Api: https://restcountries.com/v3.1/all
    - Sää Api: https://www.weatherapi.com/
    - Kartta Api: https://developer.mapquest.com/user/login


**Setup:**
- npm intall:
- > 
