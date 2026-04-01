'use client'

/* ---------------------------------------------
 * CORE TYPES
 * --------------------------------------------- */
import { Config } from "@wecre8websites/strapi-page-builder-react";
import IntegrationBlockConfig from "./IntegrationsTab/config";
import { IntegrationBlockProps } from "./IntegrationsTab/component.client";
/* ---------------------------------------------
 * BASIC / COMMON BLOCKS
 * --------------------------------------------- */
import { HeadingBlockProps } from "./HeaderBlock/component.client";
import { HeadingBlockConfig } from "./HeaderBlock/config";

import { ParagraphBlockProps } from "./ParagraphBlock/component.client";
import { ParagraphBlockConfig } from "./ParagraphBlock/config";

import { ImageBlockProps } from "./ImageBlock/component.client";
import { ImageBlockConfig } from "./ImageBlock/config";

import { RichHtmlProps } from "./RIchHtml/component.client";
import RichHtmlConfig from "./RIchHtml/connfig";

import { ButtonProps } from "./Button/componet.client";
import ButtonConfig from "./Button/config";

import { DividerProps } from "./Divider/component.client";
import { DividerConfig } from "./Divider/config";
import FormBlockConfig from "./FormBlock/config";
import {FormBlockProps} from "./FormBlock/component.client";
/* ---------------------------------------------
 * HERO + MARKETING BLOCKS
 * --------------------------------------------- */
import { HeroTypedProps } from "./Hero/component.client";
import TypedHeroConfig from "./Hero/config";

// import { GlobalPromoProps } from "./GlobalPromo/component.client";
// import GlobalPromoConfig from "./GlobalPromo/config";

import LogoCarouselConfig from "./LogoCarousel/config";
import { LogoCarouselProps } from "./LogoCarousel/ccomponent.client";
/* ---------------------------------------------
 * TESTIMONIALS
 * --------------------------------------------- */


/* ---------------------------------------------
 * REVIEW SYSTEM
 * --------------------------------------------- */
import { ReviewCardProps } from "./ReviewCard/component.client";
import ReviewCardConfig from "./ReviewCard/config";

import { ReviewContainerProps } from "./ReviewContainer/component.client";
import ReviewContainerConfig from "./ReviewContainer/config";

/* ---------------------------------------------
 * PRODUCT SUITE BLOCKS
 * --------------------------------------------- */
import { FeatureHeroProps } from "./ProductSuite/FeatureHero/component.client";
import FeatureHeroConfig from "./ProductSuite/FeatureHero/config";

import { FeatureSplitProps } from "./ProductSuite/FeatureContent/component.client";
import FeatureSplitConfig from "./ProductSuite/FeatureContent/config";

import { FeatureVideoProps } from "./ProductSuite/FeatureVideo/component.client";
import FeatureVideoConfig from "./ProductSuite/FeatureVideo/config";

/* ---------------------------------------------
 * SUPPORTING BLOCKS (CARDS, STATS, ETC)
 * --------------------------------------------- */
import { StatsProps } from "./Stats/component.client";
import StatsConfig from "./Stats/config";

import { CardProps } from "./CardsBlock/component.client";
import CardConfig from "./CardsBlock/config";

import { CardsContainerProps } from "./CardsContainer/compoent.client";
import CardsContainerConfig from "./CardsContainer/config";

import { SelectableCardsProps } from "./SelectableCard/component.client";
import SelectableCardsConfig from "./SelectableCard/config";

/* ---------------------------------------------
 * PROFILE + TEAM
 * --------------------------------------------- */
import { TeamCarouselProps } from "./ProfileCard/component.client";
import ProfileCardConfig from "./ProfileCard/config";

/* ---------------------------------------------
 * NAVIGATION
 * --------------------------------------------- */
import { MenuNavProps } from "./MenuNav/component.client";
import MenuNavConfig from "./MenuNav/config";

/* ---------------------------------------------
 * MISC BLOCKS
 * --------------------------------------------- */
import { DropzoneProps } from "./Dropzone/component.client";
import DropzoneConfig from "./Dropzone/config";


/* ---------------------------------------------
 * ROOT WRAPPER
 * --------------------------------------------- */
import { RootProps } from "./Root/component";
import { RootConfig } from "./Root/config";

import { FooterProps } from "./FooterBlock/component.client";
import {FooterConfig} from "./FooterBlock/config";

