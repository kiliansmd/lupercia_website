# Lupercia Designsystem

## Leitidee

**Warm editorial tea salon** verbindet die Ruhe eines unabhängigen Teeladens mit
der visuellen Sorgfalt eines Gastronomie- und Lifestyle-Magazins. Die Gestaltung
lebt von großzügigem Weißraum, markanter Serifentypografie, asymmetrischen
Kompositionen und wenigen funktionalen Elementen. Sie vermeidet klassische
Card-Raster, Schatten, Glas-Effekte, dekorative Icons und austauschbare Verläufe.

## Tokens

Alle produktiv verwendeten Werte stehen in `:root` von `styles.css`.

### Farbe

- `--color-ivory` und `--color-paper`: warme Haupt- und Kontrastflächen
- `--color-ink` und `--color-ink-soft`: warmer Text und zurückgenommener Fließtext
- `--color-taupe` und `--color-taupe-light`: ruhige redaktionelle Flächen
- `--color-leaf` und `--color-leaf-dark`: gedeckte natürliche Grünakzente
- `--color-terracotta` und `--color-burgundy`: sparsame Markenakzente
- `--color-line` und `--color-line-inverse`: subtile Trennlinien

Reines Schwarz und Weiß werden vermieden. Farben dürfen nicht als knallige
Produktcodes oder großflächige Verläufe eingesetzt werden.

### Typografie

- **Instrument Serif** ist die Display- und Editorial-Schrift.
- **DM Sans** ist die funktionale Schrift für Navigation, Labels, Text und Buttons.
- Rollen: Display, H1, H2, H3, Body Large, Body, Small und Label/Navigation.
- `clamp()` sorgt für fließende Größen zwischen Mobile und Desktop.
- Große Headlines bleiben kurz und erhalten bewusst enge Zeilenhöhe und Laufweite.

### Spacing und Layout

- Acht Stufen von `--space-1` bis `--space-8` bilden das Abstandssystem.
- `--gutter` steuert den responsiven Seitenrand.
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
