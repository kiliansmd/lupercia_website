# Lupercia Website

Statische Website für https://lupercia.meindigitalerbetrieb.de/.

## Verbindlicher Quellcode

`main` in https://github.com/kiliansmd/lupercia_website ist die maßgebliche
Quelle. Änderungen werden in einem Branch vorbereitet, als Vercel-Preview geprüft
und anschließend nach `main` zusammengeführt. Produktion wird aus `main`
veröffentlicht, nicht aus lokalen Arbeitskopien mit uncommitteten Änderungen.

Vercel-Projekt: `v0-lupercia-website-design`
(`prj_kRUE6zXwQ5YjbnMYSCZ7HqgkjfDY`).

## Lokal prüfen

Node.js 24 verwenden. Es gibt keine npm-Abhängigkeiten.

```sh
npm run lint
npm run build
python3 -m http.server 8080 --directory dist
```

Danach http://localhost:8080 öffnen. Der Build kopiert acht HTML-Seiten und
lokale Assets nach `dist/`. CSS und JavaScript erhalten Dateinamen mit
Inhalts-Hash. `dist/`, `.vercel/` und `.env*` werden nicht eingecheckt.

## Änderung veröffentlichen

1. Aktuellen `main` holen und einen Arbeitsbranch erstellen.
2. Quellcode ändern und `npm run lint` sowie `npm run build` ausführen.
3. Branch pushen und Pull Request erstellen. Die Vercel-Git-Integration erstellt
   ein Preview. Seiten, Navigation und mobile Darstellung prüfen.
4. Nach erfolgreicher Prüfung nach `main` mergen. Das zugehörige
   Produktionsdeployment und die öffentliche Domain kontrollieren.

Direkte lokale `vercel --prod`-Deployments umgehen diesen Ablauf und sollten
nicht verwendet werden. Der dokumentierte Ablauf ist keine technische Sperre
gegen manuelle Deployments durch Vercel-Projektmitglieder.

## Herkunft des gesicherten Live-Stands

Am 8. September 2026 wurde der bis dahin separat gepflegte Live-Quellcode
übernommen. Ausgangsdeployment: `dpl_GxXBueF5Mg1mBmiQvp7Mp6VnwVgb`,
lokaler Branch `live/audit-fixes`, Commit
`ae76bdd5d63c6c15cf4cf151f7a4019945a5da58` plus uncommittete Änderungen.

Der Build aus dem gesicherten Arbeitsordner wurde mit der öffentlichen Domain
verglichen: alle 27 Dateien (acht HTML-Seiten, CSS, JavaScript und 17 Assets)
waren bytegleich. Die SHA-256-Werte stehen in
[`docs/live-baseline-2026-09-08.json`](docs/live-baseline-2026-09-08.json).
Diese Datei dokumentiert den historischen Ausgangsstand, keine unveränderliche
Vorgabe für spätere Weiterentwicklungen.

Die früheren Konzept- und Auditdokumente unter `docs/archive/` beschreiben
ältere Entwicklungsstände und sind keine aktuellen Implementierungsvorgaben.