import SectionConfig from "./Section/config";
import { SectionProps } from "./Section/component.client";

import { TextAreaBlockProps } from "./TextAreaBlock/component.client";
import { TextAreaBlockConfig } from "./TextAreaBlock/config";


import FormCheckboxConfig from "./FormCheckboxBlock/config";
import { FormCheckboxProps } from "./FormCheckboxBlock/component.client";

import SupportFeaturesConfig from "./ImageCardDetailedCaraousal/config";
import { SupportFeaturesProps } from "./ImageCardDetailedCaraousal/component.client";

import { CarouselProps } from "./CaraouselsForProfiles/component.client";
import CarouselConfig from "./CaraouselsForProfiles/config";

import AditSliderConfig from "./SliderTextComponents/config";
import { AditSliderProps } from "./SliderTextComponents/component.client";

import ReviewsWidgetConfig from "./ReveiwBlocks/config";
import { ReviewsWidgetProps } from "./ReveiwBlocks/component.client";

import VideoBlockConfig from "./VideoBlock/config";
import { VideoBlockProps } from "./VideoBlock/component.client";

import { AllStepsSectionProps } from "./CaraouselImagesSlides/component.client";
import  AllStepsSectionConfig  from "./CaraouselImagesSlides/config";


import { CaseStudyHighlightListConfig } from "./CaseStudyHighlight/config";
import { CaseStudyHighlightListProps } from "./CaseStudyHighlight/component.client";


import DoctorTestimonialsConfig from "./DoctorTestimonials/config";
import { DoctorTestimonialsProps } from "./DoctorTestimonials/component.client";


import CaseStudySliderConfig from "./SuccessStoriesSlider/config";
import { CaseStudySliderProps } from "./SuccessStoriesSlider/component.client";

import NewFormBlockConfig from "./DynamicFormBlock/config";
import { NewFormBlockProps } from "./DynamicFormBlock/component.client";

/* NEW PAGE BUILDER BLOCKS */
import ProductSuiteHeroConfig from "./ProductSuiteHero/config";
import { ProductSuiteHeroProps } from "./ProductSuiteHero/component.client";

import CentralCommsServicesConfig from "./CentralCommsServices/config";
import { CentralCommsServicesProps } from "./CentralCommsServices/component.client";

import CaseStudyBlockConfig from "./CaseStudyBlock/config";
import { CaseStudyBlockProps } from "./CaseStudyBlock/component.client";

import FinalCTABlockConfig from "./FinalCTABlock/config";
import { FinalCTABlockProps } from "./FinalCTABlock/component.client";

import TasksBlockConfig from "./TasksBlock/config";
import { TasksBlockProps } from "./TasksBlock/component.client";
import { TasksBenefitsGridConfig } from "./TaskBenefitBlock/config";
import { TasksBenefitsGridProps } from "./TaskBenefitBlock/component.client";

/* NEW OPTOMETRY PAGE BLOCKS */
import TimelineBlockConfig from "./TimelineBlock/config";
import { TimelineBlockProps } from "./TimelineBlock/component.client";



import ResultsBlockConfig from "./ResultsBlock/config";
import { ResultsBlockProps } from "./ResultsBlock/component.client";

import AllStepsBlockConfig from "./AllStepsBlock/config";
import { AllStepsBlockProps } from "./AllStepsBlock/component.client";

import OnboardingBlockConfig from "./OnboardingBlock/config";
import { OnboardingBlockProps } from "./OnboardingBlock/component.client";

import AditMakeSwitchBlockConfig from "./AditMakeSwitchBlock/config";
import { AditMakeSwitchBlockProps } from "./AditMakeSwitchBlock/component.client";

import { AudioCardConfig } from "./AudioCard/config";
import { AudioCardProps } from "./AudioCard/component.client";

import SearchFilterBlockConfig from "./SearchFilterBlock/config";
import { SearchFilterBlockProps } from "./SearchFilterBlock/component.client";

import CaseStudyCardConfig from "./CaseStudyCard/config";
import { CaseStudyCardProps } from "./CaseStudyCard/component.client";

import  { FeatureIconCarouselProps } from "./FeatureIconCarousel/component.client";
import FeatureIconCarouselConfig from "./FeatureIconCarousel/config";

import ImageSliderConfig from "./ImageSlider/config";
import { ImageSliderBlockProps } from "./ImageSlider/component.client";

