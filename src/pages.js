const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  //função colocada como propriedade para renderizar cada uma das páginas
  index: function (request, response) {
    return response.render("index");
  },

  //a sintaxe é a mesma que a de cima, porém utilizando simplificacao
  //consultar e exibir um único registro
  async orphanage(request, response) {
    const id = request.query.id;

    try {
      const db = await Database; //construção alterantiva sem o Database.then (async db... etc etc)
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = ${id}`
      );
      const orphanage = results[0];
      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      if(orphanage.open_on_weekends == "no"){
          orphanage.open_on_weekends = false
      }else{
          orphanage.open_on_weekends = true
      }

      return response.render("orphanage", { orphanage });

    } catch (error) {
      console.log(error);
      return response.send("Erro no banco de dados");
    }

  },

  async orphanages(request, response) {
    try {
      const db = await Database; //construção alterantiva sem o Database.then (async db... etc etc)
      const orphanages = await db.all("SELECT * FROM orphanages");
      return response.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return response.send("Erro no banco de dados");
    }
  },

  createOrphanages(request, response) {
    return response.render("create-orphanages");

  },

  async saveOrphanage(request,response){
      const fields = request.body;
      console.log(fields);
      // validar se todos os campos estao preenchidos
      if (Object.values(fields).includes("")) {
        return res.send("Todos os campos devem ser preenchidos!");
      }
      try {
          //salvar orfanato
        const db = await Database    
        await saveOrphanage(db,{
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images,
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,

      });
      //redirecionamento
      return response.redirect("/orphanages")    
      } catch (error) {
        console.log(error);
        return response.send('Erro no banco de dados');    
      }
    
  },
};
