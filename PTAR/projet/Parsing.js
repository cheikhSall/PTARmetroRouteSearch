var fs = require('fs');
// file is included here:
eval(fs.readFileSync('Classe.js')+'');


listestation = new Object();
var listeStation2 = {};
var listestation3 = {};
var data1 = fs.readFileSync('lignes/metro_graphe.labels','utf8');

var array = data1.toString().split("\n");
for (var i = 0; i < array.length-1 ; i++) {

    var cle = /\d+/i;
    var key = array[i].match(cle);
    var value= "";
    if (key == 155){ // à la main => à factoriser
        value= "La Courneuve, 8 Mai 1945";

    }else{
        value = array[i].replace(/[0-9]/g, "");
    }
    listestation[key] = value.trim();
    listestation3[key] = new Station2(value.trim());
    // listeStation2[value.trim()]= new Station(value.trim());
   // console.log("key : "+ key);
    var c = key;
    if(listeStation2[value.trim()]!= undefined){
        listeStation2[value.trim()].ids.push(String(c));
    }else{
        listeStation2[value.trim()]= new Station(value.trim());
        listeStation2[value.trim()].ids.push(String(c));
    }


}

//console.log(listestation);
listeArc= {}; // dictionnaire des arc
var data3 = fs.readFileSync('lignes/metro_graphe.edges','utf8');
var array3 = data3.toString().split("\n");

for (var i = 0; i < array3.length-1 ; i++) {

    var array4 = array3[i].split(" ");
    // 317 318 2
    // var arc = new Arc(array4[0],array4[1],Number(array4[2]));
    var temps = Number(array4[2]);
    var arc = null;
    if(temps == 1){
        arc = new Arc(array4[0],array4[1],100); // si pas normal 1.40 min
    }else{
        arc = new Arc(array4[0],array4[1],150); // si correspondance 2.3 min
    }
    var k = listestation[array4[0]];


    if ( !(listeStation2[k].adj.indexOf(array4[1])>-1)){ // verification des doublons
        listeStation2[k].adj.push(array4[1]);

    }

    listeArc[k+array4[0]+array4[1]]=arc;

}

var lignes= [];

for (var ligne= 1; ligne < 15; ligne++) {


    var data = fs.readFileSync("lignes/metro_ligne" + ligne + ".stations", 'utf8');
    var array = data.toString().split("\n");
    var array2 = [];
    for (var i = 0; i < array.length - 2; i++) {
        // console.log(array[j]);
        //console.log(listestation[array[j]]);

        var key = array[i]; // 201
        var key2 = listestation[key]; // renvoi le nom

        var key3 = array[i + 1]; // renvoi le nom adjacent
        var key4 = listestation[key3];
        //  listeStation2[key2.trim()].line.push(ligne);
        listeStation2[key2].line.push(ligne);
        listestation3[key].line = ligne;
        listestation3[key3].line = ligne;
        for (var f in listeArc) {
            if (String(listeArc[f].o) == key && String(listeArc[f].dest) == key3) {

                //if (String(listeArc[f].o) == key2.trim() && String(listeArc[f].dest) == key4.trim()) {

                // console.log( listeArc[f].o+" => "+ key2.trim() +"| "+ String(listeArc[f].dest)+ "=>"+ key4.trim());
                listeArc[f].line_metro = ligne;

            }

            if (String(listeArc[f].dest) == key && String(listeArc[f].o) == key3) {
                //  console.log( listeArc[f].o+" => "+ key2.trim() +"| "+ String(listeArc[f].dest)+ "=>"+ key4.trim());
                listeArc[f].line_metro = ligne;

            }



        }

        array2.push(array[i]);

    }

    array2.push(array[array.length - 2]);
    lignes.push(array2);
}


