# FullStackOpen - Puhelinluettelo

**Oletuksena käyttää node.js backendiä, joka löytyy:** 

> https://github.com/kajok88/NodeFSO


**Vaihtoehtoisesti voidaan käyttää myös Json-serveriä, jonka saa käyntiin:**

> npx json-server --port=3000 --watch db.json

**Ja muuttamalla services/person.js**:

> const baseUrl='http://localhost:3004/persons';
>
>> -> const baseUrl='http://localhost:3000/persons';
>>


**Käyntiin terminaalista komennolla:**

- npm run dev

**Asenna tarvittavat kirjastot:**

* npm install {kirjasto}
