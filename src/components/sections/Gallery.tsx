"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api";

type GalleryPhoto = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured: boolean;
};

// Default photos shown when backend is offline
const defaultPhotos: GalleryPhoto[] = [
  { _id: "d1", title: "State Championship 2026", description: "Our team celebrating gold at Maharashtra State Rowing Championship.", category: "Championship", image: "/images/hero-bg.jpg", featured: true },
  { _id: "d2", title: "Annual Regatta 2026", description: "12 colleges participated in our Annual Rowing Regatta on Pune waters.", category: "Events", image: "/images/hero-bg.jpg", featured: true },
  { _id: "d3", title: "Training Session", description: "Early morning training session with our dedicated athletes.", category: "Training", image: "/images/hero-bg.jpg", featured: true },
  { _id: "d4", title: "Group Photo 2026", description: "Annual group photo of all MIT-ADT Boat Club members.", category: "Team", image: "/images/hero-bg.jpg", featured: true },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    fetch(`${API}/gallery/featured`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: GalleryPhoto[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        } else {
          // If no featured photos, try getting all photos
          return fetch(`${API}/gallery`)
            .then((res) => res.json())
            .then((allData: GalleryPhoto[]) => {
              if (Array.isArray(allData) && allData.length > 0) {
                setPhotos(allData.slice(0, 6));
              } else {
                setPhotos(defaultPhotos);
              }
            });
        }
      })
      .catch(() => setPhotos(defaultPhotos));
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" style={{ background: "#0F2744", padding: "25px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "Inter, sans-serif" }}
          >
            Our Moments
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "80px", color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1 }}
          >
            Photo <span style={{ color: "#ffffff" }}>Gallery</span>
          </motion.h2>
        </div>

        {/* Slideshow */}
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "450px", marginBottom: "32px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img src={photos[current].image} alt={photos[current].title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/hero-bg.jpg"; }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "40px 35px 30px" }}>
                <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "36px", color: "#ffffff", letterSpacing: "0.04em", marginBottom: "8px" }}>
                  {photos[current].title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  {photos[current].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={() => setCurrent((prev) => (prev - 1 + photos.length) % photos.length)}
            style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", width: "48px", height: "48px", borderRadius: "50%", fontSize: "20px", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ‹
          </button>
          <button onClick={() => setCurrent((prev) => (prev + 1) % photos.length)}
            style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", width: "48px", height: "48px", borderRadius: "50%", fontSize: "20px", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ›
          </button>
          <div style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, zIndex: 10 }}>
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* Dot Indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "48px" }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? "32px" : "10px", height: "10px", borderRadius: "5px", background: i === current ? "#ffffff" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>

        {/* Thumbnail Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "48px" }}>
          {photos.map((photo, i) => (
            <div key={i} onClick={() => setCurrent(i)}
              style={{ height: "100px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", border: i === current ? "3px solid #ffffff" : "3px solid transparent", transition: "border 0.3s ease", opacity: i === current ? 1 : 0.6 }}>
              <img src={photo.image} alt={photo.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/hero-bg.jpg"; }} />
            </div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div style={{ textAlign: "center" }}>
          <a href="/gallery"
            style={{ display: "inline-block", background: "#ffffff", color: "#0F2744", padding: "14px 38px", borderRadius: "8px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.03em" }}>
            View Full Gallery →
          </a>
        </div>

      </div>
    </section>
  );
}