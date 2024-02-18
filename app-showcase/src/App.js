import { Download, Features, SectionWrapper } from "./components";
import assets from "./assets";
import styles from "./styles/Global";

const App = () => {
  return (
    <>
      <SectionWrapper
        title="Unleash Your Imagination with Flix AI 🚀"
        showBtn
        showQR
        mockupImg={assets.homeCards}
        banner="banner"
      />
      <SectionWrapper
        title="Key Features"
        description="Explore the forefront of creative expression with our advanced AI image generation platform. Crafted using Fooocus API and Replicate technology, our app seamlessly integrates the stability of Stable Diffusion and the simplicity of Midjourney's designs. Enjoy a hassle-free creative process with a user-friendly interface and Clerk authentication for added security.
        Choose from three presets - original, realistic, or anime - and dive into advanced settings like aspect ratio and image quantity, allowing you to tailor your creations effortlessly. Our vibrant community provides a space to share, download, and discover diverse AI-generated art.
        Behind the scenes, our app leverages Node.js Express for a robust backend, MongoDB Atlas for secure data storage, and Expo SDK features for a responsive frontend. Experience the next level of artistic exploration where innovation and imagination converge. Unleash your creativity with our powerful AI image generation app."
        mockupImg={assets.homeCards}
        reverse
      />
      <Features />
      <Download />

      <div className="px-4 py-2 justify-center items-center bg-primary flex-col text-center banner04">
        <p className={`${styles.pText} ${styles.whiteText}`}>
          <span class="bold text-sm">
            © {new Date().getFullYear()} Flix AI. All Rights Reserved.
          </span>
        </p>
      </div>
    </>
  );
};

export default App;
