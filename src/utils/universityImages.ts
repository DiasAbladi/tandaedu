
// Бұл файлда университеттердің суреттері үшін функция құрылады
// Бұл функция ID бойынша сәйкес суретті қайтарады

/**
 * Университет ішінен сурет алу функциясы
 * @param uniId - Университеттің ID-і
 * @returns Университеттің суретінің жолы
 */
export const getUniversityImage = (uniId: string): string => {
  switch(uniId) {
    case "kaznu": 
      return "public/lovable-uploads/c2c8e5ad-ea14-49e2-b936-ac5018901763.png"; // 1. Әл-Фараби атындағы ҚазҰУ
    case "kimep": 
      return "public/lovable-uploads/66954788-4f17-4e2d-861d-fb49fa669f14.png"; // 2. КИМЭП Университеті
    case "enu": 
      return "public/lovable-uploads/01566a9b-f676-4967-b2b4-8fb83b789577.png"; // 3. Еуразия ұлттық университеті
    case "satbayev": 
      return "public/lovable-uploads/3e3662fd-8328-4b34-b748-af41c130088a.png"; // 4. Сәтбаев Университеті
    case "kazmu": 
      return "public/lovable-uploads/66d955d8-f75f-4633-8b84-09b27fe21c26.png"; // 5. ҚазҰМУ
    case "oku": 
      return "public/lovable-uploads/08ece5bd-f469-4453-8044-0976f14aebed.png"; // 6. М. Әуезов атындағы ОҚУ
    case "abay": 
      return "public/lovable-uploads/0c8f8cb3-aece-4e69-98e9-8808acbcbafc.png"; // 7. Абай университеті
    case "ktu": 
      return "public/lovable-uploads/5019d79b-5622-449e-b4cb-be9c40e8c7cc.png"; // 8. Қарағанды техникалық университеті
    case "buketov": 
      return "public/lovable-uploads/47b9657e-784e-4e68-893a-ef709e27674f.png"; // 9. Бөкетов университеті
    case "kbtu": 
      return "public/lovable-uploads/426becec-681b-487e-9c58-766771f6f24f.png"; // 10. КБТУ
    case "iitu": 
      return "public/lovable-uploads/d5084532-e6c8-47ec-80d5-a815dcd5080d.png"; // 11. ХАТУ
    case "almau": 
      return "public/lovable-uploads/30ddaca0-b3f1-4f53-a5c9-20cf92317b77.png"; // 12. AlmaU
    case "kazguu": 
      return "public/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
    case "kaznau": 
      return "public/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // ҚазҰАЗУ
    case "seifullin": 
      return "public/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // С.Сейфуллин атындағы ҚАЗАТУ
    case "toraighyrov": 
      return "public/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
    case "ektu": 
      return "public/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
    case "taraz": 
      return "public/lovable-uploads/cef18049-233b-4991-9350-90dc716bd49c.png"; // Тараз өңірлік университеті
    case "kokshetau": 
      return "public/lovable-uploads/ab3ef471-cac2-4bb7-a97d-eb14f7212448.png"; // Көкшетау университеті
    case "yasawi": 
      return "public/lovable-uploads/aa68e8be-f0fe-4264-810e-1f1b50e70513.png"; // Қ.А.Ясауи атындағы ХҚТУ
    case "karaganda": 
      return "public/lovable-uploads/71fd4b3b-9b52-4e9b-a05e-ac774b7d3bac.png"; // Қазтұтынуодағы Қарағанды университеті
    case "ablaikhan": 
      return "public/lovable-uploads/39fb90f3-2b54-4dfe-9051-78ea3f3c3627.png"; // Абылай хан атындағы ҚазХҚжәнеӘТУ
    case "semey": 
      return "public/lovable-uploads/711a23b3-38d3-479d-8396-3e392be7d0c1.png"; // Семей медицина университеті
    case "astana": 
      return "public/lovable-uploads/7807c993-b7c8-4c78-9d7d-9d79e6dc3606.png"; // Астана медицина университеті
    case "zhubanov": 
      return "public/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"; // Қ. Жұбанов атындағы АӨУ
    case "ospanov": 
      return "public/lovable-uploads/9f4a4e27-b330-408c-8835-141c0be40d78.png"; // М. Оспанов атындағы БҚМУ
    case "amanzholov": 
      return "public/lovable-uploads/415696c9-4ede-402b-96f7-ef15567a3640.png"; // С. Аманжолов атындағы ШҚУ
    // Басқа университеттерге қажет болған жағдайда қосылады
    default:
      // Егер университет ID-сі белгілі болмаса, әдепкі суретті қайтарамыз
      return "public/placeholder.svg"; 
  }
};
