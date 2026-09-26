"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
  {
    quote:
      "Joining the music school transformed my understanding of music and helped me to truly discover my own sound. The instructors are world-class!",
    name: "Alex Johnson",
    title: "Guitar Student",
  },
  {
    quote:
      "The community and support at this school are unmatched. I've grown not just as a pianist, but also as a performer, thanks to their comprehensive approach.",
    name: "Samantha Lee",
    title: "Piano Student",
  },
  {
    quote:
      "This school offered me the tools and confidence to take my singing to the next level. I'm endlessly grateful for the personalized coaching.",
    name: "Michael Chen",
    title: "Vocal Student",
  },
  {
    quote:
      "As a violinist, finding the right mentor can be challenging, but this school matched me with a teacher who truly understands my goals and challenges.",
    name: "Emily Taylor",
    title: "Violin Student",
  },
  {
    quote:
      "The production courses here opened my eyes to the intricacies of music production. Highly recommend for any aspiring producers!",
    name: "Chris Morales",
    title: "Music Production Student",
  },
];

function MusicSchoolTestimonials() {
  return (
    <section
      className="relative flex h-160 w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black"
      style={{
        backgroundImage: `
      linear-gradient(
        rgba(255,255,255,0.08) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0.08) 1px,
        transparent 1px
      )
    `,
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 flex w-full flex-col items-center">
        <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
          Hear our Harmony: Voices of Success
        </h2>

        <div className="flex w-full justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            <InfiniteMovingCards
              items={musicSchoolTestimonials}
              direction="right"
              speed="slow"
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MusicSchoolTestimonials;
