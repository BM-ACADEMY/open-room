import React, { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories, galleryImages } from "./galleryData";

// Helper for responsive items per page
const getItemsPerPage = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;
  if (width < 768) return 6;
  if (width < 1024) return 9;
  return 12;
};

const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Sub-Component: GalleryTabs
const GalleryTabs = ({ categories, active, onChange }) => {
  return (
    <div className="w-full flex justify-center mb-12 md:mb-16">
      <div
        role="tablist"
        aria-label="Gallery categories"
        className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar px-4 py-1 max-w-full"
      >
        {categories.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`gallery-panel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`relative shrink-0 px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4041]/50 ${
                isActive
                  ? "text-white"
                  : "text-black/60 bg-white/50 backdrop-blur-md border border-black/5 hover:text-black hover:border-black/10"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff4041] to-[#ff6b57]"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Sub-Component: GalleryCard
const GalleryCard = ({ item, onOpen }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative aspect-[4/5] rounded-[20px] overflow-hidden bg-white border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.16)] transition-shadow duration-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4041]/60"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title} in full view`}
      onKeyDown={handleKeyDown}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover brightness-95 transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:brightness-100"
      />

      {/* Overlay fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>

    </motion.div>
  );
};

// Sub-Component: GalleryGrid
const GalleryGrid = ({ pageKey, images, onOpenImage }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8"
      >
        {images.map((item, index) => (
          <GalleryCard key={item.id} item={item} onOpen={() => onOpenImage(index)} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// Sub-Component: GalleryPagination
const GalleryPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-2 md:gap-3 mt-14 md:mt-20 flex-wrap"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="px-4 md:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-black/10 text-black/70 transition-all duration-300 hover:border-[#ff4041] hover:text-[#ff4041] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-black/70"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full text-sm font-bold transition-all duration-300 ${
            page === currentPage
              ? "text-white bg-gradient-to-r from-[#ff4041] to-[#ff6b57]"
              : "text-black/60 bg-white/50 backdrop-blur-md border border-black/5 hover:border-black/10 hover:text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="px-4 md:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-black/10 text-black/70 transition-all duration-300 hover:border-[#ff4041] hover:text-[#ff4041] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-black/70"
      >
        Next
      </button>
    </motion.div>
  );
};

// Sub-Component: GalleryLightbox
const GalleryLightbox = ({ images, activeIndex, onClose, onNext, onPrev }) => {
  const item = images[activeIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!item) return undefined;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    if (window.lenis) {
      window.lenis.stop();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [item, handleKeyDown]);

  const lightboxContent = (
    <AnimatePresence>
      {item && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:rotate-90 transition-all duration-300 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next image"
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] object-contain"
            />
            <div className="mt-5 flex items-center gap-4 text-white/80">
              <span className="text-xs md:text-sm font-semibold tracking-wide">{item.title}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-xs md:text-sm text-white/50">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(lightboxContent, document.body)
    : null;
};

// Main Component: GallerySection
const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const itemsPerPage = useItemsPerPage();

  const filteredImages = useMemo(
    () => galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / itemsPerPage));

  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredImages.slice(start, start + itemsPerPage);
  }, [filteredImages, currentPage, itemsPerPage]);

  // Filter changes always jump back to page 1.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Keep the current page valid if itemsPerPage shrinks (e.g. resize to mobile).
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const handlePageChange = useCallback(
    (page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages)),
    [totalPages]
  );

  const openLightbox = (indexInPage) => {
    const openedItem = paginatedImages[indexInPage];
    const globalIndex = filteredImages.findIndex((img) => img.id === openedItem.id);
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = () => setLightboxIndex(-1);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filteredImages.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);

  return (
    <section
      id="gallery"
      className="bg-[#fbf9e3] py-24 md:py-40 font-sans text-black border-t border-black/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#ff4041]" />
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">Our Work</span>
            <div className="w-12 h-[1px] bg-[#ff4041]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif leading-[1.1] tracking-tight text-black mb-8"
          >
            Moments That Define <br />
            <span className="italic font-light text-[#ff4041]">Our Journey.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-black/70 text-lg md:text-2xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            Explore our architecture projects, educational initiatives, and studio moments through our visual
            gallery.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GalleryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Grid / Empty state */}
        {paginatedImages.length > 0 ? (
          <GalleryGrid
            pageKey={`${activeCategory}-${currentPage}`}
            images={paginatedImages}
            onOpenImage={openLightbox}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-black mb-2">No Images Available</h3>
            <p className="text-black/50 text-sm max-w-xs">
              Check back soon — new photos from this category are on the way.
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        <GalleryPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        images={filteredImages}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default GallerySection;
