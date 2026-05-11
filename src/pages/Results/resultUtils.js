// Normalize legacy type values to current enum values
const normalizeType = (type) => {
    switch (type) {
        case 'result': return 'results';
        case 'id_card': return 'id_card'; // excluded from public results page
        case 'championship':
        case 'records':
        case 'results':
            return type;
        default:
            return 'results';
    }
};

// Normalize legacy category values
const normalizeCategory = (category) => {
    switch (category) {
        case 'national': return 'nationals';
        case 'international': return 'internationals';
        case 'district':
        case 'state':
        case 'nationals':
        case 'internationals':
            return category;
        default:
            return category;
    }
};

const getResultType = (result) => normalizeType(result.type || result.result_type || 'results');

const getResultImages = (result) => {
    const images = Array.isArray(result.images) ? result.images.filter(Boolean) : [];
    const primaryImage = result.thumbnail_url || result.image_url || images[0] || '';

    if (primaryImage && !images.includes(primaryImage)) {
        return [primaryImage, ...images];
    }

    return images.length > 0 ? images : (primaryImage ? [primaryImage] : []);
};

const normalizeResult = (result) => {
    const images = getResultImages(result);

    return {
        ...result,
        type: getResultType(result),
        category: normalizeCategory(result.category || ''),
        images,
        primaryImage: images[0] || '',
    };
};

const formatResultLabel = (value) => value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export {
    formatResultLabel,
    getResultImages,
    getResultType,
    normalizeResult,
};