"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Image as GalleryImage } from "@/types/portfolio";
import styles from "./styles/ImageGallery.module.css";

interface ImageGalleryProps {
  images: GalleryImage[];
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

  useEffect(() => {
    if (initialModalOpen.current) {
      closeButtonRef.current?.focus();
    }
  }, [selectedIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

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
            <Image
              src={image.url}
              alt={image.alt}
              width={400}
              height={300}
              className={styles.thumbnail}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
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
            <Image
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt}
              width={1200}
              height={800}
              className={styles.modalImage}
              priority
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
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
