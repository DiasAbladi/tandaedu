
// Бұл файлда университеттердің суреттері үшін функция құрылады
// Бұл функция ID бойынша сәйкес суретті қайтарады

/**
 * Университет ішінен сурет алу функциясы
 * @param uniId - Университеттің ID-і
 * @returns Университеттің суретінің жолы
 */
export const getUniversityImage = (uniId: string): string => {
  switch(uniId) {
    case "kazmu": 
      return "/lovable-uploads/f457b370-e8ce-458e-9ab4-f644cd1de91e.png"; // 1. ҚазҰМУ
    case "oku": 
      return "/lovable-uploads/50a0e65d-263b-4774-8c04-f8636c2e2569.png"; // 2. М. Әуезов атындағы ОҚУ
    case "abay": 
      return "/lovable-uploads/5d28d06b-1cfe-4143-94c8-e3d04510b22b.png"; // 3. Абай университеті
    case "ktu": 
      return "/lovable-uploads/c9067845-180a-4656-b984-4771f5826e6a.png"; // 4. Қарағанды техникалық университеті
    case "kaznau": 
      return "/lovable-uploads/b3c002a5-4bab-4d69-9f23-b9ae23415ebb.png"; // 5. ҚазҰАЗУ
    case "seifullin": 
      return "/lovable-uploads/e9746cd6-f09a-4e58-abd6-1ce1539ef498.png"; // 6. С.Сейфуллин атындағы ҚАЗАТУ
    case "taraz": 
      return "/lovable-uploads/13b1d2c0-1190-47b1-8789-71e9109e722b.png"; // 7. Тараз өңірлік университеті
      
    case "kaznu": 
      return "/lovable-uploads/94601bdf-04ae-4fbc-801e-c6d177441763.png"; // Әл-Фараби атындағы ҚазҰУ
    case "kimep": 
      return "/lovable-uploads/958ea90f-e451-4c44-857f-591ab5103789.png"; // КИМЭП Университеті
    case "enu": 
      return "/lovable-uploads/a68e425c-e7b5-4ad8-9353-8611db20d1d2.png"; // Еуразия ұлттық университеті
    case "satbayev": 
      return "/lovable-uploads/77acafa0-c745-4ea9-8518-38cd44f14d07.png"; // Сәтбаев Университеті
    case "buketov": 
      return "/lovable-uploads/47b9657e-784e-4e68-893a-ef709e27674f.png"; // Бөкетов университеті
    case "iitu": 
      return "/lovable-uploads/e1708cd5-dcf5-49f1-ac96-db74ff16e353.png"; // ХАТУ
    case "kbtu": 
      return "/lovable-uploads/4ba89a5e-0b84-42a9-bff7-7b2b8987311d.png"; // КБТУ
    case "almau": 
      return "/lovable-uploads/30ddaca0-b3f1-4f53-a5c9-20cf92317b77.png"; // AlmaU
    case "kazguu": 
      return "/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
    case "kokshetau": 
      return "/lovable-uploads/ab3ef471-cac2-4bb7-a97d-eb14f7212448.png"; // Көкшетау университеті
    case "yasawi": 
      return "/lovable-uploads/aa68e8be-f0fe-4264-810e-1f1b50e70513.png"; // Қ.А.Ясауи атындағы ХҚТУ
    case "karaganda": 
      return "/lovable-uploads/71fd4b3b-9b52-4e9b-a05e-ac774b7d3bac.png"; // Қазтұтынуодағы Қарағанды университеті
    case "ablaikhan": 
      return "/lovable-uploads/39fb90f3-2b54-4dfe-9051-78ea3f3c3627.png"; // Абылай хан атындағы ҚазХҚжәнеӘТУ
    case "semey": 
      return "/lovable-uploads/711a23b3-38d3-479d-8396-3e392be7d0c1.png"; // Семей медицина университеті
    case "astana": 
      return "/lovable-uploads/7807c993-b7c8-4c78-9d7d-9d79e6dc3606.png"; // Астана медицина университеті
    case "zhubanov": 
      return "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"; // Қ. Жұбанов атындағы АӨУ
    case "ospanov": 
      return "/lovable-uploads/9f4a4e27-b330-408c-8835-141c0be40d78.png"; // М. Оспанов атындағы БҚМУ
    case "amanzholov": 
      return "/lovable-uploads/415696c9-4ede-402b-96f7-ef15567a3640.png"; // С. Аманжолов атындағы ШҚУ
    case "ektu": 
      return "/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
    case "toraighyrov": 
      return "/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
    case "new-university-1":
      return "/lovable-uploads/663c563b-eb3b-45d2-b905-408053355bfd.png"; // Example new university image
    case "new-university-2":
      return "/lovable-uploads/55a741f0-9d61-4102-b0f5-e78f91c678d8.png"; // Example new university image
    // Басқа университеттерге қажет болған жағдайда қосылады
    default:
      // Егер университет ID-сі белгілі болмаса, әдепкі суретті қайтарамыз
      return "/placeholder.svg"; 
  }
};
