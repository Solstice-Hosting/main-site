export function splitSession(luuid) {
    if (!luuid) {
        return { id: null, uuid: null }; // Return null values if UUID is undefined or null
    }
    const sections = luuid.split('-');
    const id = sections.pop(); // Remove and store the last section
    const sessionToken = sections.join('-'); // Join the remaining sections
    return {
        id,
        sessionToken
    };
}