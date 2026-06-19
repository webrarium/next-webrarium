"use client";

import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-email";
import { storyblokEditable } from "@storyblok/react/rsc";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import styles from "./Contact.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

export type FormData = {
  name: string;
  email: string;
  message: string;
  honeypot: any;
};

const Contact = ({ blok }: { blok: any }) => {
  const [submitted, setSubmitted] = useState();
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit(data: FormData) {
    if (data.honeypot) {
      // honeypot field was filled in, likely a spam submission
      console.log("Spam submission detected!");
      return;
    }
    setSending(true);
    if (!executeRecaptcha) {
      console.error("Google reCaptcha not loaded");
      return;
    }

    const token = await executeRecaptcha("contact");

    const response = await axios({
      method: "POST",
      url: "/api/recaptcha",
      data: {
        token,
      },
      headers: {
        Accept: "app;ication/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    if (!response?.data?.success === true) {
      console.log(`score: ${response?.data?.score}`);
      return;
    }
    console.log(`score: ${response?.data?.score}`);
    try {
      const response = await sendEmail(data);
      setSubmitted(response === "Email sent" ? blok.success_message : "error");
      sendGAEvent("event", "cf_submit", { value: "contact_form_submit" });
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
      reset();
    }
  }
  return (
    <section {...storyblokEditable(blok)} id="contact">
      <div className="container">
        <h2 className={styles.form_title}>{blok.title}</h2>
        <p className={styles.form_subtitle}>{blok.description}</p>
        <div className={styles.form_wrp}>
          <div className={styles.form_left}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
              id="contact_form"
            >
              <input
                type="text"
                id="honeypot"
                style={{ display: "none" }}
                {...register("honeypot")}
              />
              <div className={styles.field}>
                <label htmlFor="name">{blok.name_label}</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">{blok.email_label}</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  autoComplete="email"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">{blok.message_label}</label>
                <textarea
                  rows={4}
                  {...register("message", { required: true })}
                  id="message"
                ></textarea>
              </div>
              <div className={styles.submit}>
                <button
                  className={styles.form_submit}
                  type="submit"
                  id="form_submit_btn"
                >
                  {sending ? blok.message_sending : blok.button_txt}
                </button>
                {submitted ? <small>{submitted}</small> : null}
              </div>
            </form>
          </div>
          <div className={styles.form_right}>
            <div className={styles.form_right_div}>
              <div>{blok.call_txt}</div>
              <a
                href={`tel:${blok.call_num}`}
                title="Call a mobile number"
                id="call_phone"
              >
                {blok.call_num}
              </a>
            </div>
            <div className={styles.form_right_div}>
              <div>{blok.mail_label}</div>
              <a
                href={`mailto:${blok.mail_address}`}
                title="Send email"
                id="send_email"
              >
                {blok.mail_address}
              </a>
            </div>
            <div className={styles.form_right_div}>
              <div>{blok.wa_label}</div>
              <Link
                href={blok.wa_link.url}
                className={styles.wa_btn}
                target="_blank"
                id="contact_wa_btn"
                title="WhatsApp Chat"
              >
                <svg
                  width="31"
                  height="32"
                  viewBox="0 0 31 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.79036 26.5971L8.33413 26.3267L3.60722 27.566L4.86909 22.9591L4.57192 22.4867C3.32165 20.4992 2.66178 18.2018 2.66269 15.8429C2.66529 8.95923 8.26743 3.35925 15.1559 3.35925C18.492 3.36064 21.6271 4.66098 23.985 7.0205C26.3428 9.38046 27.6405 12.517 27.6394 15.8531C27.6368 22.7368 22.0347 28.3377 15.1514 28.3377H15.1465C12.9052 28.3364 10.7074 27.7348 8.79036 26.5971ZM2.13154 23.3513L0 31.1345L7.96538 29.0461C10.1599 30.243 12.6307 30.8738 15.1453 30.8747H15.1517C23.4322 30.8747 30.1733 24.1356 30.1768 15.8543C30.1781 11.8408 28.6165 8.0669 25.78 5.22781C22.9432 2.38867 19.1708 0.824486 15.1517 0.822754C6.86913 0.822754 0.129411 7.56048 0.126206 15.8422C0.125123 18.4893 0.816782 21.0734 2.13154 23.3513ZM10.5519 8.91689C10.8194 8.92789 11.1154 8.9404 11.3967 9.56563C11.5887 9.99261 11.9115 10.7881 12.1691 11.4227C12.3593 11.8915 12.5139 12.2724 12.5538 12.3522C12.6476 12.54 12.7103 12.7593 12.585 13.0098C12.5662 13.0474 12.5488 13.0829 12.5322 13.1168C12.4383 13.3087 12.3692 13.4496 12.21 13.636C12.1473 13.7091 12.0825 13.7879 12.0177 13.8668C11.8884 14.0241 11.7591 14.1813 11.6467 14.2934C11.4585 14.4806 11.2629 14.6839 11.4818 15.0593C11.701 15.4352 12.4544 16.6641 13.5705 17.6592C14.7693 18.728 15.8108 19.1801 16.3398 19.4098C16.4437 19.4549 16.5279 19.4915 16.5896 19.5224C16.965 19.7102 17.1841 19.6789 17.403 19.428C17.6221 19.1776 18.3411 18.3322 18.5914 17.9568C18.8418 17.5809 19.0921 17.6434 19.4363 17.7686C19.7804 17.8939 21.6261 18.8022 22.0016 18.99C22.0746 19.0265 22.143 19.0594 22.2063 19.09C22.4685 19.2165 22.6457 19.302 22.7213 19.428C22.8151 19.5849 22.8151 20.3363 22.5022 21.2128C22.1894 22.0895 20.6565 22.9349 19.9682 22.9974C19.902 23.0034 19.8362 23.0112 19.7686 23.0191C19.1324 23.094 18.3296 23.1885 15.4631 22.0582C11.9371 20.6677 9.61189 17.2218 9.131 16.5092C9.09149 16.4506 9.06443 16.4105 9.05017 16.3915L9.04574 16.3856C8.84251 16.1139 7.51726 14.342 7.51726 12.5088C7.51726 10.7798 8.36712 9.87347 8.75811 9.45651C8.78481 9.42804 8.80937 9.40185 8.83137 9.37784C9.1753 9.00215 9.58202 8.90819 9.83244 8.90819C9.8469 8.90819 9.86136 8.90819 9.87581 8.90818C10.1114 8.90815 10.3456 8.90812 10.5519 8.91689Z"
                    fill="none"
                  />
                </svg>
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const recaptchaKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "NOT DEFINED";

// Lazy-load reCAPTCHA only when contact section scrolls into view
export default function ContactWithCaptcha({ blok }: { blok: any }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
          <Contact blok={blok} />
        </GoogleReCaptchaProvider>
      ) : (
        <Contact blok={blok} />
      )}
    </div>
  );
}
