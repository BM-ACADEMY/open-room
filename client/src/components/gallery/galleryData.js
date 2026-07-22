// Filter tabs shown above the gallery grid, in display order.
export const categories = [
  { id: "architecture", label: "Architecture" },
  { id: "ed-tech", label: "Ed - Tech" },
  { id: "studio", label: "Our Studio" },
];

const architecture = [
  { id: "arch-01", image: "/gallery/arch1.webp", title: "Architecture Project 01", category: "architecture" },
  { id: "arch-02", image: "/gallery/arch2.webp", title: "Architecture Project 02", category: "architecture" },
  { id: "arch-03", image: "/gallery/arch3.webp", title: "Architecture Project 03", category: "architecture" },
  { id: "arch-04", image: "/gallery/arch4.webp", title: "Architecture Project 04", category: "architecture" },
  { id: "arch-05", image: "/gallery/arch5.webp", title: "Architecture Project 05", category: "architecture" },
  { id: "arch-06", image: "/gallery/arch6.webp", title: "Architecture Project 06", category: "architecture" },
  { id: "arch-07", image: "/gallery/arch7.webp", title: "Architecture Project 07", category: "architecture" },
  { id: "arch-08", image: "/gallery/arch8.webp", title: "Architecture Project 08", category: "architecture" },
  { id: "arch-09", image: "/gallery/arch9.webp", title: "Architecture Project 09", category: "architecture" },
  { id: "arch-10", image: "/gallery/arch10.webp", title: "Architecture Project 10", category: "architecture" },
  { id: "arch-11", image: "/gallery/arch11.webp", title: "Architecture Project 11", category: "architecture" },
];

const edTech = [
  { id: "edtech-01", image: "/gallery/school1.webp", title: "Ed-Tech Initiative 01", category: "ed-tech" },
  { id: "edtech-02", image: "/gallery/school2.webp", title: "Ed-Tech Initiative 02", category: "ed-tech" },
  { id: "edtech-03", image: "/gallery/school3.webp", title: "Ed-Tech Initiative 03", category: "ed-tech" },
  { id: "edtech-04", image: "/gallery/school4.webp", title: "Ed-Tech Initiative 04", category: "ed-tech" },
  { id: "edtech-05", image: "/gallery/school5.webp", title: "Ed-Tech Initiative 05", category: "ed-tech" },
  { id: "edtech-06", image: "/gallery/school6.webp", title: "Ed-Tech Initiative 06", category: "ed-tech" },
  { id: "edtech-07", image: "/gallery/school7.webp", title: "Ed-Tech Initiative 07", category: "ed-tech" },
  { id: "edtech-08", image: "/gallery/school8.webp", title: "Ed-Tech Initiative 08", category: "ed-tech" },
  { id: "edtech-09", image: "/gallery/school9.webp", title: "Ed-Tech Initiative 09", category: "ed-tech" },
  { id: "edtech-10", image: "/gallery/school10.webp", title: "Ed-Tech Initiative 10", category: "ed-tech" },
  { id: "edtech-11", image: "/gallery/IMG_7442.webp", title: "Ed-Tech Initiative 11", category: "ed-tech" },

];

const studio = [
  { id: "studio-01", image: "/gallery/off1.webp", title: "Studio Moment 01", category: "studio" },
  { id: "studio-02", image: "/gallery/off2.webp", title: "Studio Moment 02", category: "studio" },
  { id: "studio-03", image: "/gallery/off3.webp", title: "Studio Moment 03", category: "studio" },
  { id: "studio-04", image: "/gallery/off4.webp", title: "Studio Moment 04", category: "studio" },
  // { id: "studio-05", image: "/gallery/off5.webp", title: "Studio Moment 05", category: "studio" },
  { id: "studio-06", image: "/gallery/off6.webp", title: "Studio Moment 06", category: "studio" },
  { id: "studio-07", image: "/gallery/off7.webp", title: "Studio Moment 07", category: "studio" },
];

export const galleryImages = [...architecture, ...edTech, ...studio];
