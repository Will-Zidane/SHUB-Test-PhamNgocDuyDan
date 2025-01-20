import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel1.png",
  },
  {
    id: 2,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel2.png",
  },
  {
    id: 3,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel3.png",
  },
  {
    id: 4,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel4.png",
  },
  {
    id: 5,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel5.png",
  },
  {
    id: 6,
    image: "https://shub.edu.vn/images/landing/ver3/image-section/carousel6.png",
  },

];

const SwiperElements = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={5    }  // Đảm bảo hiển thị 6 phần tử
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}  // Bật tính năng loop để slide quay vòng
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5   ,  // Hiển thị 6 phần tử trên màn hình rộng
          },
        }}  // Điều chỉnh số lượng slide hiển th
        className="w-full py-8"
      >
        {slides.map((slide,index) => (
          <SwiperSlide key={slide.id}>
            <div className={`bg-white rounded-lg overflow-hidden ${index % 2 === 0 ? 'pt-8' : 'pb-8'}`}>
              <div className="relative h-[396px] w-[160px]">
                <Image
                  src={slide.image}
                  alt={slide.id.toString()} // Ensure alt text for accessibility
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperElements;
