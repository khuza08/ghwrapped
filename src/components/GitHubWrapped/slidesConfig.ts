import CommitsCounterSlide from "@/components/GitHubWrapped/CommitsCounterSlide";
import CommitsSlide from "@/components/GitHubWrapped/CommitsSlide";
import LanguagesSlide from "@/components/GitHubWrapped/LanguagesSlide";
import ReposSlide from "@/components/GitHubWrapped/ReposSlide";
import PersonalitySlide from "@/components/GitHubWrapped/PersonalitySlide";
import ImageExportSlide from "@/components/GitHubWrapped/ImageExportSlide";
import GitHubWrappedBanner from "@/components/GitHubWrapped/GitHubWrappedBanner";
import SummarySlide from "@/components/GitHubWrapped/SummarySlide";

export interface Slide {
  id: string;
  component: React.ComponentType<{ data: any }>; // Using any for now to avoid circular import issues
  title: string;
}

export const getSlides = (): Slide[] => [
  { id: "commits-counter", component: CommitsCounterSlide, title: "Your Contributions" },
  { id: "commits", component: CommitsSlide, title: "Commits" },
  { id: "languages", component: LanguagesSlide, title: "Languages" },
  { id: "repos", component: ReposSlide, title: "Repos" },
  {
    id: "personality",
    component: PersonalitySlide,
    title: "Your Coding Style",
  },
  {
    id: "image-export",
    component: ImageExportSlide,
    title: "Export Image",
  },
  {
    id: "banner",
    component: GitHubWrappedBanner,
    title: "Shareable Banner",
  },
  {
    id: "summary",
    component: SummarySlide,
    title: "Summary",
  },
];