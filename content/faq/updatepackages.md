[Home](/) > [FAQ](/faq/)
# Wie aktualisiere ich die verwendeten Komponenten auf die aktuellsten Versionen?
Die verwendeten Komponenten des AskSherlock-Projekts sind als sogenannte **Abhängigkeiten** in der Datei ```packages.json```im Wurzelverzeichnis der Anwendung hinterlegt.

Um die Abhängigkeiten der Komponenten auf ihre jeweiligen neuesten Versionen zu aktualisieren, muss man folgende Schritte ausführen:

1. Man öffnet das Terminal und navigiert zum Wurzelverzeichnis der Anwendung.
2. Dann führt man den Befehl `yarn outdated` aus, um zu sehen, welche Abhängigkeiten veraltet sind und aktualisiert werden müssen.
3. Sobald man eine Liste mit veralteten Abhängigkeiten hat, führt man den Befehl `yarn upgrade` aus, um sie auf ihre neuesten Versionen zu aktualisieren. Dies aktualisiert alle Abhängigkeiten auf ihre neuesten Versionen, einschließlich derjenigen, die als "deprecated" markiert wurden.
4. Nachdem das Update abgeschlossen ist, kann man `yarn outdated` erneut ausführen, um zu überprüfen, ob noch Abhängigkeiten veraltet sind. Wenn ja, kann man den Vorgang wiederholen, bis alle Abhängigkeiten auf dem neuesten Stand sind.
5. Abschließend führt man `yarn audit` aus, um nach Sicherheitslücken in den aktualisierten Abhängigkeiten zu suchen. Wenn es Probleme gibt, befolgt man die Anweisungen im Audit-Bericht, um sie zu lösen.

 Diese Herangehensweise gilt generell für alle Nuxt-Projekte.