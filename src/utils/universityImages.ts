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
      return "/lovable-uploads/94601bdf-04ae-4fbc-801e-c6d177441763.png"; // 1. Әл-Фараби атындағы ҚазҰУ
    case "kimep": 
      return "/lovable-uploads/958ea90f-e451-4c44-857f-591ab5103789.png"; // 2. КИМЭП Университеті
    case "enu": 
      return "/lovable-uploads/a68e425c-e7b5-4ad8-9353-8611db20d1d2.png"; // 3. Еуразия ұлттық университеті
    case "satbayev": 
      return "/lovable-uploads/77acafa0-c745-4ea9-8518-38cd44f14d07.png"; // 4. Сәтбаев Университеті
    case "kazmu": 
      return "/lovable-uploads/fed986c7-8398-4041-886d-bffd8f25ff57.png"; // 5. ҚазҰМУ
    case "oku": 
      return "/lovable-uploads/84c14b6f-dd9a-47a0-939e-ccee8aa9ff4a.png"; // 6. М. Әуезов атындағы ОҚУ
    case "abay": 
      return "/lovable-uploads/0c8f8cb3-aece-4e69-98e9-8808acbcbafc.png"; // 7. Абай университеті
    case "ktu": 
      return "/lovable-uploads/5019d79b-5622-449e-b4cb-be9c40e8c7cc.png"; // 8. Қарағанды техникалық университеті
    case "buketov": 
      return "/lovable-uploads/47b9657e-784e-4e68-893a-ef709e27674f.png"; // 9. Бөкетов университеті
    case "kbtu": 
      return "/lovable-uploads/426becec-681b-487e-9c58-766771f6f24f.png"; // 10. КБТУ
    case "iitu": 
      return "/lovable-uploads/d5084532-e6c8-47ec-80d5-a815dcd5080d.png"; // 11. ХАТУ
    case "almau": 
      return "/lovable-uploads/30ddaca0-b3f1-4f53-a5c9-20cf92317b77.png"; // 12. AlmaU
    case "kazguu": 
      return "/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
    case "kaznau": 
      return "/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // ҚазҰАЗУ
    case "seifullin": 
      return "/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // С.Сейфуллин атындағы ҚАЗАТУ
    case "toraighyrov": 
      return "/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
    case "ektu": 
      return "/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
    case "taraz": 
      return "/lovable-uploads/cef18049-233b-4991-9350-90dc716bd49c.png"; // Тараз өңірлік университеті
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
    // New example images to demonstrate flexibility
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
