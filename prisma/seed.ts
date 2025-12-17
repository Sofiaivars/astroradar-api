import { prisma } from "../src/config/prisma";

async function main(){
  const data = [
    {
      "evento": "Lluvia de meteoros Cuadrántidas",
      "fecha_inicio": "2025-01-01",
      "fecha_fin": "2025-01-05",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Hemisferio Norte",
      "fase_lunar": "creciente"
    },
    {
      "evento": "Eclipse total de Luna",
      "fecha_inicio": "2025-03-13",
      "fecha_fin": "2025-03-14",
      "tipo": "eclipse lunar",
      "visibilidad": "América, oeste de Europa y África",
      "fase_lunar": "llena"
    },
    {
      "evento": "Eclipse parcial de Sol",
      "fecha_inicio": "2025-03-29",
      "fecha_fin": "2025-03-29",
      "tipo": "eclipse solar",
      "visibilidad": "Europa occidental, incluyendo España",
      "fase_lunar": "nueva"
    },
    {
      "evento": "Lluvia de meteoros Líridas",
      "fecha_inicio": "2025-04-16",
      "fecha_fin": "2025-04-25",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Hemisferio Norte",
      "fase_lunar": "creciente"
    },
    {
      "evento": "Lluvia de meteoros Eta Acuáridas",
      "fecha_inicio": "2025-05-04",
      "fecha_fin": "2025-05-06",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Hemisferio Sur",
      "fase_lunar": "menguante"
    },
    {
      "evento": "Lluvia de meteoros Delta Acuáridas",
      "fecha_inicio": "2025-07-28",
      "fecha_fin": "2025-07-30",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Hemisferio Sur",
      "fase_lunar": "menguante"
    },
    {
      "evento": "Lluvia de meteoros Perseidas",
      "fecha_inicio": "2025-07-17",
      "fecha_fin": "2025-08-13",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Hemisferio Norte",
      "fase_lunar": "creciente"
    },
    {
      "evento": "Eclipse total de Luna",
      "fecha_inicio": "2025-09-07",
      "fecha_fin": "2025-09-08",
      "tipo": "eclipse lunar",
      "visibilidad": "Europa, África, Asia y Australia",
      "fase_lunar": "llena"
    },
    {
      "evento": "Eclipse parcial de Sol",
      "fecha_inicio": "2025-09-21",
      "fecha_fin": "2025-09-21",
      "tipo": "eclipse solar",
      "visibilidad": "Oceanía y Antártida",
      "fase_lunar": "nueva"
    },
    {
      "evento": "Lluvia de meteoros Oriónidas",
      "fecha_inicio": "2025-10-21",
      "fecha_fin": "2025-10-22",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Ambos hemisferios",
      "fase_lunar": "menguante"
    },
    {
      "evento": "Lluvia de meteoros Leónidas",
      "fecha_inicio": "2025-11-17",
      "fecha_fin": "2025-11-18",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Ambos hemisferios",
      "fase_lunar": "menguante"
    },
    {
      "evento": "Lluvia de meteoros Gemínidas",
      "fecha_inicio": "2025-12-13",
      "fecha_fin": "2025-12-14",
      "tipo": "lluvia de meteoros",
      "visibilidad": "Ambos hemisferios",
      "fase_lunar": "nueva"
    },
    {
      "evento": "Conjunción Venus-Júpiter",
      "fecha_inicio": "2025-08-11",
      "fecha_fin": "2025-08-12",
      "tipo": "evento planetario",
      "visibilidad": "Global",
      "fase_lunar": "creciente"
    },
    {
      "evento": "Oposición de Saturno",
      "fecha_inicio": "2025-07-15",
      "fecha_fin": "2025-07-15",
      "tipo": "evento planetario",
      "visibilidad": "Global",
      "fase_lunar": "llena"
    },
    {
      "evento": "Oposición de Júpiter",
      "fecha_inicio": "2025-10-03",
      "fecha_fin": "2025-10-03",
      "tipo": "evento planetario",
      "visibilidad": "Global",
      "fase_lunar": "llena"
    },
  ];

  for(const e of data){
    await prisma.event.create({
      data: {
        event: e.evento,
        category: e.tipo,
        start_date: new Date(e.fecha_inicio),
        end_date: new Date (e.fecha_fin),
        moon: e.fase_lunar,
        visibility: e.visibilidad,
        image: e.tipo === "lluvia de meteoros" 
          ? "https://images.theconversation.com/files/564819/original/file-20231211-25-v7fc5g.jpg?ixlib=rb-4.1.0&rect=207%2C145%2C4684%2C2729&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
          : e.tipo === "eclipse lunar"
            ? "https://static.nationalgeographic.es/files/styles/image_3200/public/4931.600x450.jpg?w=1900&h=1425"
            : e.tipo === "eclipse solar"
              ? "https://content.nationalgeographic.com.es/medio/2025/06/25/eclipse-solar-marzo_0195214f_250625113231_800x800.webp"
              : e.tipo === "evento planetario"
                ? "https://phantom-marca-mx.unidadeditorial.es/cae3f4d74008c3912e5cd8c85787a18e/resize/828/f/jpg/mx/assets/multimedia/imagenes/2025/01/21/17374997597311.jpg"
                : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })