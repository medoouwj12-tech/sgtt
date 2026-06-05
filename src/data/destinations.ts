export interface Destination {
  id: string;
  category: "HISTORICAL" | "CULTURAL" | "NATURAL";
  imageUrl: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "pyramids",
    category: "HISTORICAL",
    imageUrl: "/destinations/pyramids.png",
  },
  {
    id: "nile",
    category: "NATURAL",
    imageUrl: "/destinations/nile.png",
  },
  {
    id: "luxor",
    category: "HISTORICAL",
    imageUrl: "/destinations/luxor.png",
  },
  {
    id: "museum",
    category: "CULTURAL",
    imageUrl: "/destinations/museum.png",
  },
  {
    id: "khan",
    category: "CULTURAL",
    imageUrl: "/destinations/khan.png",
  },
  {
    id: "alexandria",
    category: "CULTURAL",
    imageUrl: "/destinations/alexandria.png",
  },
];