import FaqBlockConfig from "./FaqBlock/config";
import { FaqBlockProps } from "./FaqBlock/component.client";

import { CallIntelBLockProps } from "./CallIntelBlock/component.client";
import CallIntelBLockSectionConfig from "./CallIntelBlock/config";

import {CaseStudyHeroBlockProps} from "./TestimonialCaseStudyBlockImage/component.client";
import { CaseStudyHeroBlockConfig } from "./TestimonialCaseStudyBlockImage/config";

import { LinkBlockProps } from "./Link/component.client";
import { LinkBlockConfig } from "./Link/config";

import { EbookInsideTabsBlockProps } from "./EbookTabBlock/component.client";
import { EbookInsideTabsBlockConfig } from "./EbookTabBlock/config";

import {SimilarEbooksBlockProps} from "./EbookSimilarContentBlock/component.client" ;
import { SimilarEbooksBlockConfig } from "./EbookSimilarContentBlock/config";

import { EbookListBlockProps } from "./EbookList/component.client";
import { EbookListBlockConfig } from "./EbookList/config";

import { WhyDownloadGuideBlockConfig } from "./WhyDownloadGuide/config";
import { WhyDownloadGuideBlockProps } from "./WhyDownloadGuide/component.client";

import  { EbookApiDataSourceBlockProps } from "./EbookApiDataSourceBlock/component.client";
import { EbookApiDataSourceBlockConfig } from "./EbookApiDataSourceBlock/config";

import { BlogListBlockProps } from "./BlogList/component.client";
import BlogListBlockConfig from "./BlogList/config";

import { BlogHeroBlockProps } from "./BlogsDetails/BlogHeroBlock/component.client";
import BlogHeroBlockConfig from "./BlogsDetails/BlogHeroBlock/config";

import { BlogRichTextBlockProps } from "./BlogsDetails/BlogRichTextBlock/component.client";
import BlogRichTextBlockConfig from "./BlogsDetails/BlogRichTextBlock/config";

import { SimilarBlogsBlockProps } from "./BlogsDetails/SimilarBlogsBlock/component.client";
import SimilarBlogsBlockConfig from "./BlogsDetails/SimilarBlogsBlock/config";

import { BlogSectionBlockProps } from "./BlogsDetails/BlogSectionBlock/component.client";
import BlogSectionBlockConfig from "./BlogsDetails/BlogSectionBlock/config";
// import FormBlockConfig from "./NewFormBlock/config";
// import {FormBlockProps} from "./NewFormBlock/component.client";
/* =============================================
 * PAGE BUILDER BLOCK TYPE DEFINITIONS
 * ============================================= */
