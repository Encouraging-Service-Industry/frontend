export type Story = {
  id: number;
  name: string;
  title: string;
  content: string;
  type: "consumer" | "provider"; // New: type of user who posted
  avatar: string; // New: avatar image URL
  serviceCategory?: string; // New: optional service category for filtering
  timestamp: number; // New: for sorting by time
  image?: string; // New: optional image for the story
  badge?: string; // New: optional badge like 'First-Timer'
  likes?: number; // New: for future engagement
  comments?: number; // New: for future engagement
};
