
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
      return "public/lovable-uploads/93d4f861-eaff-4a58-a39a-cccae16687f1.png"; // КазНУ суреті
    case "kazmu": 
      return "public/lovable-uploads/9a91a880-f257-4936-9fbe-7d3290ff568e.png"; // 1. ҚазҰМУ суреті
    case "oku": 
      return "public/lovable-uploads/bc219841-91c3-4f94-a231-68e33b713252.png"; // 2. М. Әуезов атындағы ОҚУ
    case "ktu": 
      return "public/lovable-uploads/d8d26844-8131-41a5-ab7b-bb93e6983808.png"; // 3. Қарағанды техникалық университеті
    case "buketov": 
      return "public/lovable-uploads/27c3eb85-807c-455a-acb3-72179747bb97.png"; // 4. Бөкетов университеті
    case "almau": 
      return "public/lovable-uploads/83fbda14-7fa1-4abb-b8f1-f7c9f4f704a4.png"; // 5. AlmaU
    case "kazguu": 
      return "public/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // 6. KAZGUU Университеті
    case "kaznau": 
      return "public/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // 7. ҚазҰАЗУ
    case "seifullin": 
      return "public/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // 8. С.Сейфуллин атындағы ҚАЗАТУ
    case "toraighyrov": 
      return "public/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // 9. Торайғыров университеті
    case "ektu": 
      return "public/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // 10. Шығыс Қазақстан техникалық университеті
    case "taraz": 
      return "public/lovable-uploads/cef18049-233b-4991-9350-90dc716bd49c.png"; // 11. Тараз өңірлік университеті
    case "kokshetau": 
      return "public/lovable-uploads/ab3ef471-cac2-4bb7-a97d-eb14f7212448.png"; // 12. Көкшетау университеті
    case "yasawi": 
      return "public/lovable-uploads/aa68e8be-f0fe-4264-810e-1f1b50e70513.png"; // 13. Қ.А.Ясауи атындағы ХҚТУ
    case "karaganda": 
      return "public/lovable-uploads/71fd4b3b-9b52-4e9b-a05e-ac774b7d3bac.png"; // 14. Қазтұтынуодағы Қарағанды университеті
    case "ablaikhan": 
      return "public/lovable-uploads/39fb90f3-2b54-4dfe-9051-78ea3f3c3627.png"; // 15. Абылай хан атындағы ҚазХҚжәнеӘТУ
    case "semey": 
      return "public/lovable-uploads/711a23b3-38d3-479d-8396-3e392be7d0c1.png"; // 16. Семей медицина университеті
    case "astana": 
      return "public/lovable-uploads/7807c993-b7c8-4c78-9d7d-9d79e6dc3606.png"; // 17. Астана медицина университеті
    case "zhubanov": 
      return "public/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"; // 18. Қ. Жұбанов атындағы АӨУ
    case "ospanov": 
      return "public/lovable-uploads/9f4a4e27-b330-408c-8835-141c0be40d78.png"; // 19. М. Оспанов атындағы БҚМУ
    case "amanzholov": 
      return "public/lovable-uploads/415696c9-4ede-402b-96f7-ef15567a3640.png"; // 20. С. Аманжолов атындағы ШҚУ
    // Басқа университеттерге қажет болған жағдайда қосылады
    default:
      // Егер университет ID-сі белгілі болмаса, оның өзінің суретін қайтарамыз
      return university?.image || ""; 
  }
};
