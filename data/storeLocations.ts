export interface StoreLocation {
  id: string;
  name: string;
  branchName: string;
  tagline: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  hours: string;
  googleMapsUrl: string;
  embedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isMain?: boolean;
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "town",
    name: "KTR Cycle World - Tirunelveli Town",
    branchName: "Tirunelveli Town",
    tagline: "Main Showroom",
    address: "Nainar kulam road, Tirunelveli Town",
    city: "Tirunelveli",
    district: "Tirunelveli",
    postalCode: "627006",
    phone: "+91 9342727735",
    whatsapp: "919342727735",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM",
    googleMapsUrl:
      "https://www.google.com/maps/place/KTR+Cycle+World/@8.7297523,77.6901667,1099m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3b0411bc2fcb71cd:0x1080811ac3daa6d7!2sKTR+Cycle+World!8m2!3d8.7296942!4d77.690064!10e5!16s%2Fg%2F11pm71v3_7!3m5!1s0x3b0411bc2fcb71cd:0x1080811ac3daa6d7!8m2!3d8.7296942!4d77.690064!16s%2Fg%2F11pm71v3_7",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d77.690064!3d8.7296942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0411bc2fcb71cd%3A0x1080811ac3daa6d7!2sKTR%20Cycle%20World!5e0!3m2!1sen!2sin!4v1700000000000",
    coordinates: { lat: 8.7296942, lng: 77.690064 },
    isMain: true,
  },
  {
    id: "samathanapuram",
    name: "KTR Cycle World - Samathanapuram Branch",
    branchName: "Samathanapuram",
    tagline: "Palayamkottai Branch",
    address: "Samathanapuram, Palayamkottai",
    city: "Tirunelveli",
    district: "Tirunelveli",
    postalCode: "627002",
    phone: "+91 9342727735",
    whatsapp: "919342727735",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM",
    googleMapsUrl:
      "https://www.google.com/maps/place/KTR+CYCLE+WORD+-+Samathanapuram+Branch/@8.7250575,77.7425275,1099m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b040f39db197137:0x1df40a7a1c1ced44!8m2!3d8.7250575!4d77.7451024!16s%2Fg%2F11vdh1_dsx",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.9!2d77.7451024!3d8.7250575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b040f39db197137%3A0x1df40a7a1c1ced44!2sKTR%20CYCLE%20WORLD%20-%20Samathanapuram%20Branch!5e0!3m2!1sen!2sin!4v1700000000000",
    coordinates: { lat: 8.7250575, lng: 77.7451024 },
    isMain: false,
  },
  {
    id: "kayathar",
    name: "KTR Cycle World - Kayathar Branch",
    branchName: "Kayathar",
    tagline: "Kayathar Branch",
    address: "Main Road, Kayathar",
    city: "Kayathar",
    district: "Thoothukudi",
    postalCode: "628952",
    phone: "+91 9342727735",
    whatsapp: "919342727735",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM",
    googleMapsUrl: "https://maps.app.goo.gl/3duFBUS3LPgBq1ip6",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.7!2d77.7709807!3d8.9391876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0403a7c9d15cdf%3A0xc5e22c32e557de95!2sKTR%20CYCLE%20WORLD!5e0!3m2!1sen!2sin!4v1700000000000",
    coordinates: { lat: 8.9391876, lng: 77.7709807 },
    isMain: false,
  },
  {
    id: "kalakkad",
    name: "KTR Cycle World - Kalakkad Branch",
    branchName: "Kalakkad",
    tagline: "Kalakkad Branch",
    address: "Main Road, Kalakkad",
    city: "Kalakkad",
    district: "Tirunelveli",
    postalCode: "627501",
    phone: "+91 9342727735",
    whatsapp: "919342727735",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM",
    googleMapsUrl:
      "https://www.google.com/maps/place/KTR+CYCLE+WORLD+KALAKKAD+BRANCH/@8.5148606,77.5560768,1100m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b04431bbfafa209:0x1fcb8bba5fe6cb1d!8m2!3d8.5148606!4d77.5586517!16s%2Fg%2F11xz5hzmr7",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8!2d77.5586517!3d8.5148606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04431bbfafa209%3A0x1fcb8bba5fe6cb1d!2sKTR%20CYCLE%20WORLD%20KALAKKAD%20BRANCH!5e0!3m2!1sen!2sin!4v1700000000000",
    coordinates: { lat: 8.5148606, lng: 77.5586517 },
    isMain: false,
  },
];
