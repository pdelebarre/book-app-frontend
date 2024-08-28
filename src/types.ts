
export interface Book {
  id?: number;
  coverImage?: string;
  title: string;
  author: string;
  openLibraryId?: string;
  publicationDate?: string;
  language?: string;
  pageCount?: number;
  isbn?: string;
}