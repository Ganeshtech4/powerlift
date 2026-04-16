const getResultType = (result) => result.type || result.result_type || 'result';

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