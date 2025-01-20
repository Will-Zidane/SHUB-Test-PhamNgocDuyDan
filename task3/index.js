const axios = require('axios');

async function calculateArrayRanges(inputUrl, outputUrl) {
    try {
        // Lấy input data
        const response = await axios.get(inputUrl);
        const { token, data, query } = response.data;

        // Tính lại kết quả cho mỗi query
        const results = query.map(q => {
            const { type, range } = q;
            const [l, r] = range;   
            
            // Kiểm tra range hợp lệ
            if (l < 0 || r >= data.length || l > r) {
                throw new Error('Invalid range indices');
            }

            // Lấy subarray từ range
            const subArray = data.slice(l, r + 1);

            // Tính tổng hoặc tổng lẻ chẵn
            if (type === "1") {
                return subArray.reduce((sum, num) => sum + num, 0);
            }
            // Nếu type = 2, tính tổng các số chẵn trừ tổng các số lẻ
            else if (type === "2") {
                return subArray.reduce((sum, num, index) => {
                    return sum + (index % 2 === 0 ? num : -num);
                }, 0);
            }
            
            throw new Error('Invalid query type');
        });

        // Gửi yêu cầu POST kết quả
        await axios.post(outputUrl, results, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Trả về kết quả
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