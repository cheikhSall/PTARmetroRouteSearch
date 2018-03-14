var fs = require('fs');
// file is included here:
eval(fs.readFileSync('Parsing.js')+'');


function  Graphe(l4,l3,l1,l2) {
    this.sommets_id = l4;
    this.dico = l3;
    this.ens_sommets=l1;
    this.ens_arcs=l2;
    this.d = [];
    this.chemins = [];
    this.ind_chemin_min = 0;
    this.temps_trajets = [];
    this.chemin_optimal= [];
    this.sommets_finals= {};
    this.predecesseurs = {}; // liste des predecesseurs
    this.distances = function (depart ) {

        for (var i in this.sommets_id){

            this.d[i] = new Sommet(i);


        }

        for (var i in this.d){


            if(String(this.sommets_id[i])== String(depart)) {

                this.d[i].cout = 0;
            }else {

            }

        }

    };

    this.sommets_visited = new Set(); // sommets visités
    this.sommets_non_visites = new Set(); // sommets à explorer

    this.getShortestDistanceAcutelle =function(destination) {  // la distance actuelle d'un sommet lors du parcours de dijsktra

        d2 = this.d[destination].cout;


        return d2   ;
    };


    this.getMinimum = function(set_vertex){ // renvoie le sommet suivant à explorer = sommet avec une distance minimale

        minimum = undefined;
        for (var i in set_vertex) {
            if(minimum == undefined){
                minimum = set_vertex[i];
            }else {
                if (this.getShortestDistanceAcutelle(set_vertex[i]) < this.getShortestDistanceAcutelle(minimum)) {
                    minimum = set_vertex[i];
                }
            }
        }

        return minimum;

    };

    this.isVisited = function(sommet){  // un sommet est visite ou pas
        return(this.sommets_visites.contains(sommet));
    };

    this.getDistance =function (origine,destination) { // distannce entre 2 sommets d'un arc

        var arc = this.ens_arcs[this.sommets_id[origine] + origine + destination];
        return arc;

    };


    this.getNeighbors = function (sommet) { // les voisins directs d'un sommet

        neighbors = this.ens_sommets[this.sommets_id[sommet]].adj;
        return neighbors;

    };


    this.findMinimalDistancesInNeighbor = function(sommet){

        sAdjacents= this.getNeighbors(sommet);

        for (var i = 0; i < sAdjacents.length; i++) {

            if( this.ens_arcs[this.sommets_id[sommet]+sommet+sAdjacents[i]] != undefined){
                var arc = this.getDistance(sommet, sAdjacents[i]);
                if (this.getShortestDistanceAcutelle(sAdjacents[i]) > this.getShortestDistanceAcutelle(sommet) + arc.val) {
                    this.d[sAdjacents[i]].cout = this.getShortestDistanceAcutelle(sommet) + arc.val;

                    this.predecesseurs[sAdjacents[i]]=new Sommet2(sommet,arc.line_metro,arc.direction,arc.ischangement);
                    this.sommets_finals[sAdjacents[i]] = new Sommet2(sAdjacents[i],arc.line_metro,arc.direction,arc.ischangement);

                }
            }


        }

    }

    this.execute  = function (depart,arrive) { // execution de l'algo sur n chemin de depart

        this.distances(depart);

        var sommets = [];
        var sommets_visites = [];

        for( var i in this.sommets_id ) {
            sommets.push(i);

        }

        while(sommets_visites.length != sommets.length){
            u = this.getMinimum(sommets);
          sommets_visites.push(u);
            delete sommets[sommets.indexOf(u)];
            this.findMinimalDistancesInNeighbor(u);

        }

          this.getChemins(arrive);

    };


    this.getChemins = function(destination){
        console.log("cheminnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

        // check if a path exists
        var arriveids =  this.ens_sommets[destination].ids;
        for (var i = 0; i<arriveids.length; i++) {
            var chemintemp = [];
            //var destination_quais = this.ens_sommets[destination].adj;
            console.log("destination  " + this.sommets_id[arriveids[i]]);
            if (this.predecesseurs[arriveids[i]] == undefined) {
                return null;
            }
            var step = arriveids[i];
            cmp = this.sommets_finals[arriveids[i]];
            cmp.direction1 = " Vous etes arrivé à destination ";
            chemintemp.push(cmp);
            //console.log(" arrive +");
            // console.log(this.sommets_finals[arrive]);
            while (this.predecesseurs[step] != undefined) {


                // this.chemins.push(this.ens_sommets[step]);
                chemintemp.push(this.predecesseurs[step]);
                step = this.predecesseurs[step].nom;


            }




            this.temps_trajets.push(this.d[arriveids[i]].cout);
            this.chemins.push(chemintemp);
            // console.log("sommet " + destination_quais[ind_min]+ " destination_quais[ind_min]" + this.sommets_id[this.sommets_finals[destination_quais[ind_min]].nom]);
            // this.chemin_optimal = this.chemins[ind_m];


        }

        for (var ind = 0; ind<this.temps_trajets; ind++){
            var m = this.temps_trajets[0];
            this.ind_chemin_min = 0;
            if( m> this.temps_trajets[i]){
               m=  this.temps_trajets[i];
                this.ind_chemin_min = i;
            }
        }

        this.chemin_optimal = this.chemins[ this.ind_chemin_min];
        this.chemin_optimal.reverse();
          for ( var l in this.chemin_optimal){
            this.chemin_optimal[l].nom = this.sommets_id[this.chemin_optimal[l].nom];
            }


    };



};
