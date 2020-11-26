//LeafletJS - create map
const mymap = L.map("mapid").setView([-27.222620, -49.6455880], 15);

//create and add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})

function addMarker({id,name,lat,lng}) {
  //create pop up overlay
  const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(
      //aqui será utilizada template literals, ou seja, vou colocar a string dentro de crase p poder utilizar variáveis interpoladas
    `${name} <a href="/orphanage?id=${id}"><img src="/images/arrow-white.svg" </a>`
  );

  //create and add marker
  L.marker([lat, lng], { icon }).addTo(mymap).bindPopup(popup)
}

const orphanagesSpan = document.querySelectorAll('.orphanages span')

orphanagesSpan.forEach(span=>{
    const orphanage ={
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }
    addMarker(orphanage)
})
