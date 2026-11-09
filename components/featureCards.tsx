import Image from "next/image";

export default function FeatureCards() {
  const features = [
    {
      title: "Sketch Challenge",
      bgCard: "bg-[#F3EFFF]",
      titleColor: "text-[#6C42F5]",
      imgSrc: "/image 2.png",
      alt: "Sketch Challenge",
    },
    {
      title: "Jelajah Cilik",
      bgCard: "bg-[#E6F4FF]",
      titleColor: "text-[#0088FF]",
      imgSrc: "/image 2 (1).png",
      alt: "Jelajah Cilik",
    },
    {
      title: "Sketch To Story",
      bgCard: "bg-[#FEF7D9]",
      titleColor: "text-[#CCA01D]",
      imgSrc: "/Anak dan Gajah Menggambar Bersama 1.png",
      alt: "Sketch To Story",
    },
  ];

  return (
    <section id="fitur" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header Fitur */}
      <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827]">
          Fitur Unggulan Kami:
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium max-w-md mx-auto">
          Belajar jadi seru lewat menggambar, menebak dan bermain bersama
        </p>
      </div>

      {/* 3 Kotak Kartu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className={`${item.bgCard} ${
              index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
            } rounded-2xl p-6 flex flex-col items-center justify-between min-h-[280px] sm:min-h-[310px] shadow-sm hover:shadow-md transition-transform hover:-translate-y-1`}
          >
            {/* Wadah Gambar Ilustrasi */}
            <div className="w-full h-40 sm:h-48 flex items-center justify-center relative">
              <Image
                src={item.imgSrc}
                alt={item.alt}
                width={240}
                height={180}
                className="object-contain max-h-full drop-shadow-sm"
              />
            </div>

            {/* Nama Fitur */}
            <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight mt-3 text-center ${item.titleColor}`}>
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
