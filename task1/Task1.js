const axios = require("axios");
const XLSX = require("xlsx");

// Bước 1: Tải file Excel từ URL
const url = "https://go.microsoft.com/fwlink/?LinkID=521962";

axios({
  method: "get",
  url: url,
  responseType: "arraybuffer", // Nhận dữ liệu dạng binary
})
  .then((response) => {
    // Đọc dữ liệu từ buffer
    const workbook = XLSX.read(response.data, { type: "buffer" });

    // Bước 2: Lấy sheet đầu tiên và chuyển thành JSON
    const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
    const sheet = workbook.Sheets[sheetName]; // Lấy sheet
    let data = XLSX.utils.sheet_to_json(sheet); // Chuyển đổi sheet thành JSON

    console.log("Dữ liệu gốc từ file Excel:", data); // In ra dữ liệu gốc để kiểm tra

    // Làm sạch tên cột (xóa khoảng trắng thừa)
    data = data.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key.trim(), value])
      )
    );

    // Kiểm tra xem cột "Sales" đã tồn tại hay chưa
    if (!data.length || !Object.keys(data[0]).includes("Sales")) {
      console.error("Cột 'Sales' không tồn tại trong file Excel hoặc dữ liệu trống!");
      return;
    }

    // Lọc dữ liệu: giữ lại các hàng mà Sales > 50.000
    const filteredData = data.filter((row) => row.Sales > 50000);

    console.log("Dữ liệu sau khi lọc:", filteredData); // In ra dữ liệu đã lọc

    if (filteredData.length === 0) {
      console.log("Không có dữ liệu nào thỏa mãn điều kiện Sales > 50.000.");
      return;
    }

    // Bước 3: Tạo sheet mới chứa dữ liệu đã lọc
    const newSheet = XLSX.utils.json_to_sheet(filteredData); // Tạo sheet từ dữ liệu đã lọc
    XLSX.utils.book_append_sheet(workbook, newSheet, "FilteredData"); // Thêm sheet vào workbook gốc

    // Lưu workbook vào file gốc
    const outputFileName = "filtered_sales_above_50000.xlsx";
    XLSX.writeFile(workbook, outputFileName);

    console.log(`Dữ liệu đã lọc được thêm vào sheet mới trong file: ${outputFileName}`);
  })
  .catch((error) => {
    console.error("Lỗi khi tải hoặc xử lý file:", error);
  });
