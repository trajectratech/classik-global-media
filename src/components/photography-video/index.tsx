"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CalendarCheck } from "lucide-react";

import { PhotoGrid } from "./photogrid";
import { MediaHeading } from "./media-heading.tsx";
import { FadeIn } from "@/animation/fade-in";

const images = [
  {
    src: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
    alt: "Photo 1"
  },
  {
    src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    alt: "Photo 2"
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    alt: "Photo 3"
  },
  {
    src: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    alt: "Photo 4"
  },
  {
    src: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    alt: "Photo 5"
  },
  {
    src: "https://docs.material-tailwind.com/img/team-3.jpg",
    alt: "Photo 6"
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    alt: "Photo 7"
  },
  {
    src: "https://docs.material-tailwind.com/img/team-3.jpg",
    alt: "Photo 8"
  },
  {
    src: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    alt: "Photo 9"
  },
  {
    src: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    alt: "Photo 10"
  },
  {
    src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    alt: "Photo 11"
  }
];

export const blurDataUrl = "https://placehold.co/600x400/png";
export function chunkIntoColumns<T>(array: T[], columns: number): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  array.forEach((item, index) => {
    result[index % columns].push(item);
  });
  return result;
}

export default function PhotographyVideoPage() {
  const photoCollections = [
    {
      name: "Beautiful Day",
      images: [
        // {
        //   src: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
        //   alt: "Photo 1"
        // },
        // {
        //   src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
        //   alt: "Photo 2"
        // },
        // {
        //   src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        //   alt: "Photo 3"
        // }
      ]
    },
    {
      name: "Panama Holiday Day",
      images: [
        // {
        //   src: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
        //   alt: "Photo 1"
        // },
        // {
        //   src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
        //   alt: "Photo 2"
        // },
        // {
        //   src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        //   alt: "Photo 3"
        // }
      ]
    }
  ];

  const videoCollection = [
    {
      name: `Nices Wedding`,
      videos: [
        {
          title: "Wedding Film Highlight",
          videoUrl:
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          title: "Documentary Short",
          videoUrl:
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          title: "Wedding Film Highlight",
          videoUrl:
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          title: "Event Recap",
          videoUrl:
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          title: "Documentary Short",
          videoUrl:
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
      ]
    }
  ];

  return (
    <main className="py-8">
      <section className="text-center mb-12 px-4 py-6">
        {/* <section className="text-center mb-12 px-4 py-12 rounded-xl bg-gradient-to-b from-white via-[#fff9e6] to-[#fff0c2] shadow-md"> */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-golden via-[#ff7e5f] to-[#000000] leading-tight">
          Photography & Videography
        </h1>

        <FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Capturing life&#39;s moments — in stillness and in motion.
          </p>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <Button className="flex items-center justify-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 font-semibold bg-gradient-to-r from-golden to-[#ff7e5f] text-black hover:brightness-110 shadow-md hover:shadow-lg transition w-full sm:w-auto">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            Contact Me
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 font-semibold border-2 border-golden text-[#000] hover:bg-[#fff7d1] transition w-full sm:w-auto"
          >
            <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            Book a Session
          </Button>
        </div>
      </section>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="relative flex justify-center gap-4 mb-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-900 p-1 shadow-inner w-full max-w-md overflow-x-auto overflow-y-hidden">
          <TabsTrigger
            value="photos"
            className="relative px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Photography
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="relative px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Videography
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          {photoCollections.map((collection, idx) => (
            <div key={idx} className="mb-12">
              <FadeIn>
                <MediaHeading title={collection.name} />
              </FadeIn>

              <PhotoGrid
                images={
                  collection?.images?.length > 0 ? collection?.images : images
                }
              />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="videos">
          {videoCollection?.map((video, idx) => (
            <div key={idx} className="mb-12">
              <FadeIn>
                <MediaHeading title={video.name} />
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {video.videos.map((video, idx) => (
                  <Card
                    key={idx}
                    className="overflow-hidden rounded-2xl shadow-md"
                  >
                    <CardContent className="p-0 aspect-video">
                      <video
                        controls
                        className="w-full h-full rounded-t-2xl"
                        preload="metadata" // prevents full download before play
                        // poster={video.posterUrl} // optional thumbnail image
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <section className="mt-20 text-center px-4">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ffc414] via-[#ff7e5f] to-[#000000]">
            Ready to Create Something Beautiful?
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether it’s your big day, a creative project, or a corporate event
            — I’d love to tell your story.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#ffc414] to-[#ff7e5f] text-black font-semibold hover:brightness-110 shadow hover:shadow-md transition"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-[#ffc414] text-black hover:bg-[#fff7d1] transition"
            >
              Contact Me
            </Button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
