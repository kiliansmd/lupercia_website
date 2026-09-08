# Conversion-Pfade

## Analyse

Vor der Vereinheitlichung verwendete die Website unter anderem „Salon entdecken“,
„Tea Time reservieren“, „Besuch planen“, „Alle Begegnungen“, „Private Anfrage“ und
„Geschenkbox zusammenstellen“. Mehrere Formulierungen führten zum gleichen Ziel
oder sahen trotz fehlender Buchungsstrecke wie unterschiedliche Funktionen aus.

Bestätigte Telefonnummern, E-Mail-Adressen, Reservierungs- oder Anfrageformulare
liegen weiterhin nicht vor. Deshalb darf keine der entsprechenden Aktionen eine
direkte Buchbarkeit vortäuschen.

## Verbindliche Aktionen

| Handlung | Verwendung | Aktueller Zustand |
| --- | --- | --- |
| **Tisch reservieren** | Header, Hero, Tea Time, Salon | Sichtbar als `coming soon`, kein Link oder Button |
| **Event ansehen / anmelden** | Startseite und Veranstaltungsseite | „Event ansehen“ führt zur Übersicht; Anmeldung ist bis zu einer echten URL nicht interaktiv |
| **Geschenkbox anfragen** | Geschenkbox-Teaser | Sichtbar als `coming soon`, kein Link oder Button |
| **Lupercia besuchen** | Hero und Seitenabschlüsse | Führt zu `/salon/#besuch` |

## Regeln für die Erweiterung

1. Eine Aktion wird erst als Link oder Button ausgegeben, wenn ein echtes Ziel
   existiert.
2. Reservierung, Event-Anmeldung und Geschenkbox-Anfrage erhalten ihre Ziel-URL
   aus `siteContent.conversionActions` beziehungsweise dem jeweiligen Event.
3. Header und mobile Navigation verwenden dieselbe Reservierungsaktion und
   dasselbe Wording.
4. Editoriale Navigation bleibt möglich, wird aber nicht als zusätzliche primäre
   Handlung gestaltet.
5. Neue Kontaktkanäle werden erst nach Bestätigung der Geschäftsdaten ergänzt.
