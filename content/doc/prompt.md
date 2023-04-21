# Prompts und Prompt Templates

## Was ist ein Prompt?

Ein Prompt ist ein kurzer Text oder eine Frage, die als Eingabe für ein [Large Language Model](./llm.md) (LLM) verwendet wird, um Texte zu generieren oder andere Aufgaben auszuführen. Ein Prompt gibt dem LLM eine Richtung oder eine Vorlage, nach der es Texte generieren oder eine bestimmte Aufgabe ausführen kann.

Ein Beispiel für einen Prompt könnte sein:
```
Schreibe eine Kurzgeschichte im Stil von Arthur Conan Doyle.
````
Das LLM würde dann basierend auf diesem Prompt eine Geschichte generieren, die einer Geschichte von Sherlock Holmes ähnelt.

Prompts können unterschiedlich lang sein und auch Anweisungen enthalten, wie die Antwort formuliert werden soll. Ein Beispiel dazu könnte sein:

```
Gib mir die Antwort in fränkischer Mundart
```

## Was ist ein Prompt-Template?

Ein Prompt-Template ist eine Vorlage, die verwendet wird um immer gleichartige Prompts zu erzeugen. Ein Prompt-Template enthält eine Variable, die mit dem Inhalt der Benutzereingabe gefüllt wird.

```
Schreibe eine Kurzgeschichte im Stil von 
Autor: {autor}.
```
ist ein Prompt-Template. Um eine sinnvolle Antwort zu erhalten, muss der Benutzer den Namen des Autors eingeben.



