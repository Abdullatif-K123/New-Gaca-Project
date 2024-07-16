import styles from "./faq.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const FAQsBottom = ({ phone, email, fontSizeGeneral, rtl }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <p
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${28 + fontSizeGeneral}px`,
          }}
        >
          {t("feedback-question")}?
        </p>
        <h1
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${32 + fontSizeGeneral}px`,
          }}
        >
          {t("faq-title")}
        </h1>
        <h4
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${18 + fontSizeGeneral}px`,
          }}
        >
          {t("faq-desc")}
        </h4>
      </div>
      <div className={styles.section2}>
        <Link href={`tel:+${phone}`} className={styles.phoneEmail}>
          <Image
            src="/assets/imges/faq-phone.png"
            width={35}
            height={35}
            alt="phone"
          />
          <h1>{phone}</h1>
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${16 + fontSizeGeneral}px`,
            }}
          >
            {t("faq-phone")}
          </p>
        </Link>
        <Link
          href={`mailto:${email}?subject=Inquire%20About%20something`}
          className={styles.phoneEmail}
        >
          <Image
            src="/assets/imges/faq-email.png"
            width={35}
            height={35}
            alt="phone"
          />
          <h1>{email}</h1>
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${16 + fontSizeGeneral}px`,
            }}
          >
            {" "}
            {t("faq-email")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FAQsBottom;
