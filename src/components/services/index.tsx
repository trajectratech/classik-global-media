import { IServiceParent } from "@/interface/services";
import { Service } from "./service";

export const Services = ({ data }: { data: IServiceParent }) => {
  const services = data?.services;
  return (
    <section
      id="services"
      className="py-10 bg-gradient-to-br from-white via-indigo-50 to-white"
    >
      <div className="container px-4 text-center">
        <h2 className="text-5xl sm:text-6xl font-serif font-bold text-almostblack mb-8 tracking-tight">
          {data?.title}
        </h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-almostblack/80 mb-20 leading-relaxed font-light tracking-wide">
          {data?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-12">
          {services
            ?.slice() // to avoid mutating original array
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((item, index) => <Service key={index} item={item} />)}
        </div>
      </div>
    </section>
  );
};
