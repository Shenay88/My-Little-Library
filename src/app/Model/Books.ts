export interface Books {
  ageFrom: number;
  ageTo: number;
  authorName: string;
  bookTitle: string;
  category: string;
  description: string;
  imageURL: string;
  createdAt: number;
  ownerId: string,
  username: string,
  bookId?: string
  likesArr?: [],
  dislikesArr?: [],
}

 