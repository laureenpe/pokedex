$(document).ready(function () {
    getPokemons();
    $('#search').keydown(onKeyPress);//listener keys pressed.

});
const API = 'https://pokeapi.co/api/v2/';  //Constant Api
var pokemons = [];

// With this function I try to look up through de api images to give it an id  http://pokeapi.co/docsv2/#pokemonsprites

function getPokemonImage(id) {
    var url = "http://pokeapi.co/media/sprites/pokemon/";
    return url + id + '.png';
}

// get all the pokemons from api with ajax.
function getPokemons() {
    $.ajax({
        url: API + "pokemon?limit=811",//image limit
        type: 'GET',
        datatType: 'JSON'
    }).done(function (response) {
        pokemons = response.results;//Obtain the results of all the pokemons
        var html = ""; //accumulate var
        for (var i = 0; i < pokemons.length; i++) {
            var name = pokemons[i].name;
            var url_id = pokemons[i].url.split('/');//To get only the ID number
            var id = url_id[url_id.length - 2];
            var image = getPokemonImage(id);
            console.log(image);
            html += `<div class="col s10 m2 l2">
                <div class="pokemon-box">
                    <figure class="photo"><a href="#modal1" data-id="`+ id + `" onclick="onClickPokemon(this)" id="pokemon_` + id + `"><img src="` + image + `" alt="photo"></a></figure>
                    <div class="notch-collectibles-small">
                        <div class="collectibles-wrapper">
                            <div class="collectibles-collection"><a href="#" rel="tooltip"<span class="icon icon_collection"><img src="assets/icon/pokeball_gray.png" alt="icon"></span></a></div>
                            <div class="collectibles-wishlist"><a href="#" rel="tooltip"<span class="icon icon_wishlist"><img src="assets/icon/valentines-heart.png" alt="icon"> </span></a></div>
                            <div class="collectibles-trade"><a href="#" rel="tooltip"><span class="icon icon_trade"><img src="assets/icon/data.png" alt="icon"></span></a></div>
                        </div>
                        <div class="texto">
                            <medium>`+ name + `</medium>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        $('.pokemon-container').html(html); //previously I had append but it wasn´t working with the search button
    });
}

function onClickPokemon(element) {
    console.log(element.id);
    var id = $("#" + element.id).attr('data-id');
    //Calling for the modal
    $.ajax({
        url: API + "pokemon/" + id
    }).done(function (response) {
        console.log(response);
        console.log("Nombre: " + response.name);
        $("#modal-name").html(response.name);
        $("#modal-photo").attr("src", getPokemonImage(id));
        $("#pokemon-modal-name").html(response.name);
        //WEIGTH AND HEIGHT
        $("#weight").html(response.weight);
        console.log("Peso y tamaño: " + response.weight + " " + response.height);
        $("#height").html(response.height);
        //ABILITIES
        for (var k = 0; k < response.types.length; k++) {
            var abilities = response.abilities[k].ability.name;
            $('#habilities').append(abilities + " ");
            console.log("habilidades" + " " + abilities);
        }

        //Types
        for (var index = 0; index < response.types.length; index++) {
            var type = response.types[index].type.name;
            $('#type-pokemon').append(type + " ");
            console.log(type);
        }

        //Calling for the modal text
        $.ajax({
            url: API + "pokemon-species/" + id
        }).done(function (species) {
            console.log("species");
            console.log(species);
            $("#base_experience").html(species.flavor_text_entries[11].flavor_text);
            $("#pokemon-category").html(species.genera[0].genus);

            console.log(species.genera[0].genus);
        });
        /*I pretend to call the gender but it is not working
                 $.ajax({
                    url: API + "gender/" + id
                }).done(function (gender) {
                    console.log("genero");
                    console.log(gender);
                    $("#gender").html(gender.name);
        
                });*/

    });
}


//POKEMONS SEARCH

function findPokemons(name) {
    var result = pokemons.find(function (element) {
        return element.name === name;
    });
    return result;
}
function sortPokemons() {
    var pokeResult = pokemons.sort(function (a, b) {
        return b.name < a.name;
    })

    var html = ""; //accumulate var
    for (var i = 0; i < pokeResult.length; i++) {
        var name = pokeResult[i].name;
        var url_id = pokeResult[i].url.split('/');//To get only the ID number
        var id = url_id[url_id.length - 2];
        var image = getPokemonImage(id);
        console.log(image);
        html += `<div class="col s10 m2 l2">
                <div class="pokemon-box">
                    <figure class="photo"><a href="#modal1" data-id="`+ id + `" onclick="onClickPokemon(this)" id="pokemon_` + id + `"><img src="` + image + `" alt="photo"></a></figure>
                    <div class="notch-collectibles-small">
                        <div class="collectibles-wrapper">
                            <div class="collectibles-collection"><a href="#" rel="tooltip"<span class="icon icon_collection"><img src="assets/icon/pokeball_gray.png" alt="icon"></span></a></div>
                            <div class="collectibles-wishlist"><a href="#" rel="tooltip"<span class="icon icon_wishlist"><img src="assets/icon/valentines-heart.png" alt="icon"> </span></a></div>
                            <div class="collectibles-trade"><a href="#" rel="tooltip"><span class="icon icon_trade"><img src="assets/icon/data.png" alt="icon"></span></a></div>
                        </div>
                        <div class="texto">
                            <medium>`+ name + `</medium>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    $('.pokemon-container').html(html); //previously I had append but it wasn´t working with the search button
};

//ON KEY PRESS, LOOK UP FOR THE POKEMONS
function onKeyPress(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        if ($('#new-task').val() != '') {
            var result = $("#search").val();
            var objectPokemons = findPokemons(result);
            console.log(objectPokemons);
            if (typeof objectPokemons != "undefined") {
                var url_id = objectPokemons.url.split('/');//To get only the ID number
                var id = url_id[url_id.length - 2];
                var image = getPokemonImage(id);
                var html = `<div class="col s10 m2 l2">
                <div class="pokemon-box">
                    <figure class="photo"><a href="#modal1" data-id="`+ id + `" onclick="onClickPokemon(this)" id="pokemon_` + id + `"><img src="` + image + `" alt="photo"></a></figure>
                    <div class="notch-collectibles-small">
                        <div class="collectibles-wrapper">
                            <div class="collectibles-collection"><a href="#" rel="tooltip"<span class="icon icon_collection"><img src="assets/icon/pokeball_gray.png" alt="icon"></span></a></div>
                            <div class="collectibles-wishlist"><a href="#" rel="tooltip"<span class="icon icon_wishlist"><img src="assets/icon/valentines-heart.png" alt="icon"> </span></a></div>
                            <div class="collectibles-trade"><a href="#" rel="tooltip"><span class="icon icon_trade"><img src="assets/icon/data.png" alt="icon"></span></a></div>
                        </div>
                        <div class="texto">
                            <medium>`+ objectPokemons.name + `</medium>
                        </div>
                    </div>
                </div>
            </div>
            <div class:"back"><a href="#" onclick="getPokemons()" class="waves-effect waves-light btn back-search">Volver</a></div>`;

                $(".pokemon-container").html(html);
            }
        } else {
            alert("Buscador no puede estar vacío")
        }
    }
}

//ajax llama 811 pokemons
//ajax click 
//ajax busca imagen

