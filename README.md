# Wirtschaftspsychologie – Trainings-Portal (Frontend-Mockup)

Dieses Repository enthält ein **Frontend-only Website-Mockup** (kein Backend).  
Alle Aktionen (Buchung, Ladezustand, Bestätigung) sind **simuliert**.

## Inhalte / Views

- **Home**: Hero, Trainer-Team, Usability-Prinzipien, Unhappy‑Path Demo (Modal)
- **Seminare**: Portfolio (Anchoring/Decoy), CTA „Buchen testen“
- **Detail**: „Mitarbeitermotivation“ inkl. Herzberg (Zwei‑Faktor‑Theorie)
- **Buchung**: 2‑Step‑Flow (Daten → Review), Preisrechner (Teilnehmer × Preis), Validierung, Confirm‑Modal, Loading‑Overlay

## Starten

Option A (simpel): `index.html` direkt im Browser öffnen.

Option B (empfohlen – lokaler Server):

```bash
cd /Users/florian.ruffner/Wirtschaftspsychologie
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Tech

- `index.html` (alle Views)
- `styles.css` (Design-Tokens: Blau/Gelb/Schwarz)
- `app.js` (Routing, Preisrechner, Validierung, Simulation)


