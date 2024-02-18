import React from "react";

import styles from "../styles/Global";
import assets from "../assets";
import Button from "./Button";
import Qrcode from "./Qrcode";

const SectionWrapper = ({
  title,
  description,
  showBtn,
  showQR,
  mockupImg,
  banner,
  reverse,
}) => {
  return (
    <div
      className={`min-h-screen ${styles.section} 
      ${reverse ? styles.bgWhite : styles.bgPrimary} 
      ${banner}`}
    >
      <div
        className={`flex items-center 
        ${reverse ? styles.boxReverseClass : styles.boxClass} 
        w-11/12 sm:w-full minmd:w-3/4`}
      >
        <div className={`flex-1 ${styles.flexCenter}`}>
          <img
            src={mockupImg}
            alt="mockup"
            className={`
           ${reverse ? " fadeLeftMini" : " fadeRightMini"}
          ${styles.sectionImg}`}
          />
        </div>
        <div
          className={`${styles.descDiv} 
          ${reverse ? " fadeRightMini" : " fadeLeftMini"}
          ${reverse ? styles.textRight : styles.textLeft}
        `}
        >
          <h1
            className={`
          ${reverse ? styles.blackText : styles.whiteText}
          ${styles.h1Text}`}
          >
            {title}
          </h1>
          <p
            className={`
          ${reverse ? styles.blackText : styles.whiteText}
          ${styles.descriptionText}`}
          >
            {description}
          </p>
          <div className="flex-col space-y-10">
            {showQR && (
              <Qrcode assetUrl={assets.homeQR} alt="qr-code" width={300} />
            )}
            {showBtn && (
              <Button
                assetUrl={assets.expo}
                link="https://expo.dev/@rishabh1s/flixai"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;
