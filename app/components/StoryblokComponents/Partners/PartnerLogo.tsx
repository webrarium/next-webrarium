import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import styles from "./Partners.module.css";

export default function PartnerLogo({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className={styles.partner_logo_card}>
      {blok.logo_img?.filename && (
        <Image
          src={blok.logo_img.filename}
          alt={blok.logo_img.alt || ""}
          width={120}
          height={60}
          className={styles.partner_logo}
          style={{ objectFit: "contain" }}
        />
      )}
      <span>{blok.icon}</span>
    </div>
  );
}