type PageBuilderBlocks = {
  Button: ButtonProps,
  Card: CardProps,
  CardsContainer: CardsContainerProps,
  Divider: DividerProps,
  Dropzone: DropzoneProps,
  FeatureHero: FeatureHeroProps,
  FeatureSplit: FeatureSplitProps,
  FeatureVideo: FeatureVideoProps,
  Footer: FooterProps,
  // GlobalPromo: GlobalPromoProps,
  HeadingBlock: HeadingBlockProps,
  Hero: HeroTypedProps,
  ImageBlock: ImageBlockProps,
  MenuNav: MenuNavProps,
  ParagraphBlock: ParagraphBlockProps,
  ProfileCard: TeamCarouselProps,
  ReviewCard: ReviewCardProps,
  ReviewContainer: ReviewContainerProps,
  RichHtml: RichHtmlProps,
  Section: SectionProps,
  SelectableCards: SelectableCardsProps,
  Stats: StatsProps,
  FormBlock: FormBlockProps,
  TextAreaBlock: TextAreaBlockProps,
  FormCheckbox: FormCheckboxProps,
  // ImageCarousel: ImageCarouselProps,
  IntegrationBlock: IntegrationBlockProps,
  LogoCarousel: LogoCarouselProps,
  SupportFeatures: SupportFeaturesProps,
  Carousel: CarouselProps,
  AditSlider: AditSliderProps,
  ReviewsWidget: ReviewsWidgetProps,
  VideoBlock: VideoBlockProps,
  AllStepsSection: AllStepsSectionProps,
  CaseStudyHighlight: CaseStudyHighlightListProps,
  DoctorTestimonials: DoctorTestimonialsProps,
  CaseStudySlider: CaseStudySliderProps,
  NewFormBlock: NewFormBlockProps,
  ProductSuiteHero: ProductSuiteHeroProps,
  CentralCommsServices: CentralCommsServicesProps,
  CaseStudyBlock: CaseStudyBlockProps,
  FinalCTABlock: FinalCTABlockProps,
  TasksBlock: TasksBlockProps,
  TasksBenefitsGrid: TasksBenefitsGridProps,
  TimelineBlock: TimelineBlockProps,
  ResultsBlock: ResultsBlockProps,
  AllStepsBlock: AllStepsBlockProps,
  OnboardingBlock: OnboardingBlockProps,
  AditMakeSwitchBlock: AditMakeSwitchBlockProps,
  AudioCard: AudioCardProps,
  SearchFilterBlock: SearchFilterBlockProps,
  CaseStudyCard: CaseStudyCardProps,
  FeatureIconCarousel: FeatureIconCarouselProps
  GradientSlider: ImageSliderBlockProps,
  FaqBlock: FaqBlockProps,
  CallIntelBLock: CallIntelBLockProps,
  TestimonialCaseStudyBlock: CaseStudyHeroBlockProps,
  Link: LinkBlockProps,
  EbookInsideTabsBlock: EbookInsideTabsBlockProps
  SimilarEbooksBlock: SimilarEbooksBlockProps,
  EbookListBlock: EbookListBlockProps,
  EbookApiDataSourceBlock: EbookApiDataSourceBlockProps,
  WhyDownloadGuideBlock: WhyDownloadGuideBlockProps,
  BlogListBlock: BlogListBlockProps,
  BlogRichTextBlock: BlogRichTextBlockProps,
  BlogHeroBlock: BlogHeroBlockProps,
  SimilarBlogsBlock: SimilarBlogsBlockProps,
  BlogSectionBlock: BlogSectionBlockProps
}

/* =============================================
 * CONFIG (MAIN REGISTRY)
 * ============================================= */
export const config : Config<
  PageBuilderBlocks,
  RootProps,
  "Heros" | "Cards" | "Integration" | "Testimonials" | "Navigation" | "Fields" | "Marketing" | "ProductSuite"
