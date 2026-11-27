import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "@/app/components/StoryblokComponents/Clutch/Clutch.module.css";
import Image from "next/image";
export default function Clutch({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} id="clutch">
            <div className="container">
                <div className={styles.clutch_section}>

                    <h2>{blok.title}</h2>
                    <div className={styles.logos_wrp}>
                        {blok.logos.map((logo: any, index: number) => (
                            <div className={styles.service_card} key={index}>
                                <Image src={logo.filename} alt={logo.alt || "Webrarium on Clutch"} width={250} height={250} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
