import { StoryThread } from "@/components/home/Chapter";
import {
  Hero,
  ChapterQuestion,
  ChapterGap,
  ChapterEdge,
  ChapterMethod,
  ChapterDiscipline,
  ChapterStrategies,
  ChapterReceive,
  ChapterFounder,
  Closing,
} from "@/components/home/Sections";

/**
 * Home (brief, Section 7): chapters told as one story, plus hero and closing.
 * A gold thread runs down the left margin.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StoryThread>
        <ChapterQuestion />
        <ChapterGap />
        <ChapterEdge />
        <ChapterMethod />
        <ChapterDiscipline />
        <ChapterStrategies />
        <ChapterReceive />
        <ChapterFounder />
      </StoryThread>
      <Closing />
    </>
  );
}
