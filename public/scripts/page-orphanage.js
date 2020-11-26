/* const options = {
    dragging = false,
    touchZoom = false,
    doubleClickZoom = false,
    scrollWheelZoom = false,
    zoomControl = false
}

Não utilizei o código acima por problemas na exibição 
*/

//get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

//LeafletJS
const mymap = L.map('mapid').setView([lat, lng], 15)

//create and add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]

})

//create and add marker
L.marker([lat, lng], {icon})
.addTo(mymap)


/*image gallery*/
function selectImage(event){
    const button = event.currentTarget;
    //remover todas as classes .active
    const buttons = document.querySelectorAll(".images button") //pesquisar todos os seletores dados como argumento
    buttons.forEach(removeActiveClass);

    function removeActiveClass(button){
        button.classList.remove("active")
    }
    /*
    Utilizando uma arrow function, a mesma função acima ficaria:
    buttons.forEach((button)=>{
        button.classList.remove("active")
    })
    */
    
    //selecionar a imagem clicada
    const image = button.children[0];
    const imageContainer = document.querySelector(".orphanage-details > img");

    //atualizar o container de imagem

    imageContainer.src = image.src;

    //adicionar de volta a classe .active no botão que foi clicado
    button.classList.add('active')
}