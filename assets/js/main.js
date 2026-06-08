/* SOLEKO — interactions front
   Créé par shorAI Consulting · www.shorai-group.com */
(function(){
  // Menu mobile
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.nav__menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }

  // FAQ accordéon
  document.querySelectorAll('.faq__q').forEach(function(q){
    q.addEventListener('click', function(){
      q.parentElement.classList.toggle('open');
    });
  });

  // Lien actif selon l'URL
  var path = location.pathname.replace(/index\.html$/,'').replace(/\/$/,'');
  document.querySelectorAll('.nav__menu > li > a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    var clean = href.replace(/index\.html$/,'').replace(/\/$/,'').replace(/^\.+/,'');
    if(clean && path.endsWith(clean) && clean !== ''){ a.classList.add('active'); }
  });

  // Formulaire devis -> contact.php -> info@soleko.international
  var DEST_EMAIL = 'info@soleko.international';
  var form = document.querySelector('#devis-form');
  if(form){
    var ok = document.querySelector('#devis-ok');
    var err = document.querySelector('#devis-err');

    function hideMsgs(){ if(ok) ok.style.display='none'; if(err) err.style.display='none'; }
    function showOk(){ hideMsgs(); if(ok){ ok.style.display='block'; ok.scrollIntoView({behavior:'smooth',block:'center'}); } form.reset(); }
    function showErr(){ hideMsgs(); if(err){ err.style.display='block'; err.scrollIntoView({behavior:'smooth',block:'center'}); } }

    function fallbackMailto(){
      var g = function(n){ var el=form.querySelector('[name="'+n+'"]'); return el? el.value : ''; };
      var corps = 'Nom & société : '+g('nom')
        + '\nEmail : '+g('email')
        + '\nMarché / pays : '+g('pays')
        + '\nBesoin : '+g('besoin')
        + '\n\nProjet :\n'+g('msg');
      window.location.href = 'mailto:'+DEST_EMAIL
        + '?subject='+encodeURIComponent('Demande de devis — SOLEKO')
        + '&body='+encodeURIComponent(corps);
    }

    // Affiche un message si on revient de contact.php sans JS (?envoye=1 / ?erreur=1)
    if(/[?&]envoye=1/.test(location.search)) showOk();
    if(/[?&]erreur=1/.test(location.search)) showErr();

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var action = form.getAttribute('action') || 'contact.php';
      var btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.disabled = true; btn.textContent = 'Envoi en cours…'; }

      fetch(action, {
        method:'POST',
        body:new FormData(form),
        headers:{'Accept':'application/json'}
      }).then(function(r){
        if(r.ok){ showOk(); }
        else { showErr(); }
      }).catch(function(){
        // Serveur PHP indisponible (ex. test en local) : repli mailto
        fallbackMailto();
      }).finally(function(){
        if(btn){ btn.disabled = false; btn.textContent = 'Envoyer ma demande de devis'; }
      });
    });
  }

  // Année footer
  document.querySelectorAll('.js-year').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
