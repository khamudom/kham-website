import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ArrowRight
          style={{
            color: "var(--color-text-secondary)",
            transform: "rotate(180deg)",
            marginRight: 8,
          }}
          size={22}
        />
        <Link
          href="/"
          style={{
            color: "var(--color-text-secondary)",
            fontWeight: 600,
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Kham Udom
        </Link>
      </Box>
      <Typography variant="h1" sx={{ fontSize: "3rem", lineHeight: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" mb={8}>
          {description}
        </Typography>
      )}
    </>
  );
};
