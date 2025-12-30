# Wirtschaftspsychologie Akademie - Anleitung

## Über die Anwendung
Eine moderne Web-Anwendung für die Wirtschaftspsychologie Akademie mit Informationen zu Seminaren, Trainings und Weiterbildungsangeboten.

## Systemvoraussetzungen
- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Optional: Ein lokaler Webserver (empfohlen)

## Starten der Anwendung

### Option 1: Direktes Öffnen im Browser (Einfachste Methode)

1. Navigieren Sie zum Projektverzeichnis
2. Doppelklicken Sie auf die Datei `index.html`
3. Die Anwendung öffnet sich automatisch in Ihrem Standard-Browser

**Hinweis:** Bei manchen Browsern können CORS-Einschränkungen auftreten. Falls die Anwendung nicht korrekt lädt, verwenden Sie Option 2.

### Option 2: Mit Python HTTP Server (Empfohlen)

**Für Python 3:**
```bash
# Terminal öffnen und zum Projektverzeichnis navigieren
cd /Users/florian.ruffner/Wirtschaftspsychologie

# Webserver starten
python3 -m http.server 8000
```

**Für Python 2:**
```bash
# Terminal öffnen und zum Projektverzeichnis navigieren
cd /Users/florian.ruffner/Wirtschaftspsychologie

# Webserver starten
python -m SimpleHTTPServer 8000
```

Dann öffnen Sie Ihren Browser und navigieren zu:
```
http://localhost:8000
```

### Option 3: Mit Node.js http-server

Falls Node.js installiert ist:

```bash
# http-server global installieren (einmalig)
npm install -g http-server

# Terminal öffnen und zum Projektverzeichnis navigieren
cd /Users/florian.ruffner/Wirtschaftspsychologie

# Webserver starten
http-server -p 8000
```

Dann öffnen Sie Ihren Browser und navigieren zu:
```
http://localhost:8000
```

### Option 4: Mit PHP Built-in Server

Falls PHP installiert ist:

```bash
# Terminal öffnen und zum Projektverzeichnis navigieren
cd /Users/florian.ruffner/Wirtschaftspsychologie

# Webserver starten
php -S localhost:8000
```

Dann öffnen Sie Ihren Browser und navigieren zu:
```
http://localhost:8000
```

## Server beenden

Um den lokalen Webserver zu beenden, drücken Sie im Terminal:
```
Strg + C  (oder Cmd + C auf macOS)
```

## Funktionen der Anwendung

- **Startseite:** Überblick über die Akademie und deren Angebote
- **Seminare:** Detaillierte Informationen zu verfügbaren Seminaren
- **Über uns:** Informationen über das Team und die Philosophie
- **Kontakt:** Kontaktmöglichkeiten und Anmeldung
- **Responsive Design:** Optimiert für Desktop, Tablet und Mobilgeräte

## Technologie-Stack

- **React 18:** Frontend-Framework (via CDN)
- **Babel Standalone:** JSX-Transformation im Browser
- **CSS3:** Moderne Styles mit CSS-Variablen und Animationen
- **Google Fonts:** Playfair Display & Source Sans 3

## Fehlerbehebung

### Die Seite lädt nicht richtig
- Stellen Sie sicher, dass Sie eine Internetverbindung haben (für CDN-Ressourcen)
- Versuchen Sie einen anderen Browser
- Verwenden Sie einen lokalen Webserver (Option 2, 3 oder 4)

### Bilder werden nicht angezeigt
- Überprüfen Sie, ob die Bilddateien im Projektverzeichnis vorhanden sind
- Stellen Sie sicher, dass die Dateipfade korrekt sind

## Support

Bei Fragen oder Problemen wenden Sie sich bitte an das Entwicklerteam.

