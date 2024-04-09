export interface Books {
  ageFrom: number;
  ageTo: number;
  authorName: string;
  bookTitle: string;
  category: string;
  description: string;
  id?: string;
  imageURL: string;
  createdAt: number;
  ownerId?: string;
  likes?: number;
  username?: string;
}
 