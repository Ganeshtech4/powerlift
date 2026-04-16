import { axiosInstance } from '../config/axiosConfig';

const normalizeAchievements = (achievements) => {
  if (!achievements) {
    return [];
  }

  if (Array.isArray(achievements)) {
    return achievements.filter(Boolean);
  }

  if (typeof achievements === 'string') {
    return achievements
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeCertificates = (certificateUrls) => {
  if (!certificateUrls) {
    return [];
  }

  if (Array.isArray(certificateUrls)) {
    return certificateUrls.filter(Boolean);
  }

  if (typeof certificateUrls === 'string') {
    return certificateUrls
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const normalizeTeamMember = (member) => ({
  id: member.id,
  name: member.name || '',
  role: member.role || '',
  photoUrl: member.photo_url || '',
  certificateUrls: normalizeCertificates(member.certificate_urls),
  phone: member.phone || '',
  email: member.email || '',
  description: member.description || '',
  highlight: member.highlight || '',
  achievements: normalizeAchievements(member.achievements),
  leadership: member.leadership || '',
  philosophy: member.philosophy || '',
  isFeatured: Boolean(member.is_featured),
  isActive: member.is_active !== false,
  order: Number(member.order || 0),
  createdAt: member.created_at,
  updatedAt: member.updated_at,
});

export const sortTeamMembers = (members) => [...members].sort((left, right) => {
  if (left.isFeatured !== right.isFeatured) {
    return left.isFeatured ? -1 : 1;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.name.localeCompare(right.name);
});

export const fetchTeamMembers = async () => {
  const response = await axiosInstance.get('/committee-members/');
  return sortTeamMembers((response.data || []).map(normalizeTeamMember));
};

export const fetchTeamMember = async (memberId) => {
  const response = await axiosInstance.get(`/committee-members/${memberId}`);
  return normalizeTeamMember(response.data);
};