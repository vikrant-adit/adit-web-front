'use client'

/* ---------------------------------------------
 * CORE TYPES
 * --------------------------------------------- */
import { Config } from "@wecre8websites/strapi-page-builder-react";





import { CardProps } from "./CardsBlock/component.client";
import CardConfig from "./CardsBlock/config";

import { CardsContainerProps } from "./CardsContainer/compoent.client";
import CardsContainerConfig from "./CardsContainer/config";



/* ---------------------------------------------
 * PROFILE + TEAM

/* ---------------------------------------------
 * ROOT WRAPPER
 * --------------------------------------------- */
import { RootProps } from "./Root/component";
import { RootConfig } from "./Root/config";

/* =============================================
 * PAGE BUILDER BLOCK TYPE DEFINITIONS
 * ============================================= */
type PageBuilderBlocks = {

  Card: CardProps,
  CardsContainer: CardsContainerProps,

}

/* =============================================
 * CONFIG (MAIN REGISTRY)
 * ============================================= */
export const config : Config<
  PageBuilderBlocks,
  RootProps,
   "Cards" 
> = ({
  
  /* ---------------------------------------------
   * COMPONENT REGISTRY
   * --------------------------------------------- */
  components: {
    Card: CardConfig,
    CardsContainer: CardsContainerConfig,

  },

  /* ---------------------------------------------
   * CATEGORY GROUPS (Left Sidebar in Page Builder)
   * --------------------------------------------- */
  categories: {
Cards: {
      title: "Cards & Profiles",
      components: ["Card", "CardsContainer"]
    }, 
 },

  /* ---------------------------------------------
   * ROOT WRAPPER
   * --------------------------------------------- */
  root: RootConfig
})

export default config;
