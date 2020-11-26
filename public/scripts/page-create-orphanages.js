//LeafletJS - create map
const mymap = L.map('mapid').setView([-27.222633, -49.6455874], 15)

//create and add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68]

})

//variavel que é o ponto no mapa
let marker;

/* create and add marker
L.marker([-27.222633, -49.6455874], {icon})
.addTo(map) */
mymap.on('click', function(event){
    //para verificar as propriedades: console.log(event);
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //busca o que foi digitado no html e depois será passado como parametro via url
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon - verifica se existe um marcador, se houver, remove, senão, passa para a proxima linha.
    marker && mymap.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat,lng], {icon}).addTo(mymap);

})


//adicionar o campo de fotos
function addPhotoField(){
    //pegar o container de fotos
    const container = document.querySelector('#images');
    //pegar o container para duplicar 
    const fieldsContainer = document.querySelectorAll('.new-upload');
    //realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    //verificar se há algo digitado no input no campo antes de clonar. Se sim, não adicionar ao container de imagens. 
    //console.log(newFieldContainer.children);
    const input = newFieldContainer.children[0];
    console.log(input);
    if(input.value == ""){
        return; //a função vai parar de executar o código aqui se nao houver nada digitado no campo input
    }
    //limpar o campo antes de adicionar ao container de imagens (para verificar, Console.log(newFieldContainer.children))
    input.value = "" 
    //adicionar o clone ao container de imagens 
    container.appendChild(newFieldContainer);

}

//remover campos extras de fotos
function deleteField(event){
    //console.log(event)
    //excluir um por vez, de baixo para cima, deixando pelo menos o último
    const span = event.currentTarget;
    const fieldsContainer = document.querySelectorAll('.new-upload');
    if(fieldsContainer.length <= 1){
        //limpa o valor do campo
        span.parentNode.children[0].value = ""
        return
    }
    //deletar campo
    span.parentNode.remove();


}

//selecionar sim ou não
function toggleSelect(event){
    //o objetivo é trocar a classe active de um para outro 
    //retirar a classe .active de tdos os botões
    document.querySelectorAll('.button-select button').forEach(function(button) {
        button.classList.remove('active');
    })
    //outra forma de fazer a função acima é document.querySelectorAll('.button-select button').forEach((button) => button.classList.remove('active'))
    //pegar o botao clicado e colocar a classe
    const button = event.currentTarget;
    button.classList.add('active');
    //atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')    
    //sim ou não? - utilizei data-event valendo yes ou no
    input.value = button.dataset.value;
   

}

function validade(event){
    /* console.log('entrou na função')
    //validade se lat e lng estão preenchidos e não envia o formulario se estiverem vazios
    if(Object.values(fields).includes('')){
        console.log('entrou no true')
        event.preventDefault()
        alert('Todos os campos devem ser preenchidos') 
    }else{
        console.log('entrou  no false')
        alert("Registro efetuado com sucesso!")
    } */

    const LngLat = false;
    if (LngLat){
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
    
}



