# Technische Bestandsaufnahme und Umsetzungsskizze

Stand: 11. August 2026

## Kurzfazit

Lupercia ist derzeit eine kleine, statisch ausgelieferte One-Page-Website. Es gibt
kein Frontend-Framework und keinen Komponenten-Compiler. Diese Architektur ist
für den aktuellen Umfang schnell, robust und wartungsarm und wird deshalb nicht
ersetzt. Die nächste Ausbaustufe sollte die bestehende semantische HTML-Struktur,
die beiden vorhandenen Schriften und die warme Farbwelt schrittweise modularisieren,
statt die Seite in ein Framework zu migrieren.

## 1. Technischer Bestand

| Bereich | Befund |
| --- | --- |
| Framework und Version | Kein Framework. Semantisches HTML5, CSS und Browser-JavaScript ohne Runtime-Abhängigkeiten. |
| Build und Deployment | Ein npm-Skript erstellt `dist/`; Vercel veröffentlicht dieses Verzeichnis als statische Website. |
| Routing | Eine Seite (`index.html`) mit Sprungmarken: `#tees`, `#geschichte`, `#mate`, `#besuch`. Keine Unterseiten und kein Client-Router. |
| Komponenten | Keine echte Komponentenebene. Wiederkehrende Muster sind nur über CSS-Klassen (`section-no`, `text-link`, `wordmark`) abgebildet. |
| Styling | Eine globale CSS-Datei. Farben sind teilweise als Custom Properties vorhanden; Typografie, Abstände und Illustrationsfarben sind noch überwiegend lokal definiert. |
| Fonts | Google Fonts: **DM Sans** (400, 500, 600) für UI und Fließtext sowie **Instrument Serif** (normal/italic) für Editorial-Überschriften. |
| Farbwelt | Dunkles Grün, Creme, Papierweiß, Terrakotta, Salbei und Gold. Die Palette passt zur warmen, ruhigen Teeladen-Ausrichtung und bleibt Grundlage. |
| Header | Dreispaltiger Desktop-Header mit Wortmarke, Anchor-Navigation und CTA; unter 800 px wird daraus ein per JavaScript gesteuertes Vollbildmenü. |
| Footer | Wortmarke, Claim, Social-/Rechtslinks und Copyright; Impressum, Datenschutz und Instagram sind aktuell nur `#`-Platzhalter. |
| Startseite | Hero, Geschichte/Manifest, Teekategorien, Mate-Feature, Besuch/Kontakt und Footer. |
| Assets | Keine Bild-, Logo- oder Icon-Dateien. Teekanne, Tasse und Mate werden vollständig mit CSS gezeichnet. |
| Breakpoints | Ein Layout-Breakpoint bei `800px`; Fluid Type über `clamp()`. Die CSS-Basis ist aktuell eher Desktop-first. |
| Animationen | Sanfte `rise`-Animation im Hero, nur bei `prefers-reduced-motion: no-preference`; Smooth Scrolling ist global aktiv. |
| Formulare/Funktionen | Kein Formular, Shop oder Reservierungssystem. CTAs verwenden Sprungmarken, `mailto:` und `tel:`. Das einzige interaktive Verhalten ist das mobile Menü. |
| Datenquellen | Keine API und kein CMS. Alle sichtbaren Inhalte stehen direkt im HTML. Eine zentrale Content-Struktur wurde als Vorbereitung in `content/site-content.js` angelegt. |
| SEO/Metadata | Deutscher Dokument-Language-Code, Title, Description und Viewport sind vorhanden. Canonical URL, Open Graph, Social Preview, strukturierte Daten, Favicon und getrennte Seiten-Metadaten fehlen. |

## 2. Responsive und Accessibility

- Semantische Hauptbereiche, Überschriftenbezüge und ARIA-Labels sind vorhanden.
- Die mobile Navigation aktualisiert `aria-expanded` und den zugänglichen Buttonnamen.
- Die Hero- und Mate-Motive sind dekorativ beziehungsweise als Gesamtmotiv beschriftet;
  ihre vielen inneren Elemente sollten später explizit vor Assistenztechnik verborgen werden.
- `scroll-behavior: smooth` sollte zusätzlich für reduzierte Bewegung deaktiviert werden.
- Das mobile Layout wird erst in einem einzelnen Desktop-Max-Width-Breakpoint definiert.
  Bei der Weiterentwicklung sollte CSS mobile-first aufgebaut und nur mit inhaltlich
  begründeten Breakpoints erweitert werden.
- Fokuszustände, aktive Navigationszustände und ein Escape-/Outside-Click-Verhalten
  für das mobile Menü fehlen noch.

## 3. Technische Schulden und inkonsistente Patterns

1. `styles.css` ist minifiziert und enthält Layout, Komponenten und Illustrationen
   in sehr langen Zeilen. Das erschwert Reviews, gezielte Erweiterungen und Wartung.
2. Nur Farben sind teilweise tokenisiert. Font-Familien, Typostufen, Seitenränder,
   Abstände, Übergänge und Maximalbreiten sind nicht zentral benannt.
3. Wiederkehrende Inhalte und Navigation sind im HTML verteilt; Änderungen können
   dadurch inkonsistent werden.
4. Die aktuelle Build-Zeile zählt Dateien einzeln auf. Neue Laufzeit-Assets müssen
   sonst manuell ergänzt werden.
5. Platzhalterlinks sehen wie echte Funktionen aus. Sie müssen vor Veröffentlichung
   mit echten Zielen befüllt oder sichtbar als „Coming soon“ modelliert werden.
