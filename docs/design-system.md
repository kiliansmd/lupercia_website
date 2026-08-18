# Lupercia Designsystem

## Leitidee

**Persönlicher Bonner Teesalon** verbindet die Ruhe eines unabhängigen Ladens mit
der Sorgfalt einer handgesetzten Speisekarte. Die Gestaltung lebt von warmen
Papierfarben, einer charaktervollen Sans-Serif-Typografie, asymmetrischen
Kompositionen und wenigen funktionalen Elementen. Sie vermeidet klassische
Card-Raster, starke Effekte, austauschbare Verläufe und eine generische
„Luxury Brand“-Anmutung.

## Bestandsaudit

Die fünf Seiten nutzen dieselbe Kopf- und Fußzeile sowie ein gemeinsames,
mobile-first aufgebautes Stylesheet. Inhalt, Reihenfolge und Funktionen bleiben
deshalb unangetastet; die Verfeinerung erfolgt über gemeinsame Tokens.

- **Typografie:** Überschriften, Bildmarken und redaktionelle Akzente nutzen eine
  Displayrolle, Navigation, Text, Labels und Buttons eine funktionale Rolle.
  Beide Rollen sind konsequent serifenlos; Größen skalieren per `clamp()`.
- **Farben:** Ivory und Paper tragen die Flächen, warmes Tintenbraun den Text.
  Terracotta und Gold markieren Herkunft und Details, Sage, Peach und Taupe
  gliedern längere Seiten zurückhaltend. Reines Schwarz und Weiß werden vermieden.
- **Abstände und Breiten:** Acht Spacing-Stufen, ein responsiver Gutter, eine
  maximale Inhaltsbreite von 96 rem und eine Lesebreite von 34 rem bilden das
  gemeinsame Raster. Die bestehenden Breakpoints bei 48 und 64 rem bleiben.
- **Radien und Schatten:** Fast alle Flächen bleiben bewusst kantig. Nur Logos
  sind rund; Buttons erhalten einen kaum sichtbaren Radius. Ein weicher Schatten
  ist Medien und ein nahezu unsichtbarer Schatten der sticky Navigation
  vorbehalten; Buttons und Logos bleiben ohne Schatten.
- **Cards und Sektionen:** Inhalte werden überwiegend durch Linien, Farbflächen
  und Abstand statt durch gleichförmige Karten gruppiert. Der hervorgehobene
  Termin bleibt über eine stärkere Anfangslinie erkennbar, ohne als schwebende
  Farbkarte aufzutreten. Status, ausstehende Aktionen, Zertifikatshinweise und
  Reservierungsstatus sind typografische Zeilen statt Chips oder Infoboxen.
- **Bilder:** Echte Salonbilder sind hochformatig und werden mit `object-fit`
  beschnitten; vorhandene abstrakte Platzhalter behalten ihre Proportionen.
  Bildrahmen und Zoombewegungen bleiben ruhig und sparsam.
- **Interaktion:** Primary, Secondary und Text Link bilden das vollständige
  Aktionssystem. Hover verändert Farbe oder Linie, nicht Form oder Position.
- **Navigation und Footer:** Die sticky Navigation wechselt auf kleinen Geräten
  in das vorhandene Vollbildmenü. Der dunkle Footer bleibt der gemeinsame,
  deutlich erkennbare Abschluss aller Seiten.
- **Bewegung:** Nur der erste Auftritt ausgewählter Inhalte wird enthüllt.
  `prefers-reduced-motion` schaltet Bewegung zuverlässig ab.

## Tokens

Alle produktiv verwendeten Werte stehen in `:root` von `styles.css`.

### Farbe

- `--color-ivory` und `--color-paper`: warme Haupt- und Kontrastflächen
- `--color-ink` und `--color-ink-soft`: warmer Text und zurückgenommener Fließtext
- `--color-taupe` und `--color-taupe-light`: ruhige redaktionelle Flächen
- `--color-leaf` und `--color-leaf-dark`: gedeckte natürliche Grünakzente
- `--color-terracotta` und `--color-burgundy`: sparsame Markenakzente
- `--color-gold` und `--color-gold-soft`: aus dem Lupercia-Siegel abgeleitete
  Akzente für Fokus, feine Linien und kleine redaktionelle Markierungen
- `--color-sage-wash` und `--color-peach-wash`: helle, freundliche
  Zwischenflächen für Geschichten, Salon- und Genussabschnitte
- `--color-deep-warm`: warmer dunkler Kontrast, der nur noch gezielt für wenige
  redaktionelle Schwerpunktflächen eingesetzt wird
- `--color-line` und `--color-line-inverse`: subtile Trennlinien