> = ({
  
  /* ---------------------------------------------
   * COMPONENT REGISTRY
   * --------------------------------------------- */
  components: {
    Button: ButtonConfig,
    Card: CardConfig,
    CardsContainer: CardsContainerConfig,
    Divider: DividerConfig,
    Dropzone: DropzoneConfig,
    FeatureHero: FeatureHeroConfig,
    FeatureSplit: FeatureSplitConfig,
    FeatureVideo: FeatureVideoConfig,
    Footer: FooterConfig,
    // GlobalPromo: GlobalPromoConfig,
    HeadingBlock: HeadingBlockConfig,
    Hero: TypedHeroConfig,
    ImageBlock: ImageBlockConfig,
    MenuNav: MenuNavConfig,
    ParagraphBlock: ParagraphBlockConfig,
    ProfileCard: ProfileCardConfig,
    ReviewCard: ReviewCardConfig,
    ReviewContainer: ReviewContainerConfig,
    RichHtml: RichHtmlConfig,
    Section: SectionConfig,
    SelectableCards: SelectableCardsConfig,
    Stats: StatsConfig,
    FormBlock: FormBlockConfig,
    TextAreaBlock: TextAreaBlockConfig,
    FormCheckbox: FormCheckboxConfig,
    // ImageCarousel: ImageCarouselConfig,
    IntegrationBlock: IntegrationBlockConfig,
    LogoCarousel: LogoCarouselConfig,
    SupportFeatures: SupportFeaturesConfig,
    Carousel: CarouselConfig,
    AditSlider: AditSliderConfig,
    ReviewsWidget: ReviewsWidgetConfig,
    VideoBlock: VideoBlockConfig, 
    AllStepsSection: AllStepsSectionConfig,
    CaseStudyHighlight: CaseStudyHighlightListConfig,
    DoctorTestimonials: DoctorTestimonialsConfig,
    CaseStudySlider: CaseStudySliderConfig,
    NewFormBlock: NewFormBlockConfig,
    ProductSuiteHero: ProductSuiteHeroConfig,
    CentralCommsServices: CentralCommsServicesConfig,
    CaseStudyBlock: CaseStudyBlockConfig,
    FinalCTABlock: FinalCTABlockConfig,
    TasksBlock: TasksBlockConfig,
    TasksBenefitsGrid: TasksBenefitsGridConfig,
    TimelineBlock: TimelineBlockConfig,
    ResultsBlock: ResultsBlockConfig,
    AllStepsBlock: AllStepsBlockConfig,
    OnboardingBlock: OnboardingBlockConfig,
    AditMakeSwitchBlock: AditMakeSwitchBlockConfig,
    AudioCard: AudioCardConfig,
    SearchFilterBlock: SearchFilterBlockConfig,
    CaseStudyCard: CaseStudyCardConfig, 
    FeatureIconCarousel: FeatureIconCarouselConfig,
    GradientSlider: ImageSliderConfig,
    FaqBlock: FaqBlockConfig,
    CallIntelBLock: CallIntelBLockSectionConfig,
    TestimonialCaseStudyBlock: CaseStudyHeroBlockConfig,
    Link: LinkBlockConfig,
    EbookInsideTabsBlock: EbookInsideTabsBlockConfig,
    SimilarEbooksBlock: SimilarEbooksBlockConfig,
    EbookListBlock: EbookListBlockConfig,
    EbookApiDataSourceBlock: EbookApiDataSourceBlockConfig,
    WhyDownloadGuideBlock: WhyDownloadGuideBlockConfig,
    BlogListBlock: BlogListBlockConfig,
    BlogHeroBlock: BlogHeroBlockConfig,
    BlogRichTextBlock: BlogRichTextBlockConfig,
    SimilarBlogsBlock: SimilarBlogsBlockConfig,
    BlogSectionBlock: BlogSectionBlockConfig
    
  },

  /* ---------------------------------------------
   * CATEGORY GROUPS (Left Sidebar in Page Builder)
   * --------------------------------------------- */
  categories: {
    Heros: {
      title: "Hero Sections",
      components: [ "FeatureHero", "ProductSuiteHero"]
    },
 Marketing: {
  title: "Marketing Blocks",
  components: [
    "Hero",
    "FeatureSplit",
    "FeatureVideo",
    "Stats",
    "AditSlider",
    "CentralCommsServices",
    "FinalCTABlock",
    "TasksBlock",
    "TimelineBlock",
    "ResultsBlock",
    "AllStepsBlock",
    "OnboardingBlock",
    "AditMakeSwitchBlock",
    "FaqBlock",
    // ADD THESE
    "GradientSlider",
    "TasksBenefitsGrid",
    "FeatureIconCarousel"
  ]
},

Testimonials: {
  title: "Testimonials & Reviews",
  components: [
    "ReviewCard",
    "ReviewContainer",
    "Carousel",
    "ReviewsWidget",
    "TestimonialCaseStudyBlock",
    // ADD
    "DoctorTestimonials"
  ]
},

Fields: {
  title: "Content Fields",
  components: [
    "HeadingBlock",
    "ParagraphBlock",
    "ImageBlock",
    "VideoBlock",
    "RichHtml",
    "Divider",
    "Button",
    "FormBlock",
    "TextAreaBlock",
    "FormCheckbox",
    "SupportFeatures",
    "LogoCarousel",
    "Section",
    "NewFormBlock",
    "SearchFilterBlock",
    "Link"
  ]
},

Cards: {
  title: "Cards & Profiles",
  components: [
    "CaseStudySlider",
    "CaseStudyBlock",
    "Card",
    "CardsContainer",
    "SelectableCards",
    "ProfileCard",
    "Dropzone",
    "CaseStudyCard",
    "CallIntelBLock",
    // ADD
    "AudioCard"
  ]
}
,

    ProductSuite: {
      title: "Product Suite",
      components: ["FeatureSplit", "FeatureHero", "FeatureVideo"]
    },

  
    Navigation: {
      title: "Navigation & Layout",
      components: ["Footer", "MenuNav"]
    },

    // Cards: {
    //   title: "Cards & Profiles",
    //   components: ["CaseStudySlider", "CaseStudyBlock", "Card", "CardsContainer", "SelectableCards", "ProfileCard", "Dropzone","CaseStudyCard"]
    // },

    Integration: {
      title: "Integrations",
      components: ["IntegrationBlock", "AllStepsSection", "CaseStudyHighlight", "CentralCommsServices"]
    }
  },

  /* ---------------------------------------------
   * ROOT WRAPPER
   * --------------------------------------------- */
  root: RootConfig
})

export default config;