6. Telefonnummer und E-Mail wirken wie vorläufige Werte und müssen vor dem Launch
   redaktionell bestätigt werden.
7. Es gibt keine automatisierte HTML-/CSS-Prüfung und keine Browser-Tests.
8. Das mobile Menü setzt voraus, dass die erwarteten DOM-Elemente existieren;
   defensive Initialisierung und Tastatursteuerung fehlen.
9. Inhalte, Gestaltung und CSS-Illustrationen sind stark gekoppelt. Neue Sektionen
   sollten aus kleinen, benannten Mustern statt weiteren Seitensonderfällen entstehen.

## 4. Vergleich mit der Live-Version

Die angegebene URL `https://lupercia.meindigitalerbetrieb.de/` wurde aus dieser
Ausführungsumgebung sowohl über das Web-Werkzeug als auch direkt per `curl` aufgerufen.
Der Web-Zugriff wurde nicht autorisiert; der direkte HTTPS-Tunnel antwortete mit
HTTP 403. Ein belastbarer visueller oder inhaltlicher Live-Code-Vergleich war deshalb
in diesem Schritt nicht möglich und darf nicht vorgetäuscht werden.

Vor dem nächsten visuellen Schritt ist außerhalb dieser eingeschränkten Umgebung
zu prüfen:

- Welche Version aktuell öffentlich ausgeliefert wird und ob sie dem Branch entspricht.
- Welche realen Kontaktdaten, Öffnungszeiten, Adresse und Social Links live sind.
- Ob Bildmaterial, Logo-Dateien, Rechtstexte oder Analytics nur im Live-System liegen.
- Welche mobile Darstellung und Ladezeiten die Live-Version tatsächlich hat.

## 5. Umsetzungsskizze – kein Rewrite

### Erhalten

- statische Architektur ohne zusätzliche Runtime-Dependencies
- semantische One-Page-Struktur und Anchor-Navigation
- DM Sans und Instrument Serif
- Grundpalette aus Grün, Creme, Terrakotta, Salbei und Gold
- ruhige Editorial-Typografie, großzügige Flächen und reduzierte Animation
- progressive, einfache Kontaktwege über Telefon und E-Mail

### Refaktorieren

- CSS lesbar in `tokens`, `base`, `components` und `sections` gliedern, ohne die
  sichtbare Gestaltung in einem Schritt auszutauschen
- Mobile-first-Regeln aufbauen und Breakpoints anhand realer Layoutgrenzen wählen
- Header, Section-Intro, Text-Link, Content-Liste und Footer als wiederverwendbare
  Muster definieren
- zentrale Content-Struktur schrittweise zur einzigen Quelle für Navigation,
  Teekategorien, Kontakt und Social Links machen
- Build-Skript bei Einführung weiterer Assets auf eine kleine, explizite statische
  Asset-Pipeline erweitern

### Erweitern

- echte Teedaten mit stabilen IDs, Kategorien, Aromaprofilen, Verfügbarkeit und
  optionalen Zubereitungshinweisen
- SEO um Canonical, Open Graph, Social Image, Favicon und `LocalBusiness`-/
  `Store`-strukturierte Daten
- zugängliches Menüverhalten mit Escape-Taste, Fokusmanagement und klaren Fokusstyles
- reale Ladeninformationen und rechtliche Seiten, sobald die Inhalte bestätigt sind

### Ersetzen

- tote `#`-Links durch bestätigte Ziele oder ehrliche „Coming soon“-Zustände
- vermutete Kontaktdaten durch verifizierte Geschäftsdaten
- seitenspezifische CSS-Sonderfälle nur dort, wo ein wiederverwendbares Muster nicht
  sinnvoll ist

## 6. Vorbereitung in diesem Schritt

`content/site-content.js` definiert eine kleine, frameworkunabhängige Content-Struktur
für Navigation, Teekategorien, Kontakt und noch nicht verfügbare Ziele. Sie wird
bewusst noch nicht zur Laufzeit gerendert: Der vorhandene HTML-Inhalt bleibt als
SEO-freundliche und ohne JavaScript nutzbare Quelle bestehen, bis im nächsten Schritt
eine passende progressive Rendering-Strategie festgelegt ist.

Die npm-Skripte benennen Build, Check, Typecheck, Lint und Test explizit. Da das
Projekt weder TypeScript noch einen Linter oder ein Test-Framework verwendet,
führen `typecheck`, `lint` und `test` derzeit dependency-freie Syntax-/Strukturchecks
aus. So bleibt die bestehende Architektur intakt, während CI und die folgenden
Umsetzungsschritte stabile Einstiegspunkte erhalten.

## 7. Architektur für die nächsten Schritte

1. **Content:** bestätigte Inhalte zuerst in `content/site-content.js` pflegen.
2. **Markup:** semantisches, serverlos auslieferbares HTML als Baseline behalten.
3. **Styling:** bestehende Designsprache über CSS Custom Properties und kleine,
   wiederverwendbare Klassen ausbauen.
4. **Interaktion:** nur progressive Browser-JavaScript-Module für echte Funktionen.
5. **Build:** statische Dateien ohne Framework- oder Bundler-Abhängigkeit nach
   `dist/` kopieren und dort prüfen.
6. **Qualität:** nach jedem Schritt `npm run build`, `npm run typecheck`,
   `npm run lint` und `npm test` ausführen.

