import React from "react";

import assets from "../assets";
import styles from "../styles/Global";

const FeatureCard = ({ iconUrl, iconText }) => (
  <div className={styles.featureCard}>
    <img src={iconUrl} alt="icon" className={styles.featureImg} />
    <p className={styles.featureText}>{iconText}</p>
  </div>
);

const Features = () => {
  return (
    <div className={`${styles.section} ${styles.bgPrimary} banner03`}>
      <div className={`${styles.subSection} flex-col text-center`}>
        <div>
          <h1 className={`${styles.h1Text} ${styles.whiteText}`}>
            Technologies
          </h1>
          <p className={`${styles.pText} ${styles.whiteText}`}>
            FlixAi has been developed using latest version of cross-platform
            technology, React Native Expo.
          </p>
        </div>

        <div className={styles.flexWrap}>
          <FeatureCard iconUrl={assets.expo02} iconText="RN Expo" />
          <FeatureCard iconUrl={assets.typescript} iconText="TypeScript" />
          <FeatureCard iconUrl={assets.tamagui} iconText="Tamagui.dev" />
          <FeatureCard iconUrl={assets.nodejs} iconText="Node Js" />
          <FeatureCard iconUrl={assets.mongo} iconText="Mongo DB" />
        </div>
      </div>
    </div>
  );
};

export default Features;
