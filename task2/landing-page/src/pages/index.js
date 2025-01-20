import SwiperElements from "@/components/SwiperElements";
import TypicalActivities from "@/components/TypicalActivities";
export default function Home() {
  return (
    <div className={`bg-white  h-[800px] px-28  `}>
   
      <TypicalActivities />
      <SwiperElements />
    </div>
  );
}
