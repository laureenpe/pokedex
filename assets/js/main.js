$(document).ready(function () {
    getPokemons();
});
const API = 'http://pokeapi.co/api/v2/';  //Constant Api

// With this function I try to look up through de api images to give it an id  http://pokeapi.co/docsv2/#pokemonsprites

function getPokemonImage(id) {
    var url = "http://pokeapi.co/media/sprites/pokemon/";
    return url + id + '.png';
}

// get all the pokemons from api with ajax.
function getPokemons() {
    $.ajax({
        url: API + "pokemon?limit=20",//limit 20 because it is too slow to run the 811
        type: 'GET',
        datatType: 'JSON'
    }).done(function (response) {

        for (var i = 0; i < response.results.length; i++) {
            var name = response.results[i].name;
            var url_id = response.results[i].url.split('/');//To get only the ID number
            var id = url_id[url_id.length - 2];
            var image = getPokemonImage(id);
            console.log(image);
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
                            <medium>`+ name + `</medium>
                        </div>
                    </div>
                </div>
            </div>`;

            $('.pokemon-container').append(html);
        }
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
            console.log("habilidades" + " " +abilities);
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


//ajax llama 811 pokemons
//ajax click 
//ajax busca imagen

