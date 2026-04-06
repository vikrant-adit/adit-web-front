'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AditVoiceHomeComponent = () => {
  const router = useRouter();

  return (
    <section className="bg-[radial-gradient(109.01%_109.01%_at_46.76%_154.25%,_#25A8E0_0%,_rgba(255,255,255,0)_100%)] py-16 mx-8 my-4 rounded-b-[40px]">
      <div className="max-w-[90%] mx-auto flex flex-wrap items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="flex-1 min-w-[320px] mr-8">
          <h2 className="text-[2.4rem] font-semibold text-[#002b5b] mb-4 leading-tight">
            Never Miss a Patient Call <br /> with Adit’s VoIP Phones
          </h2>

          <p className="text-[1.1rem] text-[#555] mb-8 max-w-[500px]">
            Adit VoIP keeps every call, text, voicemail, and fax organized in
            one place, helping your practice stay connected and focused on
            patient care.
          </p>

          <Link
            href={"/schedule-a-demo"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base tracking-wide py-3 px-8 rounded-full transition duration-300 shadow-md"
          >
            Schedule a Demo
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 text-center min-w-[55%]">
          <Image
            src=`${process.env.STRAPI_API_FOR_IMAGES}/uploads/adit_voice_page_banner_img_afcebdc89d.png`
            alt="Adit VoIP Phones"
            width={600}
            height={400}
            className="mx-auto h-auto w-full max-w-[600px]"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default AditVoiceHomeComponent;
