# Flix AI - Image Generation

Explore the realm of creative possibilities with Flixai, a cutting-edge AI image generation application built upon the Fooocus API using Replicate.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [License](#license)

## Features:

### 1. Intuitive UI and Secure Authentication

**User-Friendly Interface**: Navigating Flixai is effortless with our sleek and intuitive user interface using Tamagui for styling, ensuring a seamless and enjoyable experience.

**Clerk Authentication**: Rest easy knowing that our secure clerk authentication system prioritizes the confidentiality and security of your generated images and data.

### 2. Powerful Image Generation

**Prompt-Based Creativity**: Generate images effortlessly by inputting prompts. Choose from three presets - original, realistic, or anime-style - to suit your preferences.

**Fine-Tune with Advanced Settings**: Customize your creations using advanced settings. Adjust aspect ratios, select the number of images (from 1 to 8), and toggle various advanced options to tailor your art.

### 3. Community Interaction

**Download and Share**: Download your masterpieces directly to your device and share them with friends and family or on social media to showcase your artistic prowess.

**Community Engagement**: Join our vibrant community within FlixAi. Share your creations, discover inspiring works from others, and engage in discussions about the fascinating world of AI-generated art.

## Tech Stack:

- **Frontend**: Developed using the latest Expo SDK features, ensuring a seamless and responsive user interface.

- **Styling**: Tamagui.dev enhances the visual appeal, providing a cohesive and aesthetically pleasing design.

- **Backend**: Powered by Node.js Express for a robust and scalable infrastructure.

- **Authentication**: Clerk is employed for secure authentication, ensuring a reliable and protected user experience.

- **Fooocus API Execution**: Replicate technology is utilized for running the Fooocus API on powerful GPUs, enabling efficient and high-performance image generation.

- **Database**: MongoDB Atlas is the backend database, securely storing post data for efficiency and reliability.

- **Image Storage**: Cloudinary is integrated for permanent storage of image files, offering a scalable and reliable solution.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/rishabh1S/flixai.git
cd flixai
cd expo-app
```

2. Create a .env file in the client directory and set the following environment variables:

`EXPO_PUBLIC_SERVER_URL`
`EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` 3. Create a .env file in the server directory and set the following environment variables:

`REPLICATE_API_TOKEN`
`MONGODB_URL`
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

3. Install dependencies inside client.

```bash
yarn
```

3. Install dependencies inside server.

```bash
npm install
```

4. Create account / Login in these to get the environment variables.

- [Replicate](https://replicate.com/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDb Atlast](https://www.mongodb.com/)

4. Start the server.

```bash
npm start
```

5. Start the app.

```base
npx expo start
```

## Screenshots

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273883/FlixAi/Screenshot_2024-02-18-16-38-13-886_com.rishabh1s.flixai_xwkqhh.jpg)

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273884/FlixAi/Screenshot_2024-02-18-16-41-24-774_com.rishabh1s.flixai_blshqj.jpg)

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273883/FlixAi/Screenshot_2024-02-18-16-51-12-389_host.exp.exponent_dyxguo.jpg)

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273883/FlixAi/Screenshot_2024-02-18-16-41-44-013_com.rishabh1s.flixai_r0hrzi.jpg)

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273883/FlixAi/Screenshot_2024-02-18-02-10-35-555_com.rishabh1s.flixai_qinjy1.jpg)

![App Screenshot](https://res.cloudinary.com/dnp36kqdc/image/upload/v1708273884/FlixAi/Screenshot_2024-02-18-16-45-45-037_com.rishabh1s.flixai_lzyedd.jpg)

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/).
