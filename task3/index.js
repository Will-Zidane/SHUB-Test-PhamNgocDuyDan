const axios = require('axios');

async function calculateArrayRanges(inputUrl, outputUrl) {
    try {
        // Lấy input data
        const response = await axios.get(inputUrl);

        // Kiểm tra phản hồi từ API
        if (!response.data || !response.data.token || !response.data.data || !response.data.query) {
            throw new Error('Invalid input data from API');
        }

        const { token, data, query } = response.data;

        // Tính lại kết quả cho mỗi query
        const results = query.map((q, index) => {
            const { type, range } = q;
            const [l, r] = range;

            // Kiểm tra range hợp lệ
            if (l < 0 || r >= data.length || l > r) {
                console.warn(`Skipping invalid range at query index ${index}:`, range);
                return null; // Bỏ qua query không hợp lệ
            }

            // Lấy subarray từ range
            const subArray = data.slice(l, r + 1);

            // Tính tổng hoặc tổng lẻ chẵn
            if (type === "1") {
                return subArray.reduce((sum, num) => sum + num, 0);
            } else if (type === "2") {
                return subArray.reduce((sum, num, idx) => {
                    return sum + (idx % 2 === 0 ? num : -num);
                }, 0);
            } else {
                console.warn(`Skipping invalid query type at index ${index}:`, type);
                return null; // Bỏ qua query không hợp lệ
            }
        }).filter(result => result !== null); // Loại bỏ kết quả null

        // Gửi yêu cầu POST kết quả
        const postResponse = await axios.post(outputUrl, results, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (postResponse.status >= 200 && postResponse.status < 300) {
            console.log('Results posted successfully:', results);
        } else {
            console.error('Failed to post results, status:', postResponse.status);
        }

        return results;

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Example usage:
const inputUrl = 'https://share.shub.edu.vn/api/intern-test/input';
const outputUrl = 'https://share.shub.edu.vn/api/intern-test/output';

calculateArrayRanges(inputUrl, outputUrl)
    .then(results => console.log('Results:', results))
    .catch(error => console.error('Error:', error));
