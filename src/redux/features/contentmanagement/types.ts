/* eslint-disable @typescript-eslint/no-explicit-any */
// Common types for Content Management API

export interface SiteParam {
  site: string;
}

export interface IdParam {
  id: string | number;
}

export interface TermsAndConditionsParams {
  site: string;
  termsAndConditions: any;
}

export interface PrivacyPolicyParams {
  site: string;
  privacyPolicy: any;
}

export interface FooterParams {
  site: string;
  footerContent: any;
}

export interface FaqParams {
  site?: string;
  faqContent: any;
}

export interface WhyUsParams {
  site?: string;
  whyUsContent: any;
}

export interface ContactInfoParams {
  site?: string;
  contactInfo: any;
}

export interface FeaturedBrandsParams {
  id?: string | number;
  featuredBrands: any;
}

export interface AboutUsParams {
  site: string;
  aboutUsContent: any;
}
