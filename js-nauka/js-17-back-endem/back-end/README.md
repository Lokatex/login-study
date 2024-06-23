Ten folder zawiera prosty serwer, dzięki któremu będziemy mogli odczytać listę zakupów. Umożliwia on też dodawanie nowych elementów do listy oraz edycję już istniejących.

Żeby uruchomić server wywołaj w terminalu na poziomie folderu `back-end` komendy:

```command
npm i
npm run dev
```

Możesz również wywołać te same komendy folder wyżej - wtedy uruchomisz jednocześnie server i projekt frontendowy.

### Model danych

#### Elementy listy zakupów

Elementy zwracane i zapisywane do serwera mają następujące pola:

```javascripton
{
    "id": 1,
    "content": "Chleb",
    "completed": false
}
```

### Opis endpointów

| Ścieżka    | Metoda   | Jak działa?                                                                                                                              |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| /items     | `GET`    | Pobiera listę zakupów                                                                                                                    |
| /items     | `POST`   | Dodaje nowy element do listy zakupów. Wymagania przesłania body z danymi nowego elementu, np: `{completed: false, content: 'Makaron'}`   |
| /items/XYZ | `PATCH`  | Edytuje element listy zakupów o ID XYZ. Wymagania przesłania body z danymi nowego elementu, np: `{completed: false, content: 'Makaron'}` |
| /items/XYZ | `DELETE` | Usuwa element listy zakupów o ID XYZ.                                                                                                    |
