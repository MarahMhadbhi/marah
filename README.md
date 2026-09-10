#  QuikStay — Plateforme de gestion de location de logements

Plateforme web permettant aux particuliers de louer leurs logements à des voyageurs, inspirée du modèle Airbnb. Projet réalisé dans le cadre du **Projet de Fin d'Études (Licence en Ingénierie des Systèmes Informatiques)** à l'ISITCOM, spécialité Systèmes Embarqués et Internet des Objets.

##  À propos

QuikStay répond à une problématique concrète : faciliter la recherche de logements à louer pour des besoins variés (études, travail, tourisme), en offrant une plateforme intuitive où les **hôtes** peuvent déposer des annonces détaillées (adresse, description, règles, photos, prix) et où les **locataires** peuvent rechercher, filtrer et réserver un logement en toute simplicité, avec une carte interactive et un paiement en ligne intégré.

##  Acteurs

| Acteur | Rôle |
|---|---|
| **Locataire** | Consulte le site, recherche et réserve un logement, dépose/supprime ses propres annonces |
| **Déposant (Hôte)** | Toutes les actions du locataire + peut refuser une réservation sur son propre logement |
| **Administrateur** | Gère les comptes utilisateurs (ajout, suppression, modification), accès à la base de données |

##  Fonctionnalités principales

- 🔐 **Inscription & Authentification** : création de compte (email/nom/mot de passe) et connexion sécurisée, avec **authentification via Google OAuth**
- 🏘️ **Gestion des annonces** : dépôt d'annonce en plusieurs étapes (type de logement, localisation, capacité, photos, description, prix), modification et suppression
- 🔍 **Recherche de logements** : filtrage multi-critères (adresse, période, nombre d'invités, chambres, salles de bains, type de logement)
- 🗺️ **Carte interactive** : localisation des logements sur une carte personnalisée (Leaflet), avec géolocalisation précise
- 📅 **Gestion des réservations** : réservation avec sélection de période, paiement en ligne, annulation de réservation
- 💳 **Paiement en ligne** : intégration de l'API PayPal pour sécuriser les transactions
- ❤️ **Favoris** : ajout et consultation des logements favoris
- 🖼️ **Upload et gestion des photos** : stockage optimisé des images via Cloudinary (CDN)
- 🛡️ **Gestion des utilisateurs (Admin)** : ajout, modification, suppression des comptes

##  Architecture logicielle — MVC

Le projet suit l'architecture **Model-View-Controller (MVC)** :
- **Model** : gestion des données et de la logique métier (utilisateurs, annonces, réservations, paiements)
- **View** : interface utilisateur (pages Next.js/React)
- **Controller** : intermédiaire entre le modèle et la vue, traitement des requêtes utilisateur

```
Utilisateur → View (React/Next.js) → Controller → Model → Base de données (MongoDB)
```

## Modèle de données

| Entité | Attributs principaux |
|---|---|
| **Utilisateur** | UserId, Name, Email, Password, CreatedAt |
| **Administrateur** | AdministratorId, Name, Email, Password |
| **Listing (Annonce)** | ListingId, Title, Description, ImageSrc, Category, RoomCount, BathroomCount, GuestCount, LocationValue, Price |
| **Réservation** | ReservationId, StartDate, EndDate, TotalPrice, UserId, ListingId, PaymentId |
| **Payment** | PaymentId, CreditCardId, Amount, PaymentDate |
| **Favorites** | FavoriteId |

## Stack technique

| Catégorie | Technologies |
|---|---|
| **Frontend** | Next.js 13 (App Router), React, TypeScript, TailwindCSS |
| **Backend / ORM** | Node.js, Prisma |
| **Base de données** | MongoDB |
| **Authentification** | Google OAuth |
| **Paiement** | API PayPal |
| **Stockage d'images** | Cloudinary (CDN) |
| **Cartographie** | Leaflet (carte personnalisée) |
| **Déploiement** | Vercel |
| **Modélisation UML** | StarUML |
| **Environnement de dev** | Visual Studio Code |

##  Méthodologie de gestion de projet

Le projet a été mené selon la méthodologie du **cycle en V** : conception (analyse des besoins → conception système → conception architecturale) → réalisation → validation (tests), garantissant une correspondance rigoureuse entre les exigences et les livrables à chaque étape.

## Aperçu de l'application

**Page d'accueil** — Liste de toutes les annonces disponibles avec filtres par catégorie
**Inscription / Connexion** — Formulaire avec option Google OAuth
**Dépôt d'annonce** — Parcours en 6 étapes (type, localisation, capacité, photos, description, prix)
**Réservation** — Sélection de période, calcul du prix total, paiement sécurisé
**Recherche** — Filtrage par ville, dates, nombre d'invités
**Favoris** — Sauvegarde des logements préférés



##  Installation locale

### Prérequis
- Node.js >= 18
- MongoDB (local ou Atlas)
- Compte Cloudinary (pour l'upload d'images)
- Compte PayPal Developer (pour les paiements sandbox)
- Identifiants Google OAuth

### Étapes

```bash
git clone https://github.com/MarahMhadbhi/QuikStay.git
cd QuikStay

# Installer les dépendances
npm install

# Configurer les variables d'environnement (.env.local)
# DATABASE_URL="mongodb+srv://..."
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# CLOUDINARY_CLOUD_NAME=...
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=...

# Générer le client Prisma
npx prisma generate

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

## Perspectives d'amélioration

- Personnalisation de l'expérience utilisateur via l'analyse des préférences et historiques de réservation (recommandations intelligentes)
- Intégration de la réalité virtuelle pour des visites virtuelles de logements

## Contexte académique

**Projet de Fin d'Études** — Licence en Ingénierie des Systèmes Informatiques (spécialité Systèmes Embarqués et Internet des Objets)
Institut Supérieur d'Informatique et des Technologies de Communication de Sousse (ISITCOM) — Année universitaire 2024/2025

**Encadrante académique :** Mme Narjess Touzani

##  Auteure

**Marah Mhadbhi**
Étudiante Ingénieure en Software Architecture Engineering — ESPRIT
 [GitHub](https://github.com/MarahMhadbhi)
