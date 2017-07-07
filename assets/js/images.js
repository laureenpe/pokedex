var url = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

function getPokemonImage(id){
    if(id < 10) {
        return url + '00' + id + '.png'
    }else if(id < 100) {
        return url + '0' + id + '.png'
    }else{
        return url + id + '.png'
    }    
}