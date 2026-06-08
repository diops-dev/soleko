# Site web SOLEKO

Site vitrine B2B de **SOLEKO**, la marque solaire de SolAfrik — panneaux solaires, batteries, onduleurs, kits autonomes et pompage solaire certifiés.

Site statique **multilingue** (HTML / CSS / JavaScript), sans dépendance ni build. Conçu pour un déploiement simple via **GitHub → Hostinger**.

**4 langues : Français · English · Español · Português** — chaque langue dans son propre dossier, avec balises `hreflang` pour le SEO.

> Conçu et développé par **shorAI Consulting** — [www.shorai-group.com](https://www.shorai-group.com)

## Structure

```
soleko-site/
├── index.html                      Redirige vers la langue du navigateur (défaut /fr/)
├── 404.html                        Page d'erreur (bilingue)
├── contact.php                     Traitement du formulaire → info@soleko.international
├── robots.txt · sitemap.xml · .htaccess
├── assets/css/style.css            Charte SOLEKO (ambre #F59E0B, anthracite, Nunito Sans)
├── assets/js/main.js               Menu mobile, FAQ, sélecteur de langue, formulaire
├── assets/img/                     Logos SVG
├── fr/                             🇫🇷 16 pages (accueil, produits×6, solutions,
│   ├── index.html                     afrique-de-louest, services, a-propos, blog,
│   ├── produits/…                     contact + 3 pages légales)
│   └── …
├── en/                             🇬🇧 16 pages (products, west-africa, about…)
├── es/                             🇪🇸 16 pages (productos, africa-occidental…)
└── pt/                             🇵🇹 16 pages (produtos, africa-ocidental…)
```

Total : **64 pages** (4 langues × 16) + index racine + 404.

Chaque page comporte un **sélecteur de langue** (FR · EN · ES · PT) dans la barre de navigation, qui renvoie vers la même page dans l'autre langue.

## Charte

- Couleur primaire : **#F59E0B** (or solaire) · hover **#D97706**
- Fonds sombres : **#1F2937 / #111827** · texte **#374151**
- Police : **Nunito Sans** (Google Fonts)
- Textes de contenu **justifiés**
- SEO : `title`, `meta description`, `H1`, mots-clés et `hreflang` propres à chaque page et chaque langue

## Déploiement

### 1. GitHub
```bash
cd soleko-site
git init
git add .
git commit -m "Site SOLEKO — version initiale"
git branch -M main
git remote add origin https://github.com/<votre-compte>/soleko-site.git
git push -u origin main
```

### 2. Hostinger
Deux options :

**A. Upload direct (le plus simple)**
1. hPanel → *Gestionnaire de fichiers* → dossier `public_html`
2. Téléversez **tout le contenu** du dossier `soleko-site/` (et non le dossier lui-même) à la racine de `public_html`.
3. Activez le SSL gratuit (hPanel → SSL), puis décommentez le bloc *Forcer HTTPS* dans `.htaccess`.

**B. Déploiement Git automatique**
1. hPanel → *Avancé → Git* → connectez le dépôt GitHub `soleko-site`.
2. Branche `main`, répertoire de déploiement `public_html`.
3. Activez le déploiement automatique : chaque `git push` met le site à jour.

## Formulaire de contact → info@soleko.international

Toutes les demandes du formulaire arrivent à **info@soleko.international** via le script **`contact.php`** (envoi par le serveur Hostinger, sans service tiers).

### Fonctionnement
- Le formulaire (`contact.html`) envoie les données à `contact.php` en POST.
- `contact.php` valide les champs, bloque le spam (champ honeypot caché) et envoie l'email à `info@soleko.international` avec la fonction `mail()` de PHP.
- L'adresse du visiteur est placée en `Reply-To` : vous répondez directement depuis votre boîte.
- Repli : si le serveur PHP est indisponible (ex. ouverture du site en local sans serveur), le bouton ouvre automatiquement le client mail du visiteur, déjà adressé à `info@soleko.international`.

### Mise en service sur Hostinger
1. Téléversez tout le site, **y compris `contact.php`**, dans `public_html`.
2. PHP est actif par défaut sur Hostinger — aucune configuration nécessaire.
3. Recommandé pour une bonne délivrabilité : créez la boîte **info@soleko.international** dans hPanel → *Emails*, afin que l'expéditeur `From:` corresponde à un compte réel du domaine.
4. Testez l'envoi depuis la page contact en ligne (le `mail()` PHP ne fonctionne pas en local, uniquement sur le serveur).

> Le `From:` du script est `info@soleko.international`. Si vous utilisez un autre domaine, alignez cette adresse dans `contact.php` (variable `$entetes`) pour éviter le classement en spam.

## À compléter avant la mise en ligne

- Coordonnées réelles dans **mentions-legales.html** (éditeur, hébergeur, directeur de publication)
- Créer la boîte mail **info@soleko.international** dans hPanel Hostinger (pour l'envoi PHP)
- Numéro **WhatsApp** réel dans `contact.html` (actuellement `00000000000`)
- Validation des **CGV** par un juriste
- Remplacer `soleko.com` par le domaine final dans `sitemap.xml`, `robots.txt` et les balises canoniques si différent
