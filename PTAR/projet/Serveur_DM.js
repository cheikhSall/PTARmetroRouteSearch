

var fs = require('fs');
// file is included here:
eval(fs.readFileSync('Graphe.js')+'');



console.log("Serveur metro service ===========================================================================================>");
var fs = require('fs');
var express = require('express');
var serv = express();


// levenstein module  npm i --save levenshtein-array
var LevenshteinArray = require("levenshtein-array");

/*

 // Dependencies
 var LevenshteinArray = require("levenshtein-array");

 console.log(
 LevenshteinArray([
 "principal"
 , "principle"
 , "prince"
 , "prism"
 ], "princedom")
 );
 // => [{ l: 3, w: 'prince' }
 //   , { l: 4, w: 'principal' }
 //   , { l: 4, w: 'principle' }
 //   , { l: 5, w: 'prism' } ]
*/

liste_sommets_control = [];
for (var i in listestation){
    liste_sommets_control.push(listestation[i]);
}

// importation des chemins
var path  = require("path");

serv.use(express.static(path.join(__dirname, 'public')));
serv.use(express.static('public/js'));
serv.use(express.static('public/css'));
serv.use(express.static('public/images'));
serv.set('view engine', 'ejs');

// formulaire
var bodyParser = require('body-parser');
serv.use(bodyParser.json()); // support json encoded bodies
serv.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var form = require('express-form');
var field = form.field;


//var expressValidator = require('express-validator'); //Declare Express-Validator
//serv.use(expressValidator);


serv.post('/itineraire/trajet',

    // Form filter and validation middleware
    form(
        field("depart").trim().minLength(4).required(),
        field("arrive").trim().minLength(4).required(),
        field("heuredepart").trim().required()

    ),

    // Express request-handler now receives filtered and validated data
    function(req, res){
        if (!req.form.isValid) {
            // Handle errors
            console.log(req.form.errors);
            res.redirect("/itineraire");

        } else {

            var levenstein_depart  = LevenshteinArray(liste_sommets_control,req.form.depart);
            var levenstein_arrive  = LevenshteinArray(liste_sommets_control,req.form.arrive);
            // Or, use filtered form data from the form object:
            var g = new Graphe(listestation,listestation3,listeStation2,listeArc);
                g.execute(levenstein_depart[0].w,levenstein_arrive[0].w);
                    var temps = isNaN(Math.round(g.temps_trajets[g.ind_chemin_min] / 60,0))? 0:Math.round(g.temps_trajets[g.ind_chemin_min] / 60,0);
                    var cmp = req.form.heuredepart.split(":");
                    var hh= cmp[0];
                    var min = cmp[1];
                     var date = new Date();
                     date.setHours(Number(hh));
                     date.setMinutes(Number(min));

                    //console.log(" hereu de daprt :");
                   console.log(" hereu de daprt "+ date.toDateString());

                    date.setSeconds(g.temps_trajets[g.ind_chemin_min]);
            res.render('itineraire_dep_arr.ejs',{trajet:g.chemin_optimal, depart: levenstein_depart[0].w, arrive :levenstein_arrive[0].w, cout:temps, duree:date}) ;
            //res.render('itineraire_dep_arr.ejs',{trajet:g.chemin_optimal, depart: req.form.depart, arrive :req.form.arrive, cout: g.temps_trajet}) ;
          //  res.render('itineraire_dep_arr.ejs',{trajet:g.chemin_optimal, depart: req.form.depart, arrive :req.form.arrive}) ;
            //res.write(html);


        }
    }
);


serv.get("/lignes",function (req,res) {
    res.render("lignes.ejs");


});


serv.get("/ligne/:id",function (req,res) {
        var id =  Number(req.params.id);
        console.log("ligne demandé");
        if (id >= 1 && id <= 16) {
            console.log(id);
            console.log(lignes[Number(req.params.id)-1]);
            res.render('ligne.ejs',{ idligne:Number(req.params.id), ligne:lignes[Number(req.params.id)-1]});
        }else{

            res.redirect("/itineraire");
        }
});



serv.get("/itineraire",function (req,res) {
    res.render('itineraire.ejs');


});



serv.get("/",function (req,res) {
    res.render("home.ejs");


});

serv.use(function (request,response) {

  //  response.send("ce chemin n'esxiste pas  " +request.originalUrl+ " rendez vous à l'accuiel du site => "+ "http://localhost:8080/");
    response.redirect("/itineraire");



});




serv.listen(8080);
