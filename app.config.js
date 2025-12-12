import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,

    name: "wtf-client",
    slug: "wtf-client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "wtfclient",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.wtfclient",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },

    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.wtfclient"
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },

    plugins: [
      "expo-router",

      [
        "@rnmapbox/maps",
        {
          RNMAPBOX_MAPS_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN
        }
      ],

      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ]
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },

    extra: {
      MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
      router: {},
      eas: {
        projectId: "76f8ec26-a581-4da0-9391-12355fa1ce20"
      }
    }
  }
});
