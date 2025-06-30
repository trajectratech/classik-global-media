export const MediaHeading = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center mb-6 ">
      <div className="relative inline-block text-center group cursor-pointer my-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-golden">
          {title}
        </h2>

        <svg
          className="absolute left-1/2 -bottom-5 w-40 h-6 -translate-x-1/2"
          viewBox="0 0 160 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="160" y2="0">
              <stop offset="0%" stopColor="#ffc414" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <style>
              {`
                @keyframes wave {
                  0% {
                    d: path("M0 12 Q20 0 40 12 T80 12 T120 12 T160 12");
                  }
                  50% {
                    d: path("M0 12 Q20 24 40 12 T80 12 T120 12 T160 12");
                  }
                  100% {
                    d: path("M0 12 Q20 0 40 12 T80 12 T120 12 T160 12");
                  }
                }
                .animate-wave {
                  animation: wave 2s infinite ease-in-out;
                }
              `}
            </style>
          </defs>

          <path
            className="transition-all duration-500 ease-in-out group-hover:animate-wave"
            d="M0 12 Q20 0 40 12 T80 12 T120 12 T160 12"
            stroke="url(#grad)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
