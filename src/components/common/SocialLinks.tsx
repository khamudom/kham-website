import { IconButton, Stack } from "@mui/material";
import { LucideIcon } from "lucide-react";
import styles from "@/styles/pages/Home.module.css";

interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  style?: React.CSSProperties;
}

export const SocialLinks = ({ links, className, style }: SocialLinksProps) => {
  return (
    <Stack direction="row" spacing={1} className={className} style={style}>
      {links.map(({ href, icon: Icon, label }) => (
        <IconButton
          key={href}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={{
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <Icon className={styles.socialIcon} />
        </IconButton>
      ))}
    </Stack>
  );
};
