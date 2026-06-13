"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import styles from "./ServiceFAQ.module.css";

function FAQItem({ item, index }: { item: any; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faq_item} ${open ? styles.open : ""}`}>
      <button
        className={styles.faq_question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className={styles.faq_icon}>{open ? "−" : "+"}</span>
      </button>
      <div className={styles.faq_answer}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function ServiceFAQ({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className={styles.faq_section}>
      <div className="container">
        <h2 className={styles.faq_title}>{blok.title}</h2>
        <div className={styles.faq_list}>
          {(blok.items || []).map((item: any, i: number) => (
            <FAQItem key={item._uid || i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
