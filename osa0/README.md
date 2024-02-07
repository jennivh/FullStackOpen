0.4
Tässä oletetaan, että käyttäjä on jo päässyt https://studies.cs.helsinki.fi/exampleapp/notes-sivulle, eikä näitä asioita enää tarvitse ladata
1.	käyttäjä painaa Save-nappia
2.	selain lähettää palvelimelle HTTP POST:lla uuden muistiinpanon (new_note)
3.	palvelin lähettää selaimelle statuskoodin 302
4.	selain pyytää palvelimelta uudestaan kaikki muistiinpanot (notes)
5.	palvelin lähettää päivitetyt muistiinpanot (notes)
6.	selain pyytää tyylitiedoston (main.css)
7.	palvelin lähettää tyylitiedoston (main.css)
8.	selain pyytää Javascript-koodin (main.js)
9.	palvelin lähettää Javascript-koodin (main.js)
10.	selain pyytää muistiinpanojen raakadatan (data.json)
11.	palvelin lähettää raakadatan (data.json)

0.5
1.	selain pyytää palvelimelta sivun tyylitiedoston (main.css)
2.	palvelin lähettää selaimelle tyylitiedoston (main.css)

0.6
Myös tässä tehtävässä oletetaan, että käyttäjä on jo päässyt sivulle https://studies.cs.helsinki.fi/exampleapp/spa, eikä sivun avaamiseen liittyviä pyyntöjä esitetä
1.	Käyttäjä painaa Save-nappia
2.	selain lähettää palvelimelle HTTP POST:lla JSON-tyyppisen uuden muistiinpanon (new_note_spa)
3.	palvelin lähettää selaimelle statuskoodin 201
