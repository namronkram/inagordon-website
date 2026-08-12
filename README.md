# Website Ina Gordon — Diplom-Psychologin · Systemisch-Integrative Sozialtherapeutin

Zweisprachige (DE/EN) Ein-Seiten-Website mit Impressum und Datenschutzerklärung.
Die finale Veröffentlichung erfolgt auf **inagordon.com** (GoDaddy). Dieser Repository dient als Staging/Preview.

## Struktur

```
index.html        Startseite (DE/EN, alle Inhalte)
impressum.html    Impressum (DE/EN)
datenschutz.html  Datenschutzerklärung (DE/EN)
404.html          Eigene Fehlerseite
css/site.css      Design (Creme · Rosé · Gold · Salbeigrün · Fraunces/Karla)
js/site.js        Sprachumschaltung (DE|EN), Navigation, Kontaktformular
logo.png          Logo (transparenter Hintergrund)
portrait.png      Portrait
apple-touch-icon.png  Favicon
robots.txt, sitemap.xml
```

## Texte bearbeiten

Alle Website-Texte stehen in `index.html` im Block `window.LANG_DATA = { de:{…}, en:{…} }`.
Deutsch und Englisch werden dort parallel gepflegt. Nur den Text zwischen den Anführungszeichen `"…"` ändern.
Die sichtbaren Texte im HTML (z. B. Überschriften) sind nur Ausgangswerte und werden von `js/site.js` überschrieben.

Bilder tauschen: `logo.png` bzw. `portrait.png` ersetzen (Dateiname beibehalten).

## Kontaktformular

Das Formular braucht einen Formular-Backend-Dienst, sobald die geschäftliche E-Mail-Adresse feststeht.
In `index.html` den Wert `window.FORM_ENDPOINT = "";` durch die Formspree-/FormSubmit-URL ersetzen.
Ohne Endpoint zeigt das Formular eine freundliche Hinweis-Nachricht.

## Lokal testen

Aufgrund der Sprachumschaltung (localStorage) am besten über einen lokalen Server öffnen,
nicht direkt per Datei-Doppelklick:

```bash
python3 -m http.server 8000 --directory .
# dann http://localhost:8000
```
