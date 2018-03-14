
/**
 * Created by nautiliusfree on 23/03/17.
 */

//var fs = require('fs');

// file is included here:
//eval(fs.readFileSync('tools.js')+'');
var fs = require('fs');
function Station(nom) {
    this.nom = nom;
    this.line = [];
    this.ids= [];
    this.adj= [];
    this.cout = Number.MAX_VALUE;


}

function Station2(nom){ // utile pour initialiser les distances
    this.nom= nom;
    this.line =null;



}

function Sommet(nom){ // utile pour initialiser les distances
    this.nom= nom;
    this.cout = Number.MAX_VALUE;
    this.ligne= [];



}

function Sommet2(nom, ligne,direction,corres){ // utile pour initialiser les distances
    this.nom= nom;
    this.line = ligne;
    this.direction1= direction;
    this.corres= corres;


}

function Arc(o,dest,val) {
    this.o=o;
    this.dest= dest;
    this.val= val;
    this.line_metro=0;
    this.direction = " Effectuez un changement et prenez la direction suivante ";
    this.ischangement = false;

    this.source = function () {
        return this.o;
    }



    this.dist =  function () {
        return this.val;
    }
}


//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
