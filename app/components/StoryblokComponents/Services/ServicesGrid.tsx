import { storyblokEditable, getStoryblokApi } from "@storyblok/react/rsc";
import Link from "next/link";
import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";
import styles from "@/app/components/StoryblokComponents/Services/Services.module.css";
import { useEffect, useState } from "react";
import arrow from "@/public/link-external.svg";
import { useParams } from "next/navigation";

export default function ServicesGrid({ blok }: { blok: any }) {
  const [resolvedBlok, setResolvedBlok] = useState(blok);
  const { locale } = useParams();

  useEffect(() => {
    const fetchResolvedData = async () => {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories/${blok.slug}`, {
        version: "published",
        resolve_relations: ["services_grid.services_list"],
        language: locale.toString() || "uk",
      });

      setResolvedBlok(data.story.content);
    };

    if (!blok.services_list) {
      fetchResolvedData();
    }
  }, [blok]);

  if (!resolvedBlok || !resolvedBlok.services_list) {
    return <div>Loading...</div>;
  }
  return (
    <section {...storyblokEditable(resolvedBlok)}>
      <div className="container">
        {resolvedBlok.title ? <h2>{resolvedBlok.title}</h2> : null}
        <div className={styles.service_grid}>
          {resolvedBlok.services_list.map((service: any) => (
            <ServiceCard blok={service} key={service.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ blok }: { blok: any }) {
  const serviceLink = `/${blok.full_slug}`;
  return (
    <Link href={serviceLink} className={styles.service_link}>
      <div className={styles.service_card}>
        <h3>{blok.content.title}</h3>
        <br />
        <div className={styles.divider}></div>
        <br />
        <div className={styles.description}>
          {render(blok.content.description)}
        </div>
        <Image
          src={arrow}
          width={25}
          height={25}
          alt="arrow"
          className={styles.arrow}
        />
      </div>
    </Link>
  );
}
