import { error } from '@sveltejs/kit';

export function load({ params }) {
    const year = parseInt(params.year);
    const month = parseInt(params.month);
    
    // Validate the params
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        throw error(404, 'Invalid date');
    }

    return {
        year,
        month
    };
}