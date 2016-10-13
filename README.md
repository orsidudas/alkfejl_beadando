#Dokumentáció
##Filmadatbázis

Készítette: Dudás Orsolya (PJ1L4K)

###Követelmény-analízis

**Funkcionális követelmények**
+ Legyen lehetőség regisztrációra.
+ Regisztrálást követően a felhasználó be tudjon lépni, illetve ki tudjon jelentkezni.
+ Csak bejelentkezett felhasználók által elérhető funkciók:
  + új film felvétele az adatbázisba
  + a meglévő filmek szerkesztésére
  + a meglévő filmek törlése
  + filmek értékelése
  + filmek részletes adatainak megtekintése
  + új elem felvétele után a felhasználó visszakapja egy listában az eddig felvett elemeit, és azok leírását

**Nem funkcionális követelmények:**
+ Könnyű áttekinthetőség: Filmműfaj szerinti csoportosítás
+ Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
+ Megbízhatóság: jelszóval védett funkciók, csak regisztrált felhasználó tudjon belépni

**Szakterületi fogalomjegyzék**

+ **film:** olyan objektum, melynek, címe, rendezője, műfaja, illetve értékelése lehet
+ **értékelés:** 1-től 10-ig terjedő skálán a felhasználó által adott érték
+ **lista:** filmek gyűjteménye
+ **módosítás:** film adott tulajdonságainak megváltoztatása
+ **törlés:** film eltávolítása a listából

**Filmműfajok:**

+ **Akciófilm:** Az akciófilm a tömegfilm egyik jellegzetes műfaja, melyekben hagyományosan megtalálhatók a robbanások, az ökölharcok, a lövöldözések, a lovas és az autós üldözések.
+ **Melodráma:** A szerelmi vetélkedésről, férfi és nő testi –lelki konfliktusairól szól (végzetes szerelmi szenvedély) – váratlan cseleményfordulatok, nem ritkán tragikus vég jellemzi
+ **Fantasy:** A fantasztikus filmek jellegzetes alműfaja, mely mítikus, képzeletbeli helyszíneken játszódó hősi kalandokat mesél el, emberfeletti és földöntúli figurák főszereplésével.
+ **Horror:** A horrorfilm olyan alkotás, melyben félelem- és borzalomérzetet kívánnak kelteni a nézőben.
+ **Kaland:**  A kalandfilm népszerű tömegfilmműfaj, melynek izgalmas eseményekben bővelkedő történetei a néző világától időben, térben távol játszódnak le. 
+ **Krimi:** Egy vagy több összefüggű bűncselekmény elkövetését és/vagy felderítését bemutató alkotás;
+ **Romantikus:** A vonzalmat, a kibontakozó vagy megújuló szerelmet két ember kapcsolatán keresztül bemutató mű.
+ **Sorozatok:** Több, nem ritkán 20-40 epizódból álló film.
+ **Vígjáték:** A vígjáték lazán szőtt cselekménye túlzásba vitt helyzetekkel és akciókkal, karikírozott nyelvvel és esendő karakterekkel dolgozik.
+ **Western:** Műfaji ismérve szerint a western az amerikai Vadnyugaton játszódó kalandfilm.

###Szerepkörök, használatieset-modell

**Vendég:** Csak a publikus oldalakat éri el
+ Főoldal
+ Bejelentkezés
+ Regisztráció

**Bejelentkezett felhasználó:** A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
+ Új film felvétele
+ Meglévő film megtekintése
+ Meglévő film szerkesztése
+ Meglévő film törlése
+ Film értékelése
+ Kijelentkezés

![database](images/haszn_diagr_1.png)

**Új film felvételének folyamata:**

![database](images/folyamat_ujfilm.png)

###Oldaltérkép:

+ **Publikus:**
  + Főoldal
  + Bejelentkezés
  + Regisztráció

+ **Bejelentkezett:**
  + Főoldal
  + Filmek listája
    + Új film felvétele
    + Film megtekintése
      + Film törlése
      + Film szerkesztése
      + Film értékelése
  + Kijelentkezés

TERVEZÉS LÉPÉSEI
követelmények összegyűjtése, követelmény-analízis
szerepkörök, használati esetek, folyamatok meghatározása
(oldalfunkciók)
oldalvázlatok készítése
site struktúra (oldaltérkép)
architektúra terv
adatbázis tervezése
designtervek készítése



