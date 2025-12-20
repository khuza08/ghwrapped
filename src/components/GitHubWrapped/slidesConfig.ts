import CommitsCounterSlide from "@/components/GitHubWrapped/CommitsCounterSlide";
import CommitsSlide from "@/components/GitHubWrapped/CommitsSlide";
import LanguagesSlide from "@/components/GitHubWrapped/LanguagesSlide";
import SummarySlide from "@/components/GitHubWrapped/SummarySlide";
import ImageExportSlide from "@/components/GitHubWrapped/ImageExportSlide";
import GitHubWrappedBanner from "@/components/GitHubWrapped/GitHubWrappedBanner";

export interface Slide {
  id: string;
  component: React.ComponentType<{ data: any }>; // Using any for now to avoid circular import issues
  title: string;
}

export const getSlides = (): Slide[] => [
  { id: "commits-counter", component: CommitsCounterSlide, title: "Your Contributions" },
  { id: "commits", component: CommitsSlide, title: "Commits" },
  { id: "languages", component: LanguagesSlide, title: "Languages" },
  { id: "summary", component: SummarySlide, title: "Summary" },
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
];