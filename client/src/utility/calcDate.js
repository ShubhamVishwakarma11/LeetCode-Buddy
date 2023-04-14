export const calcDate = (timestamp) => {
    const date1 = new Date(parseInt(timestamp)*1000);
    const date2 = new Date();

    const diffTime = Math.abs(date2 - date1);
    const diffMinutes = Math.ceil(diffTime/ (1000*60) );
    const diffHours = Math.ceil(diffTime/ (1000*60*60) );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays !== 0) return `${diffDays} days ago`;
    if (diffHours !== 0) return `${diffHours} hours ago`;
    if (diffMinutes !== 0) return `${diffMinutes} hours ago`;
    return `few seconds ago`;
}