import { redirect } from '@sveltejs/kit';

export function load() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed

    throw redirect(307, `/${year}/${month}`);
}