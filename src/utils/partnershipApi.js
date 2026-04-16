import { axiosInstance } from '../config/axiosConfig';

const normalizeHighlights = (highlights) => {
  if (!highlights) {
    return [];
  }

  if (Array.isArray(highlights)) {
    return highlights.filter(Boolean);
  }

  if (typeof highlights === 'string') {
    return highlights
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const normalizePartnership = (partnership) => ({
  id: partnership.id,
  title: partnership.gym_name || '',
  ownerName: partnership.owner_name || '',
  location: partnership.location || '',
  phone: partnership.phone || '',
  email: partnership.email || '',
  logoUrl: partnership.logo_url || '',
  description: partnership.description || '',
  highlights: normalizeHighlights(partnership.highlights),
  order: Number(partnership.order || 0),
  isActive: partnership.is_active !== false,
  createdAt: partnership.created_at,
  updatedAt: partnership.updated_at,
});

export const sortPartnerships = (partnerships) => [...partnerships].sort((left, right) => {
  if (left.isActive !== right.isActive) {
    return left.isActive ? -1 : 1;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.title.localeCompare(right.title);
});

export const fetchPartnerships = async () => {
  const response = await axiosInstance.get('/partnerships/');
  return sortPartnerships((response.data || []).map(normalizePartnership)).filter((item) => item.isActive);
};