"use client";

import { Mail, CalendarCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/animation/fade-in";
import { IMediaResponse } from "@/interface/media";
import { fixUrl } from "@/lib/utils";

import { PhotoGrid } from "./photogrid";
import { MediaHeading } from "./media-heading.tsx";

const images = [
  {
    title: "Photo 1",
    description: "Description for Photo 1",
    file: {
      url: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo1.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 2",
    description: "Description for Photo 2",
    file: {
      url: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo2.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 3",
    description: "Description for Photo 3",
    file: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo3.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 4",
    description: "Description for Photo 4",
    file: {
      url: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo4.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 5",
    description: "Description for Photo 5",
    file: {
      url: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo5.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 6",
    description: "Description for Photo 6",
    file: {
      url: "https://docs.material-tailwind.com/img/team-3.jpg",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo6.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 7",
    description: "Description for Photo 7",
    file: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo7.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 8",
    description: "Description for Photo 8",
    file: {
      url: "https://docs.material-tailwind.com/img/team-3.jpg",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo8.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 9",
    description: "Description for Photo 9",
    file: {
      url: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo9.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 10",
    description: "Description for Photo 10",
    file: {
      url: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo10.jpg",
      contentType: "image/jpeg"
    }
  },
  {
    title: "Photo 11",
    description: "Description for Photo 11",
    file: {
      url: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      details: {
        image: { width: 4500, height: 5625 },
        size: 5925141
      },
      fileName: "photo11.jpg",
      contentType: "image/jpeg"
    }
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

export default function PhotographyVideoPage({
  media,
  whatsapp,
  email
}: {
  media: IMediaResponse | null;
  email: string;
  whatsapp: string;
}) {
  const photoCollections = [
    {
      name: "Beautiful Day",
      images: []
    },
    {
      name: "Panama Holiday Day",
      images: []
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

  const mediaTypeText = "Photography & Video";

  const subject = encodeURIComponent(`Inquiry about ${mediaTypeText}`);
  const body = encodeURIComponent(
    `Hello,\n\nI am interested in your ${mediaTypeText} services. Please get back to me with more details.\n\nThanks!`
  );

  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  const message = encodeURIComponent(
    `Hello, I’d like to book your ${mediaTypeText} services. Please let me know the details.`
  );

  const whatsappLink = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <main className="py-8">
      <section className="text-center mb-12 px-4 py-6">
        {/* <section className="text-center mb-12 px-4 py-12 rounded-xl bg-gradient-to-b from-white via-[#fff9e6] to-[#fff0c2] shadow-md"> */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-golden via-[#000000] to-[#000000] leading-tight">
          Photography & Videography
        </h1>

        <FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Capturing life&#39;s moments — in stillness and in motion.
          </p>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <Link href={mailto}>
            <Button className="flex items-center justify-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 font-semibold bg-gradient-to-r from-black to-golden text-white hover:brightness-110 shadow-md hover:shadow-lg transition w-full sm:w-auto">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Me
            </Button>
          </Link>
          <Link href={whatsappLink}>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 font-semibold border-2 border-golden text-[#000] hover:bg-[#fff7d1] transition w-full sm:w-auto"
            >
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              Book a Session
            </Button>
          </Link>
        </div>
      </section>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="relative flex justify-center gap-4 mb-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-900 p-0 shadow-inner w-full max-w-md overflow-x-auto overflow-y-hidden">
          <TabsTrigger
            value="photos"
            className="flex-1 text-center px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Photography
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="flex-1 text-center px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white"
          >
            Videography
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          {media && media?.photos && media?.photos?.length > 0 ? (
            <>
              {media?.photos?.map((item, idx) => (
                <div key={idx}>
                  <div key={idx} className="mb-12">
                    {idx === 0 ? (
                      <MediaHeading title={item.heading} />
                    ) : (
                      <FadeIn>
                        <MediaHeading title={item.heading} />
                      </FadeIn>
                    )}

                    <PhotoGrid images={item.photos} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyMediaState type="photos" />
          )}
          {photoCollections.map((collection, idx) => (
            <div key={idx} className="mb-12">
              {idx === 0 ? (
                <MediaHeading title={collection.name} />
              ) : (
                <FadeIn>
                  <MediaHeading title={collection.name} />
                </FadeIn>
              )}

              <PhotoGrid images={images} />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="videos">
          {media && media?.videos && media?.videos?.length > 0 ? (
            <>
              {media?.videos?.map((item, idx) => (
                <div key={idx}>
                  <div key={idx} className="mb-12">
                    <FadeIn>
                      <MediaHeading title={item.heading} />
                    </FadeIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {item.videos.map((video, idx) => (
                        <Card
                          key={idx}
                          className="overflow-hidden rounded-2xl shadow-md"
                        >
                          <CardContent className="p-0 aspect-video">
                            <video
                              controls
                              className="w-full h-full rounded-t-2xl"
                              preload="metadata" // prevents full download before play
                              // poster={blurDataUrl} // optional thumbnail image
                            >
                              <source
                                src={fixUrl(video.file.url)}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </CardContent>
                        </Card>
                      ))}
                    </div>{" "}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyMediaState type="videos" />
          )}
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black via-slate-500 to-golden">
            Ready to Create Something Beautiful?
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether it’s your big day, a creative project, or a corporate event
            — We’d love to tell your story.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-black to-golden text-white font-semibold hover:brightness-110 shadow hover:shadow-md transition"
              >
                Book Now
              </Button>
            </Link>
            <Link href={mailto}>
              <Button
                size="lg"
                variant="outline"
                className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-golden text-black hover:bg-[#fff7d1] transition"
              >
                Contact Me
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}

import { FileVideo2, ImageOff } from "lucide-react"; // or use any other icon lib
import Link from "next/link";

interface EmptyMediaStateProps {
  type: "photos" | "videos";
}

export const EmptyMediaState = ({ type }: EmptyMediaStateProps) => {
  const isPhotos = type === "photos";
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-md">
      <div className="mb-4 text-gray-400">
        {isPhotos ? (
          <ImageOff className="w-12 h-12" />
        ) : (
          <FileVideo2 className="w-12 h-12" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
        No {isPhotos ? "photos" : "videos"} found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        It looks like there are no {type} available at the moment.
      </p>
    </div>
  );
};
