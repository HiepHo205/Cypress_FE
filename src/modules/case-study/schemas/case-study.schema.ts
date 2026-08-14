import { z } from "zod";

export const caseStudyBannerSchema = z.object({
  breadcrumb_first: z.string(),
  breadcrumb_first_url: z.string(),
  breadcrumb_second: z.string(),
  breadcrumb_second_url: z.string(),
  title: z.string(),
  description: z.string(),
  background_image: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .nullable(),
});

export const caseStudyCategoryChildSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const caseStudyCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  children: z.array(caseStudyCategoryChildSchema),
});

export const caseStudyItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  active: z.boolean(),
  image: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .nullable(),
});

export const caseStudyPageSchema = z.object({
  banner: caseStudyBannerSchema.nullable(),
  categories: z.array(caseStudyCategorySchema),
  caseStudies: z.array(caseStudyItemSchema),
});

export type CaseStudyBannerSchema = z.infer<typeof caseStudyBannerSchema>;
export type CaseStudyCategoryChildSchema = z.infer<
  typeof caseStudyCategoryChildSchema
>;
export type CaseStudyCategorySchema = z.infer<typeof caseStudyCategorySchema>;
export type CaseStudyItemSchema = z.infer<typeof caseStudyItemSchema>;
export type CaseStudyPageSchema = z.infer<typeof caseStudyPageSchema>;
