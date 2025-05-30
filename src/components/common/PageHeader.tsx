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