var ligne = "3b";
var data = fs.readFileSync("lignes/metro_ligne" + ligne + ".stations", 'utf8');
var array = data.toString().split("\n");
var array2 = [];
for (var i = 0; i < array.length - 2; i++) {

    var key = array[i];
    var key2 = listestation[key];
    var key3 = array[i + 1];
    var key4 = listestation[key3];
    //listeStation2[key2.trim()].line.push(ligne);
    listeStation2[key2].line.push(ligne);
    listestation3[key].line = ligne;
    listestation3[key3].line = ligne;
    for (var f in listeArc) {
        if (String(listeArc[f].o) == key && String(listeArc[f].dest) == key3) {

            //if (String(listeArc[f].o) == key2.trim() && String(listeArc[f].dest) == key4.trim()) {

            // console.log( listeArc[f].o+" => "+ key2.trim() +"| "+ String(listeArc[f].dest)+ "=>"+ key4.trim());
            listeArc[f].line_metro = ligne;

        }

        if (String(listeArc[f].dest) == key && String(listeArc[f].o) == key3) {
            //  console.log( listeArc[f].o+" => "+ key2.trim() +"| "+ String(listeArc[f].dest)+ "=>"+ key4.trim());
            listeArc[f].line_metro = ligne;

        }

    }

    array2.push(array[i]);

}

array2.push(array[array.length - 2]);
lignes.push(array2);






var ligne = "7b";
var data = fs.readFileSync("lignes/metro_ligne" + ligne + ".stations",'utf8');
var array = data.toString().split("\n");
var array2=[];
for (var i= 0; i < array.length-2; i++) {
    var key = array[i];
    var key2= listestation[key];
    var key3 = array[i+1];
    var key4 =  listestation[key3];
    //listeStation2[key2.trim()].line.push(ligne);
    listeStation2[key2].line.push(ligne);
    listestation3[key].line = ligne;
    listestation3[key3].line = ligne;
    for (var f in listeArc) {




        //  console.log("f " + f + "=>"+ listestation[key4]+key4+key2);
        if(f == listestation[key2]+key2+key4){

            listeArc[listestation[key2]+key2+key4].line_metro= ligne;

        }

        if(f == listestation[key4]+key4+key2){

            listeArc[listestation[key4]+key4+key2].line_metro=  ligne;
            //console.log(listestation[key4]+key4+key2);
        }




    }

    array2.push(array[i]);

}

array2.push(array[array.length - 2]);
lignes.push(array2);



//console.log(lignes);
for (var ligne in lignes) {
    var cmp = 0;
    for (var i = 0; i < lignes[ligne].length-2; i++) {

        var key2 = lignes[ligne][i];
        var key4 =  lignes[ligne][i+1];



        for (var f  in listeArc ){

            if(f == listestation[key2]+key2+key4){

                listeArc[listestation[key2]+key2+key4].direction= listestation[lignes[ligne][lignes[ligne].length-1]].trim();

            }

            if(f == listestation[key4]+key4+key2){

                listeArc[listestation[key4]+key4+key2].direction= listestation[lignes[ligne][0]].trim();

            }


        }

    }

}



for (var f in listeArc) {
    if (listeArc[f].line_metro == 0 ) {
        listeArc[f].line_metro = listestation3[listeArc[f].o].line;
    }
}
/// correction des biffurcations ligne  13
listeArc["Place de Clichy252156"].direction = "Asnières-Genevilliers, Les Courtilles ou Saint-Denis-Université";

listeArc["Brochant41273"].direction= "Asnières-Genevilliers, Les Courtilles";
listeArc["Porte de Clichy273184"].direction= "Asnières-Genevilliers, Les Courtilles";
listeArc["Mairie de Clichy184115"].direction = "Asnières-Genevilliers, Les Courtilles";
listeArc["Gabriel Péri115167"].direction = "Asnières-Genevilliers, Les Courtilles";
listeArc["Les Agnettes1679"].direction = "Asnières-Genevilliers, Les Courtilles";

// correction des biffurcations ligne  7
listeArc["Maison Blanche189164"].direction= "Villejuif, Louis Aragon";
listeArc["Le Kremlin-Bicêtre164371"].direction = "Villejuif, Louis Aragon";
listeArc["Villejuif, Léo Lagrange371372"].direction = "Villejuif, Louis Aragon";
listeArc["Villejuif, Paul Vaillant-Couturier372370"].direction = "Villejuif, Louis Aragon";
