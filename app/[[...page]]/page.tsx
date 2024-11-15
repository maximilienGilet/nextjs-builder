import React from "react";
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from "@/components/builder";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      prerender: false,
      fields: "data",
      cacheSeconds: 10,
      cachebust: true,
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
        <meta name="description" content={content?.data.description} />
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={"page"} />
    </>
  );
}
