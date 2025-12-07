declare module 'expo-env' {
  export const env: {
    MAPBOX_PUBLIC_TOKEN: string;
    [key: string]: string | undefined;
  };
}
