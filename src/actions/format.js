export const dateFormat = (timestamps) => {
    const created_date = new Date(timestamps);

    const now = new Date(Date.now());
    
    const yearsAgo = now.getFullYear() - created_date.getFullYear();
    const monthsAgo = now.getMonth() - created_date.getMonth();
    const daysAgo = now.getDate() - created_date.getDate();
    const hoursAgo = now.getHours() - created_date.getHours();
    const minsAgo = now.getMinutes() - created_date.getMinutes();

    if(yearsAgo > 0) {
        return `${yearsAgo} năm trước`;
    } else if(monthsAgo > 0) {
        return `${monthsAgo} tháng trước`;
    } else if(daysAgo > 0) {
        return `${daysAgo} ngày trước`;
    } else if(hoursAgo > 0) {
        return `${hoursAgo} giờ trước`;
    } else if(minsAgo > 0) {
        return `${minsAgo} phút trước`;
    } else {
        return 'Vừa xong';
    }
}