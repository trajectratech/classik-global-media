"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CalendarCheck } from "lucide-react";

import { PhotoGrid } from "./photogrid";

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
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Photography & Videography</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Capturing life&#39;s moments — in stillness and in motion.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="flex gap-2 items-center text-base" size="lg">
            <Mail className="w-5 h-5" /> Contact Me
          </Button>
          <Button
            className="flex gap-2 items-center text-base"
            size="lg"
            variant="outline"
          >
            <CalendarCheck className="w-5 h-5" /> Book a Session
          </Button>
        </div>
      </section>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="relative flex justify-center gap-6 mb-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-900 p-1 shadow-inner max-w-fit">
          <TabsTrigger
            value="photos"
            className="relative px-6 py-2 rounded-full text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Photography
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="relative px-6 py-2 rounded-full text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Videography
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          {photoCollections.map((collection, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {collection.name}
              </h2>
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
              <h2 className="text-2xl font-bold mb-6 text-center">
                {video.name}
              </h2>
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

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Create Something Beautiful?
        </h2>
        <p className="text-muted-foreground mb-6">
          Whether it’s your big day, a creative project, or a corporate event —
          I’d love to tell your story.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="text-base">
            Book Now
          </Button>
          <Button size="lg" variant="outline" className="text-base">
            Contact Me
          </Button>
        </div>
      </section>
    </main>
  );
}
