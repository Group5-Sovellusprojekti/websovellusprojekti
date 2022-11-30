# Syksyn 2022 ryhmäprojekti

## Projektin nimi: Web-sovellusprojekti

## Linkki appiin: 

## Projektin aihe ja tarkoitus
Projektin aiheena oli tehdä visualisointityökalu, jossa voidaan tarkastella erilaisia ilmastonmuutokseen liittyviä kuvaajia. Sovelluksessa on myös mahdollista tehdä käyttäjä, jolla voidaan luoda omia visualisointinäkymä yksilöllisellä url-tunnisteella. Näkymään käyttäjä voi valita haluamansa visualisoinnit, valita haluamansa asettelun ja kirjoittaa kuvaustekstin jokaiselle visualisoinnille. Käyttäjien luomat näkymät ovat löydettävissä julkisesti internetissä. 

Projektin tarkoituksena oli perehtyä full-stack ohjelmoinnin perusteisiin ja Kanban-kehitysmallin käyttämiseen.

## Mitä teknologioita projektissa on käytetty?

### frontend

Sovelluksen frontend on toteutettu käyttäen ReactJS nimistä JavaScript kirjastoa ja CSS:ää HTML:n tyylittämiseen. Erilaisten pakettien ja dependencyjen asentamiseen käytettiin npm:ää (node package manager).

### backend

Backend toteutettiin myös Javascriptillä käyttäen Node.js ajoympäristöä, käytössä on myös muunmuassa Express.js niminen kirjasto jota käytettiin sovelluksen API:n rakentamisessa, sekä Mongoose jonka avulla voitiin luoda yhteys tietokannan ja backendin välillä.

### tietokanta

Tietokannaksi valittiin MongoDB, joka on avoimen lähteen dokumenttipohjainen NoSQL tietokanta. Suurin syy MongoDB:n valinnalle oli sen yksinkertainen rakenne.

## Arkkitehtuuri ja rakenne

## Käyttöönotto
---
### lokaalisti

1. Kloonaa repositorio.
2. Siirry 'Client' kansioon ja asennna dependencyt komennolla 'npm install', tee sama 'Server' kansion sisällä.
3. Käynnistä sovelluksen frontend komennolla npm start 'Client' kansion sisällä.
4. Käynnistä sovelluksen backend komennolla npm run devStart 'Server' kansion sisällä.