"use strict"

let les_cles_dalice = generate_key(4);
console.log("[p,q,n,phin,d,e] = ", les_cles_dalice);
let mots_coder = []
let mots_chiffrer = []
let mots_dechiffrer = []
function diplayConnection(){
  document.getElementById("contentPconnection").style.display = "block";
  if (document.getElementById("contentDialogue").style !="none"){
    document.getElementById("contentDialogue").style.display = "none";
  }
}

function displayDiscussion(){
  document.getElementById("contentDialogue").style.display = "block";
  if (document.getElementById("contentPconnection").style !="none"){
    document.getElementById("contentPconnection").style.display = "none";
  }
}

function contenue_chaque_button(id, cours, resultat){
  let div = document.getElementById(id);
  if(div.childNodes.length == 0){
    let p = document.createElement('p');
    p.setAttribute('id', "cours");
    let t = document.createTextNode(cours);
    let p2 = document.createElement('p');
    p2.setAttribute('id', "resultat");
    let t2 = document.createTextNode(resultat);
    p.appendChild(t);
    p2.appendChild(t2);
    div.appendChild(p);
    div.appendChild(p2);
  }
}
function affichage_prochain_button(id, def, attribut, value){
  let div = document.getElementById(id);
  if(div.childNodes.length == 2){
    let button = document.createElement("button");
    button.setAttribute("class", "button");
    button.setAttribute("onCLick", def+"("+attribut+")");
    let t = document.createTextNode(value);
    button.appendChild(t);
    div.appendChild(button);
  }
}

function nb_premier(){
  let cours = "lorium isum dot set amet";
  let resultat = "p = "+les_cles_dalice[0]+" et q = "+ les_cles_dalice[1];
  contenue_chaque_button("nb_premier", cours, resultat);
  affichage_prochain_button('nb_premier', "n_et_f", "", "Construire n et f");
}

function n_et_f(){
  let cours = "lorium isum dot set amet";
  let resultat = "n = "+les_cles_dalice[2]+" et f = "+ les_cles_dalice[3];
  contenue_chaque_button("n_et_f", cours, resultat);
  affichage_prochain_button('n_et_f', "e", "", "Construire e");

}
function e(){
  let cours = "lorium isum dot set amet";
  let resultat = "e = "+les_cles_dalice[5];
  contenue_chaque_button("e", cours, resultat);
  affichage_prochain_button('e', "d", "", "Construire d");

}

function d(){
  let cours = "lorium isum dot set amet";
  let resultat = "d = "+les_cles_dalice[4];
  contenue_chaque_button("d", cours, resultat);
  affichage_prochain_button('d', "envoyer_en", "", "Eneyer la clé (e,n) à Bob");
}

function envoyer_en(){
  let cours = "lorium isum dot set amet";
  let resultat = "La clé puclic (e,n) est bien reçus ! e = "+les_cles_dalice[5]+" et n = "+les_cles_dalice[2];
  resultat += " Bob choisi un mots-clé :";
  contenue_chaque_button("envoyer_en", cours, resultat);

  let div = document.getElementById("form");
//  if(div.childNodes.length == 0){
    let form = document.createElement('form')
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("id", "mot_cle");
    input.setAttribute("name", "mot_cle");
    input.setAttribute("value", "");
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button");
    button.setAttribute("value", "Confirmer le choix");
    button.setAttribute("onCLick", "coder_mot()");

    form.appendChild(input);
    form.appendChild(button);
    div.appendChild(form);
//  }
}

function afficherMot_coder(mot_coder){
  mots_coder  = mot_coder;
  let cours = "lorium isum dot set amet";
  let resultat = "le mot-clé transformé en nombres selon la position de ses lettres dans l’alphabet  est égale à "+ mot_coder;
  contenue_chaque_button("codage", cours, resultat);
  affichage_prochain_button("codage", "chiffrement", "", "crypter "+ mot_coder+ " et l'envoyer à Alice")
}

function chiffrement(){
  let chiffrer = enchiffrer(mots_coder, les_cles_dalice[5], les_cles_dalice[2]);
  mots_chiffrer = chiffrer;
  console.log(mots_chiffrer);
  let cours = "lorium isum dot set amet";
  let resultat = "le message crypter/chiffré est "+ chiffrer;
  contenue_chaque_button("chiffrage", cours, resultat);

  let cours2 = "lorium isum dot set amet";
  let resultat2 = "le message crypter/chiffré que Bob à envoyer est "+ chiffrer;
  contenue_chaque_button("etape3", cours2, resultat2);
  affichage_prochain_button("etape3", "dechiffrement", "", "décrypter "+ chiffrer);
}

function dechiffrement(){
  let dechiffrer= enchiffrer(mots_chiffrer, les_cles_dalice[4], les_cles_dalice[2]);
  mots_dechiffrer = dechiffrer;
  let cours = "lorium isum dot set amet";
  let resultat = "le message coder en nombre est "+ dechiffrer;
  contenue_chaque_button("dechiffrage", cours, resultat);
  affichage_prochain_button("dechiffrage", "decoder_mot", "", "decoder "+ dechiffrer+" et afficher le message en lettre");
}

function afficherMot_decoder(mot){
  let cours = "lorium isum dot set amet";
  let resultat = "le message en lettre est "+ mot;
  contenue_chaque_button("decodage", cours, resultat);
}
