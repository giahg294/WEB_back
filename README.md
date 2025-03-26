# WEB_back

### GetPayment

```
GET http://localhost:4000/stats/getPayment
```

```json
[
    {
        "nom": "Lucas",
        "prenom": "L'HOMME",
        "email": "lucaslhomme01@gmail.com",
        "type": "Event",
        "amount": 5,
        "createdAt": "2025-03-26T22:17:31.796Z"
    },
    [.......]
    {
        "nom": "Lucas",
        "prenom": "L'HOMME",
        "email": "lucaslhomme01@gmail.com",
        "type": "Event",
        "amount": 5,
        "createdAt": "2025-03-26T22:17:31.796Z"
    }
]
```

### GetAdhesion

```
GET http://localhost:4000/stats/getAdhesion
```

```
[
    {
        "nom": "adhesion-2024-2025-sport",
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/adhesions/adhesion-2024-2025-sport"
    }
    [.......]
        {
        "nom": "adhesion-2024-2025-kebab",
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/adhesions/adhesion-2024-2025-sport"
    }
]
```
### GetEvent

```
GET http://localhost:4000/stats/getEvent
```

```
[
    {
        "nom": "pistoche lundi soir mais semaine pro",
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/evenements/pistoche-lundi-soir-1"
    },
    [............]
    {
        "nom": "pistoche lundi soir mais semaine pro pro",
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/evenements/pistoche-lundi-soir-1"
    }
]
```