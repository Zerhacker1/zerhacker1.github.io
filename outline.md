# Beginn:
- Ziel des Projektes wiederholen (an das Video mit dem Auto erinnern, vielleicht sogar zeigen?)
- Demo zeigen (verschiedene Modelle (eines, das gut ist, eines, bei dem die Voxelisierung verbessert werden könnte, eines, bei dem der Zerfall langsam ist, weil zu viele Voxel))

# Inhalt:
- ModelDecay Klasse zeigen, Funktionalität und Komponenten erläutern:

Zerteilung von Block (Voxelisierung) und Zerfall (Animation)
Source code zeigen
Was von THREE.js genutzt, z.B. Textur samplen 
## Voxelisierung:
- inhaltlich das Gleiche wie der erste Vortrag (bessere Schaubilder -> einfaches Beispielmodell nehmen (z.B. Würfel) und als Wireframe darstellen, für Einfärbung Textur zeigen (z.B. Astronaut))
- Einfärbung der (inneren) Würfel
- Zeigen, was nicht berücksichtigt wird (z.B. metalness) und warum

## Zerfall:
- Erklären, warum es mit Physics Engines nicht funktioniert hat
- Iteratives Vorgehen erläutern ((zuerst fallende Würfel), dann Kurven berechnen, dann Gravitation, dann Vorberechnung der Pfade, dann Rotationen, dann Verschwindeeffekt)

# Ende:
- Grenzen einer CPU basierten Implementation
- kritisch über das Projekt reflektieren
- (GPU basierte Variante skizzieren)
- Allgemeines Learning
- Ausblick (Physics Engines, Materialien, Verallgemeinerung)
- Feature Matrix
- Summary
einblenden
Kraft nach Außen (abstrakter über Lösung nachdenken; quasi Effektkatalog)
Ausblendeeffekt als neuer First Class Citizen (Fragestellung)