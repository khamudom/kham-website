import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Image } from "../data/types";
import { getImagePath } from "../utils/imageLoader";
import styles from "../styles/ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const initialModalOpen = useRef<boolean>(false);

  const openModal = (index: number) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
    initialModalOpen.current = true;
  };

  const closeModal = () => {
    setSelectedIndex(-1);
    document.body.style.overflow = "auto";
    lastFocusedElement.current?.focus();
    initialModalOpen.current = false;
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === -1) return;

    switch (e.key) {
      case "ArrowLeft":
        setSelectedIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
        break;
      case "ArrowRight":
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
        break;
      case "Escape":
        closeModal();
        break;
    }
  };

  // Focus trap for modal
  useEffect(() => {
    if (selectedIndex !== -1) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements) {
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey) {
              if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
              }
            } else {
              if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
              }
            }
          }
        };

        window.addEventListener("keydown", handleTabKey);

        // Only focus the close button when first opening the modal
        if (initialModalOpen.current) {
          closeButtonRef.current?.focus();
          initialModalOpen.current = false;
        }

        return () => {
          window.removeEventListener("keydown", handleTabKey);
        };
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.gallery} role="region" aria-label="Project gallery">
      <div className={styles.grid} role="list">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={styles.imageWrapper}
            role="listitem"
            onClick={() => openModal(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(index);
              }
            }}
            tabIndex={0}
            aria-label={`View ${image.alt}`}
          >
            <img
              src={getImagePath(image.url, "thumbnail")}
              alt={image.alt}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = getImagePath(
                  "/images/placeholder.jpg",
                  "thumbnail"
                );
              }}
            />
            {image.caption && (
              <div className={styles.caption}>
                <p>{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== -1 && (
        <div
          ref={modalRef}
          className={styles.modal}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery modal"
        >
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <X size={24} aria-hidden="true" />
          </button>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={showPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} aria-hidden="true" />
          </button>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={showNext}
            aria-label="Next image"
          >
            <ChevronRight size={40} aria-hidden="true" />
          </button>

          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImagePath(images[selectedIndex].url, "large")}
              alt={images[selectedIndex].alt}
              className={styles.modalImage}
              onError={(e) => {
                e.currentTarget.src = getImagePath(
                  "/images/placeholder.jpg",
                  "large"
                );
              }}
            />
            {images[selectedIndex].caption && (
              <div className={styles.modalCaption}>
                <p>{images[selectedIndex].caption}</p>
              </div>
            )}
          </div>

          <div className={styles.counter} aria-live="polite">
            Image {selectedIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
