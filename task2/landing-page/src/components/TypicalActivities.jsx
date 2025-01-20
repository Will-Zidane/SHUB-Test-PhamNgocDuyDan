import Image from "next/image";

const TypicalActivities = () => (
  <div className="max-w-[760px] mx-auto  flex flex-col items-center">
    <div className="relative items-center justify-center flex h-[60px] w-[60px] mt-10">
      <Image
        src="https://shub.edu.vn/_next/image?url=%2Fimages%2Flanding%2Fver3%2Fimage-section%2Fnetworking.gif&w=128&q=75"
        alt="Networking GIF"
        layout="fill" // Sử dụng layout fill để hỗ trợ style như position absolute
        objectFit="contain" // Điều chỉnh cách hình ảnh hiển thị trong container
        priority // Ưu tiên tải hình ảnh sớm
      />
    </div>

      <h1 className="text-black font-semibold  mt-3.5 mb-6 text-[34px] text-center">
        Hoạt động tiêu biểu từ cộng đồng giáo dục
      </h1>
      <h2 className="text-black font-normal text-[22px] text-center">
        Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá
        trình giảng dạy, dạy học ứng dụng công nghệ SHub Classroom.
      </h2>
  </div>
);

export default TypicalActivities;
