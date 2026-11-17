CART3R AI — VERSION SANS CLÉ SUR TON TÉLÉPHONE

IMPORTANT
- Le site ne demande plus de clé API dans Chrome.
- La clé du fournisseur doit quand même exister côté serveur. Elle ne doit jamais être mise dans le HTML public.
- Les modèles gratuits ont des limites de quota et peuvent être indisponibles.
- Le forfait gratuit d'un hébergeur peut dormir ou imposer des limites. Un usage public doit être surveillé pour éviter les abus et les coûts.

DÉPLOIEMENT DEPUIS UN TÉLÉPHONE (Render + GitHub)
1. Décompresse ce ZIP.
2. Crée un dépôt GitHub et téléverse les fichiers du dossier (index.html doit rester dans public/).
3. Sur Render, crée un nouveau service Web depuis ce dépôt.
4. Render détecte render.yaml. Vérifie Build Command: npm install et Start Command: npm start.
5. Dans Environment, ajoute OPENROUTER_API_KEY avec la clé OpenRouter du propriétaire du serveur. Ne la publie jamais et ne la colle pas dans le site.
6. Déploie. Quand Render donne une URL publique, ouvre-la dans Chrome.

SÉCURITÉ ET COÛTS
Ce projet applique une limite simple de 20 appels API par minute et limite la taille des messages. Ce n'est pas une protection complète contre les abus pour un site public. Avant de le rendre public, ajoute une authentification et des quotas par utilisateur. Si tu es mineur, demande à un parent/tuteur de t'aider pour les comptes, les clés et les paramètres de facturation.

TEST LOCAL
Node.js 20+ : npm install puis OPENROUTER_API_KEY=ta_cle npm start
Ouvre http://localhost:3000
