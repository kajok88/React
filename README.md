# React -Tehtävät ja harjotustyö

**Setup terminaalista:**

- npm install
- npm install axios
- npm install json-server

- npm install -g react-devtools

---

**Json serveri päälle:**
- npx json-server --port=3000 --watch db.json

**Run:**
- npm run dev

---

Tehtävät:
https://fullstackopen.com/osa2/


## Harjoitustyö

**Idea:**

    Karttasovellus, jolla voi etsiä kaupunkeja ja niistä paikallista- ja säätietoa. Hakuja voi tallentaa myös Suosikkeina, jotka saa myös noudettua tietokannan avulla.

    Idea syntyi Osa 2:n loppupuolella, sekä paikannusteknologioiden kurssin yhteydessä.

**Näkymässä:**
    
    - Aloitussivu joka kysyy palveluiden API-keyt (Sää ja kartta)
    - Hakukenttä
    - Karttapohja
    - Kohteen tiedot
        - Lippu
        - Väkiluku
        - Sää ja kellonaika
    
    -Toiminta:
        - Aloitussivulla annetaan api keyt ja valinta hankkia api keyt palveluiden sivuilta (linkit). Avaimien syöttämisen jälkeen päästään eteenpäin.
        - Kun käyttäjä hakee tiettyä kaupunkia/maata, tulee valikko josta valitaan oikea vaihtoehto, esim. painamalla 'Select', jonka jälkeen paikka ilmestyy kartalle ja kartan viereen ilmestyy näkymä alueen/maan tiedoista ym.
        - Hakukentän vierestä löytyy 'Suosikit' -valikko, joka noutaa tietokannasta tallennetut suosikit.
        - Lisäksi otetaan käyttöön Osa 2:ssa tutuksi ilmoitukset.


**Materiaali:**

    - Tieto Api: https://documenter.getpostman.com/view/1134062/T1LJjU52#intro
    - Sää Api: https://www.weatherapi.com/
    - Kartta Api: https://developer.mapquest.com/user/login

