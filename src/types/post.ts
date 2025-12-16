export type Post = {
  _id: string;
  title: string;
  image: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
};
