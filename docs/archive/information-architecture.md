# Informationsarchitektur und globale Navigation

## Primäre Struktur

Die Lupercia-Website nutzt eine statische, schrittweise erweiterbare
Mehrseitenarchitektur. „Tee & Genuss“ ist die erste eigenständige Unterseite;
weitere Startseitenziele besitzen stabile IDs, die später ohne Umbenennung auf
eigene Seiten abgebildet werden können.

| ID | Aktuelles Ziel | Spätere Route | Status |
| --- | --- | --- | --- |
| `salon` | `/salon/` | `/salon/` | eigenständige Seite vorhanden |
| `tea` | `/tee-genuss/` | `/tee-genuss/` | eigenständige Seite vorhanden |
| `events` | `/veranstaltungen/` | `/veranstaltungen/` | eigenständige Seite vorhanden |
| `maria` | `/maria/` | `/maria/` | eigenständige Seite vorhanden |
| `gift-box` | `#geschenkbox` | `/geschenkbox/` | Teaser vorhanden, Konfiguration Coming soon |
| `visit` | `/salon/#besuch` | `/salon/#besuch` | in Salonseite integriert |

Die Reihenfolge wird in `content/site-content.js` zentral gepflegt. Noch nicht
verfügbare Angebote führen zu ehrlichen redaktionellen Platzhaltern innerhalb der
Seite und nicht zu leeren Seiten oder scheinbar funktionsfähigen Formularen.

Veranstaltungen besitzen bereits stabile Slugs. Spätere Detailseiten folgen dem
Schema `/veranstaltungen/{slug}/`; bis solche Seiten tatsächlich umgesetzt sind,
werden aus den redaktionellen Eventelementen keine leeren Detailseiten verlinkt.

## Header

- Der Header ist sticky und wechselt nach kurzem Scrollen in die kompakte,
  vollständig deckende Variante `.is-scrolled`.
- Das vorbereitete Attribut `data-theme="on-image"` ermöglicht weißen Text und
  Linien auf einem zukünftigen Hero-Foto; beim Scrollen gilt wieder die lesbare
  Standardvariante.
- Desktop zeigt sechs ruhige Navigationspunkte und die primäre Reservierungs-CTA.
- Mobile nutzt eine Vollbildnavigation. Escape schließt das Menü und gibt den
  Fokus an den Menübutton zurück; die Seite scrollt bei offenem Menü nicht.
- Solange keine echte Buchungsstrecke existiert, ist „Tisch reservieren“ sichtbar,
  aber bewusst kein Link oder Button und als Coming soon gekennzeichnet.

## Footer

Der Footer enthält ausschließlich Marke und Claim, Adresse, Öffnungszeiten,
Kontakt, die primäre Navigation sowie Impressum und Datenschutz. Nicht bestätigte
Geschäftsdaten und Rechtsseiten sind ausdrücklich als Coming soon modelliert.
Instagram wird erst ergänzt, wenn ein bestätigtes Profil vorliegt.

## Mehrsprachigkeit

Es wird kein Sprachumschalter angezeigt, solange nur Deutsch verfügbar ist.
`siteContent.locale` hält `de` als einzige verfügbare Sprache und `en`/`es` nur als
Planungsinformation. Für eine spätere Einführung gelten folgende Bedingungen:

1. Jede veröffentlichte Sprache erhält vollständige Inhalte und eigene URLs.
2. Navigation, Metadata und strukturierte Daten stammen aus derselben Locale.
3. `hreflang` und ein echter Sprachumschalter werden gemeinsam eingeführt.
4. Es gibt keinen Mischbetrieb aus übersetzten Labels und deutschen Seiteninhalten.
