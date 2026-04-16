import { axiosInstance } from '../config/axiosConfig';

const LEVEL_ORDER = {
  International: 0,
  National: 1,
  State: 2,
  District: 3,
};

export const normalizeReferee = (referee) => ({
  id: referee.id,
  name: referee.name || '',
  level: referee.level || '',
  photoUrl: referee.photo_url || '',
  phone: referee.phone || '',
  email: referee.email || '',
  certificationYear: referee.certification_year || '',
  description: referee.description || '',
  order: Number(referee.order || 0),
  isActive: referee.is_active !== false,
  createdAt: referee.created_at,
  updatedAt: referee.updated_at,
});

export const sortReferees = (referees) => [...referees].sort((left, right) => {
  if (left.isActive !== right.isActive) {
    return left.isActive ? -1 : 1;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  const leftLevel = LEVEL_ORDER[left.level] ?? 99;
  const rightLevel = LEVEL_ORDER[right.level] ?? 99;

  if (leftLevel !== rightLevel) {
    return leftLevel - rightLevel;
  }

  return left.name.localeCompare(right.name);
});

export const fetchReferees = async () => {
  const response = await axiosInstance.get('/referees/');
  return sortReferees((response.data || []).map(normalizeReferee)).filter((referee) => referee.isActive);
};

export const fetchReferee = async (refereeId) => {
  const response = await axiosInstance.get(`/referees/${refereeId}`);
  return normalizeReferee(response.data);
};