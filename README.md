# WEB_back

va dans le dossier du back, et fait

```
npm install
npm run dev
```

Le serveur se lance sur le port 4000

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

```json
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
### GetAdhesionMembers

```
GET http://localhost:4000/stats/getAdhesionMembers
```

```json
[
    {
        "adhesionName": "adhesion-2024-2025-sport",
        "userNom": "Lucas",
        "userPrenom": "L'HOMME",
        "userEmail": "lucaslhomme01@gmail.com"
    },
    {
        "adhesionName": "adhesion-2024-2025-sport",
        "userNom": "Titouan",
        "userPrenom": "LeGoat",
        "userEmail": "titouanLeGoat@gmail.com"
    }
]
```
### GetEvent

```
GET http://localhost:4000/stats/getEvent
```

```json
[
    {
        "nom": "pistoche lundi soir mais semaine pro",
        "slug": "pistoche-lundi-soir-mais-semaine-pro"
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/evenements/pistoche-lundi-soir-1",
        "date": "la date"
    },
    [............]
    {
        "nom": "pistoche lundi soir mais semaine pro",
        "slug": "pistoche-lundi-soir-mais-semaine-pro"
        "url": "https://www.helloasso-sandbox.com/associations/fouch-a-cheval/evenements/pistoche-lundi-soir-1",
        "date": "la date"
    }
]
```

### getParticipantsDetailsByEvent

```
GET http://localhost:4000/stats/getParticipantsDetailsByEvent
```

```json
[
  {
    "_id": "2001-08-24",
    "date": "2001-08-24",
    "totalParticipants": 0,
    "eventDetails": [
      {
        "slug": "pistoche-TR",
        "nom": "pistoche TR",
        "nbrParticipants": 0,
        "participants": []
      },
      {
        "slug": "pistoche-Normal",
        "nom": "pistoche Normal",
        "nbrParticipants": 0,
        "participants": []
      },
      {
        "slug": "pistoche-Abo",
        "nom": "pistoche Abo",
        "nbrParticipants": 0,
        "participants": []
      }
    ]
  },
  {
    "_id": "2025-03-03",
    "date": "2025-03-03",
    "totalParticipants": 0,
    "eventDetails": [
      {
        "slug": "pistoche-Abo-2",
        "nom": "pistoche Abo 2",
        "nbrParticipants": 0,
        "participants": []
      },
      {
        "slug": "pistoche-Normal-2",
        "nom": "pistoche Normal 2",
        "nbrParticipants": 0,
        "participants": []
      },
      {
        "slug": "pistoche-TR-2",
        "nom": "pistoche TR 2",
        "nbrParticipants": 0,
        "participants": []
      }
    ]
  }
]
```

### getParticipantsByEvent

```
GET http://localhost:4000/stats/getParticipanByEvent
```

```json
[
  {
    "date": "2001-08-24",
    "totalmembers": 0
  },
  {
    "date": "2025-03-03",
    "totalmembers": 0
  }
]
```

### getTimeBasedAdhesionPayment

```
GET http://localhost:4000/stats/getTimeBasedAdhesionPayment
```

```json
{
  "totalMembershipPayments": 1,
  "growthData": [
    {"x": "2025-03","y": 1},
    {"x": "2025-04","y": 5}
    {"x": "2025-05","y": 10}
  ]
}
```

Nombre de new adherents en fonction des mois

### getTotalMoneyTimeBasedPayment

```
GET http://localhost:4000/stats/getTotalMoneyTimeBasedPayment
```

```json
{
  "growthData": [
    { "x": "2025-03", "y": 21 },
    { "x": "2025-04", "y": 40 }
  ]
}
```

Représente tout l'argent reçu Event + Adhesion

### getTotalMoneyTimeBasedAdhesion

```
GET http://localhost:4000/stats/getTotalMoneyTimeBasedAdhesion
```

```json
{
  "growthData": [
    { "x": "2025-03", "y": 1 },
    { "x": "2025-04", "y": 10 }
  ]
}
```

Représente tout l'argent reçu uniquement pour les Adhesions

### getTotalMoneyTimeBasedEvent

```
GET http://localhost:4000/stats/getTotalMoneyTimeBasedEvent
```

```json
{
  "growthData": [
    { "x": "2025-03", "y": 20 },
    { "x": "2025-04", "y": 25 }
  ]
}
```

Représente tout l'argent reçu uniquement pour les Events

### getIllegaux

```
GET http://localhost:4000/api/users/getillegaux
```

### sendEmail

```
POST http://localhost:4000/email/illegalUser
```

Les données à envoyer

```json
{
  userWeHaveToSend: string[];
  subject:string;
  message:string;
}
```
