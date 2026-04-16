import { axiosInstance } from '../config/axiosConfig';

export const normalizeInkspireBook = (book) => ({
  id: book.id,
  title: book.title || '',
  subtitle: book.subtitle || '',
  quote: book.quote || '',
  pdfUrl: book.pdf_url || '',
  coverImageUrl: book.cover_image_url || '',
  order: Number(book.order || 0),
  isActive: book.is_active !== false,
  createdAt: book.created_at,
  updatedAt: book.updated_at,
});

export const sortInkspireBooks = (books) => [...books].sort((left, right) => {
  if (left.isActive !== right.isActive) {
    return left.isActive ? -1 : 1;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.title.localeCompare(right.title);
});

export const fetchInkspireBooks = async () => {
  const response = await axiosInstance.get('/inkspire-books/');
  return sortInkspireBooks((response.data || []).map(normalizeInkspireBook));
};