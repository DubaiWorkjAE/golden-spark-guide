export const site = {
  name: "Golden Spark Detectors",
  whatsapp: "971522448875",
  phones: [
    { label: "English", display: "+971 52 244 8875", tel: "+971522448875" },
    { label: "العربية", display: "+971 55 426 8455", tel: "+971554268455" },
  ],
  email: "info@gsdetectors.com",
  address: ["Shop No 2, Essam Lootah Building", "Eyal Nassar, Deira", "Dubai, UAE · PO Box 171133"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Golden+Spark+Detectors+Essam+Lootah+Building+Deira+Dubai",
  website: "https://gsdetectors.com",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: "Hello Golden Spark, I need help choosing the right detector.",
  product: (name: string) => `Hello Golden Spark, I'm interested in the ${name}. Please send me the price and details.`,
  section: (title: string) => `Hello Golden Spark, I'm not sure which ${title.toLowerCase()} is right for me. Can you help?`,
};
