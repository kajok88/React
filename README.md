# Harjoitustyö

**Tämä harjoitustyö on tehty selainohjelmoinnin kurssia varten, johon on myös liitetty paikannusteknologiat -kurssin harjoitustyö -osuus.**

##### **Idea:**

    Karttasovellus, jolla voi etsiä kaupunkeja ja niistä paikallis- ja säätietoa. Hakuja voi tallentaa myös suosikkeina tietokantaan, josta ne saadaan myös noudettua.

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

> - Aloitussivulla annetaan api keyt ja valinta hankkia api keyt palveluiden sivuilta (linkit). Avaimien syöttämisen jälkeen päästään eteenpäin.
> - Kun käyttäjä hakee tiettyä kaupunkia/maata, tulee valikko josta valitaan oikea vaihtoehto, esim. painamalla 'Select', jonka jälkeen paikka ilmestyy kartalle ja kartan viereen ilmestyy näkymä alueen/maan tiedoista ym.
> - Hakukentän vierestä löytyy 'Suosikit' -valikko, joka noutaa tietokannasta tallennetut suosikit.
> - Lisäksi otetaan käyttöön FullStackOpen Osa 2:ssa tutut ilmoitukset.



**Tietokanta:**

- MongoDB


**Apit:**

    - Tieto Api: https://documenter.getpostman.com/view/1134062/T1LJjU52#intro
    - Sää Api: https://www.weatherapi.com/
    - Kartta Api: https://developer.mapquest.com/user/login