Reines Schwarz und Weiß werden vermieden. Farben dürfen nicht als knallige
Produktcodes oder großflächige Verläufe eingesetzt werden.

Die Grundstimmung orientiert sich eng an einem hellen, cremefarbenen Salon:
Ivory und warmes Papier bestimmen nahezu alle großen Flächen, Espresso-Braun die
Typografie und ein gedämpftes Amber kleine Labels, Linien und kursive Akzente.
Peach und Taupe unterscheiden redaktionelle Bereiche nur leicht voneinander.
Grün bleibt als leiser Verweis auf Tee und das florale Siegel auf Illustrationen
beschränkt; dunkles Braun erscheint gezielt bei CTAs und im Footer.

### Typografie

- **Source Sans 3** trägt als humanistische Sans sowohl die Display- als auch die
  funktionale Rolle. Gewicht, Größe, Laufweite und Position schaffen die
  Hierarchie, ohne den Auftritt durch einen geometrischen Font-Kontrast zu
  technisieren.
- Rollen: Display, H1, H2, H3, Body Large, Body, Small und Label/Navigation.
- `clamp()` sorgt für fließende Größen zwischen Mobile und Desktop.
- Große Headlines bleiben kurz und erhalten bewusst enge Zeilenhöhe und Laufweite.
- Überschriften nutzen balancierten Zeilenumbruch; Fließtext wird mit ruhiger
  Laufweite, kontrollierter Zeilenhöhe, 34 rem Lesebreite und optimiertem Umbruch
  gesetzt. Eyebrows verwenden das weichere Tintenbraun statt einer zusätzlichen
  kräftigen Akzentfarbe.

### Spacing und Layout

- Acht Stufen von `--space-1` bis `--space-8` bilden das Abstandssystem.
- `--gutter` steuert den responsiven Seitenrand.
- `--container-max` und `--copy-max` begrenzen Gesamt- und Lesebreite.
- `--radius-small`, `--radius-round`, `--shadow-soft` und `--shadow-media`
  verhindern neue, voneinander abweichende Einzelwerte.
- Sections verwenden auf großen Viewports vor allem `--space-8`.
- Mobile ist die Baseline; strukturelle Erweiterungen beginnen bei `48rem` und
  `64rem`.
- Linien ersetzen Boxen, wo Inhalte gegliedert werden müssen.

## Interaktive Elemente

Es gibt maximal drei Varianten:

1. `.button.button--primary` für die wichtigste verfügbare Aktion.
2. `.button.button--secondary` für ergänzende Aktionen.
3. `.text-link` für redaktionelle Verweise innerhalb der Seite.

Nicht verfügbare Aktionen sind keine Links oder Buttons. Sie werden als ruhige,
statische Coming-soon-Zeile dargestellt.

## Komponenten und Flächen

- Wiederkehrende Informationen beginnen bevorzugt mit einer 1-px-Linie und
  erhalten ihren Rhythmus durch vertikalen Abstand; ein umlaufender Rahmen ist
  nur für tatsächlich abgeschlossene, interaktive Elemente vorgesehen.
- Statusangaben und kleine Tags erhalten weder Pill-Radius noch gefüllten
  Hintergrund. Farbe, Versalien und eine kurze Linie reichen zur Einordnung.
- Ein redaktioneller Schwerpunkt darf eine stärkere 2-px-Anfangslinie verwenden.
  Schatten oder ein schwebender Kartenhintergrund sind dafür nicht vorgesehen.
- Zitate werden mit einer einzelnen seitlichen Linie gesetzt. Bild- und
  Illustrationsflächen bleiben eigenständig und werden nicht in Cards eingefasst.

## Bewegung

- Hoverzustände verwenden kurze Farb- oder Unterstrichübergänge.
- Der initiale Reveal bewegt Text nur um `1rem` und enthüllt Bildflächen ruhig.
- Keine dauerhaften, scrollgebundenen oder hektischen Animationen.
- `prefers-reduced-motion: reduce` deaktiviert Smooth Scrolling und verkürzt alle
  Bewegungen praktisch vollständig.

## Anwendung

- Neue Komponenten müssen vorhandene Tokens nutzen, bevor neue Werte entstehen.
- Neue Breakpoints werden nur bei einem echten Layoutbruch ergänzt.
- Fotografie soll künftig warm, natürlich, ungestellt und detailreich sein. Bis
  verifiziertes Bildmaterial vorliegt, bleiben die vorhandenen abstrahierten
  Teeillustrationen erhalten; Stockbilder oder vorgetäuschte Produktfotografie
  werden nicht eingesetzt.
- Die visuelle Hierarchie beginnt pro Section mit Label, Editorial Headline und
  optionalem ruhigem Fließtext. Zusätzliche UI wird vermieden.
