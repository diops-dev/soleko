<?php
/* ============================================================
   SOLEKO — Traitement du formulaire de devis
   Destinataire : info@soleko.international
   Hébergement : Hostinger (fonction mail() PHP)
   Créé par shorAI Consulting · www.shorai-group.com
   ============================================================ */

// --- Configuration ---
$DESTINATAIRE = 'info@soleko.international';
$SUJET        = 'Nouvelle demande de devis — SOLEKO';

// Détecte si la requête vient d'un appel AJAX (fetch) ou d'un envoi classique
$is_ajax = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

function repondre($ok, $message, $is_ajax) {
    if ($is_ajax) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        // Envoi classique : redirige vers une page de confirmation simple
        if ($ok) {
            header('Location: contact.html?envoye=1');
        } else {
            header('Location: contact.html?erreur=1');
        }
    }
    exit;
}

// --- Sécurité : méthode POST uniquement ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    repondre(false, 'Méthode non autorisée.', $is_ajax);
}

// --- Anti-spam : honeypot (champ caché qui doit rester vide) ---
if (!empty($_POST['site_web'])) {
    repondre(true, 'Merci.', $is_ajax); // on fait croire au bot que tout va bien
}

// --- Récupération & nettoyage des champs ---
function champ($cle) {
    return isset($_POST[$cle]) ? trim(strip_tags($_POST[$cle])) : '';
}

$nom    = champ('nom');
$email  = champ('email');
$pays   = champ('pays');
$besoin = champ('besoin');
$msg    = champ('msg');

// --- Validation ---
if ($nom === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre(false, 'Merci de renseigner votre nom et un email valide.', $is_ajax);
}

// --- Construction de l'email ---
$corps  = "Nouvelle demande de devis reçue depuis soleko.international\n";
$corps .= "------------------------------------------------------------\n\n";
$corps .= "Nom & société : $nom\n";
$corps .= "Email         : $email\n";
$corps .= "Marché / pays : $pays\n";
$corps .= "Besoin        : $besoin\n\n";
$corps .= "Projet :\n$msg\n\n";
$corps .= "------------------------------------------------------------\n";
$corps .= "Envoyé le " . date('d/m/Y à H:i') . "\n";

// En-têtes : From sur le domaine (recommandé par Hostinger), Reply-To = client
$entetes  = "From: SOLEKO <info@soleko.international>\r\n";
$entetes .= "Reply-To: $nom <$email>\r\n";
$entetes .= "Content-Type: text/plain; charset=utf-8\r\n";
$entetes .= "X-Mailer: PHP/" . phpversion();

// --- Envoi ---
$envoye = @mail($DESTINATAIRE, $SUJET, $corps, $entetes);

if ($envoye) {
    repondre(true, 'Votre demande a bien été envoyée. Nous revenons vers vous sous 48 h.', $is_ajax);
} else {
    repondre(false, "L'envoi a échoué. Écrivez-nous directement à info@soleko.international.", $is_ajax);
}
