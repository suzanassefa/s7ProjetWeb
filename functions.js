"use strict"
// calcule a**(N-1) ≡ 1 mod N la condition de fermat
let alphabet = ["a","b","c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];

function my_powMod(a, b, n){
  return (a ** b) % n;
}

function my_pow(a,b){
  return a**b;
}

 function my_abs(a){
   if(a < 0){
     a = a * -1n;
   }
   return a
 }

function euclid(a, b){
  a = my_abs(a);
  b = my_abs(b);
  let r = 0
  while (b != 0n){
    r =  a % b ;
    a = b;
    b = r
  }
  return a
}

/// coefficient de bezout, algoritme de euclide étendu
function extended_euclid(a, b){
  let u0 = 1n
  let u1 = 0n
  let v0 = 0n
  let v1 = 1n
  let q = 0n
  let r = 0n
  let new0 = 0n
  let new1 = 0n


  while( b != 0n){
    q = a / b
    r = a % b
    a = b
    b = r
    new0 = u1
    new1 = u0-q*u1
    u0 = new0
    u1 = new1
    new0 = v1
    new1 = v0-q*v1
    v0 = new0
    v1 = new1

  }

  if(a >= 0n){
    return [a, u0, v0]
  }
  else {
    return [-a, -u0, -v0]
  }
}


function modular_inverse(e, phin){
  let extend_ecl = extended_euclid(e, my_abs(phin));
  if(extend_ecl[0] == 1){
    return (extend_ecl[1]+my_abs(phin))%my_abs(phin)
  }
  else{
    return 0n
  }
}


// test de primalite de Fermat avec n un entier positve
function testPrimaliteFermat(n,k){
  let a = generate_number(k);
  while  (a >= n ){
    a = generate_number(k);
  }
  if(my_powMod(a, n-1n, n) == 1n){
    return true;
  }
  return false;
}

// générer un nombre aléatoire de k bit
function generate_number(k){
  let chaine_cara = ""
  for (let i=0; i<k; i++){
    const n = Math.floor(Math.random() * 9) ;
    chaine_cara += n;
  }
  return BigInt(chaine_cara);
}

// générer un nb premier de k bit
function generate_prime(k) {
	let n = generate_number(k);
    while (!testPrimaliteFermat(n,k)){
      n = generate_number(k);
	}
	return n
}



function generate_key(k){
	let n = Math.pow(2, k+1);
	let p = 1;
	let q =  1;
  // on construi n
	//while(n >= Math.pow(2,k) || n < Math.pow(2, k-1)  || q  == p){
  while(n < 26 || q  == p){
		 p = generate_prime(Math.floor(k/2));
		 q = generate_prime(Math.floor(k/2));
		 n = p*q ;
	}
  // on calcule phin
	let phin  = (p-1n) * (q-1n);

	let e = generate_number(Math.floor(k/2));
  let may_e = 0;
  while(euclid(e, phin)!=1n){
    may_e = generate_number(Math.floor(k/2));
    if(may_e>=2 && may_e<phin) {
      e  = may_e;
    }
  }

	let d =  modular_inverse(e, phin);

	let result =  [p, q, n, phin, d, e];
	return result;

}

function tester(k){
  let k2 = Math.floor(k/2);
  let [p,q,n,phin,d,e] =  generate_key(k);
  console.log( "[p,q,n,phin,d,e]=generate_key(",k,")");
  console.log( "                =", [p,q,n,phin,d,e]);
  console.log( "p premier:", testPrimaliteFermat(p, k2));
  console.log("q premier:", testPrimaliteFermat(q, k2));
  //console.log( "p et q ont ",k2," bits:", p < Math.pow(2,k2) && p >= Math.pow(2,k2-1) && q < Math.pow(2,k2) && q >= Math.pow(2,k2-1));
  console.log( "pq == n : ", p*q==n);
  //console.log( "n a ",k," bits:", n<2**k && n>=2**(k-1));
  console.log( "(p-1)*(q-1) == phin : ", (p-1n)*(q-1n) == phin);
  console.log( "PGCD(e,phin)==1: ", euclid(e, phin) == 1);
  console.log( "ed =1 mod phin", (e*d)% phin  == 1n );
}

//codeur et décodeur
function enchiffrer(m, e, n){
  let lettres = []
  for (let p=0; p<m.length; p++){
    lettres.push(square_and_multiply(m[p], e, n));
  }
  return lettres
}

function square_and_multiply(m, e, n){
  let step = my_pow(m,2n);
  for (let i=2n; i<e; i++){
    step = (m*step) % n
  }
  return step
}

function coder_mot(){
  let saisie = document.getElementById("mot_cle").value;
  saisie = saisie.toLowerCase();
  let mot_coder = [];
  for(let i=0; i<saisie.length; i++){
    for(let j=0; j<alphabet.length; j++){
      if(saisie[i] == alphabet[j]){
        mot_coder.push(BigInt(j));
      }
    }
  }
  console.log(mot_coder);
  afficherMot_coder(mot_coder);
}

function decoder_mot(){
  let saisie = mots_dechiffrer;
  let mot_coder = "";
  for(let i=0; i<saisie.length; i++){
    for(let j=0; j<alphabet.length; j++){
      if(saisie[i] == j){
        mot_coder += alphabet[j];
      }
    }
  }
  afficherMot_decoder(mot_coder);}
