const axios = require('axios');

async function calculateArrayRanges(inputUrl, outputUrl) {
    try {
        // Lấy và validate input data
        const { data: responseData } = await axios.get(inputUrl);
        const { token, data, query } = responseData;

        if (!token || !Array.isArray(data) || !Array.isArray(query)) {
            throw new Error('Invalid input data structure');
        }

        // Tính kết quả
        const results = query
            .map(({ type, range }) => {
                const [l, r] = range;
                
                // Validate range
                if (l < 0 || r >= data.length || l > r) return null;

                const subArray = data.slice(l, r + 1);
                
                // Xử lý theo type
                switch(type) {
                    case "1":
                        return subArray.reduce((sum, num) => sum + num, 0);
                    case "2":
                        return subArray.reduce((sum, num, idx) => 
                            sum + ((l + idx) % 2 === 0 ? num : -num), 0);
                    default:
                        return null;
                }
            })
            .filter(Boolean); // Loại bỏ null ngắn gọn hơn

        // Post kết quả
        const { status } = await axios.post(outputUrl, results, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (status >= 200 && status < 300) {
            console.log('Results:', results);
            return results;
        }

        throw new Error(`Post failed with status: ${status}`);
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

const inputUrl = 'https://share.shub.edu.vn/api/intern-test/input';
const outputUrl = 'https://share.shub.edu.vn/api/intern-test/output';

calculateArrayRanges(inputUrl, outputUrl).catch(console.error);