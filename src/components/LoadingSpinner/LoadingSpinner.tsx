import React from "react";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: styles.spinnerSmall,
    medium: styles.spinnerMedium,
    large: styles.spinnerLarge,
  };

  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <div
        className={`${styles.spinner} ${sizeClasses[size]}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};
