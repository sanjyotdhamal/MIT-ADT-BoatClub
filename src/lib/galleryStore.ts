 
export type GalleryPhoto = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
  createdAt: string;
};

const STORAGE_KEY = "mitbc_gallery";

// Get all photos
export const getPhotos = (): GalleryPhoto[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultPhotos;
};

// Save all photos
export const savePhotos = (photos: GalleryPhoto[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
};

// Add photo
export const addPhoto = (photo: Omit<GalleryPhoto, "id" | "createdAt">): void => {
  const photos = getPhotos();
  const newPhoto: GalleryPhoto = {
    ...photo,
    id: Date.now(),
    createdAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  };
  savePhotos([newPhoto, ...photos]);
};

// Delete photo
export const deletePhoto = (id: number): void => {
  const photos = getPhotos();
  savePhotos(photos.filter(p => p.id !== id));
};

// Get featured photos (for home slideshow)
export const getFeaturedPhotos = (): GalleryPhoto[] => {
  return getPhotos().filter(p => p.featured).slice(0, 6);
};

// Default photos (shown before admin adds any)
const defaultPhotos: GalleryPhoto[] = [
  {
    id: 1,
    title: "State Championship 2026",
    description: "Our team celebrating gold at Maharashtra State Rowing Championship.",
    category: "Championship",
    image: "/images/hero-bg.jpg",
    featured: true,
    createdAt: "June 15, 2026",
  },
  {
    id: 2,
    title: "Annual Regatta 2026",
    description: "12 colleges participated in our Annual Rowing Regatta on Pune waters.",
    category: "Events",
    image: "/images/hero-bg.jpg",
    featured: true,
    createdAt: "May 10, 2026",
  },
  {
    id: 3,
    title: "Training Session",
    description: "Early morning training session with our dedicated athletes.",
    category: "Training",
    image: "/images/hero-bg.jpg",
    featured: true,
    createdAt: "April 22, 2026",
  },
  {
    id: 4,
    title: "Group Photo 2026",
    description: "Annual group photo of all MIT-ADT Boat Club members.",
    category: "Team",
    image: "/images/hero-bg.jpg",
    featured: true,
    createdAt: "March 18, 2026",
  },
];