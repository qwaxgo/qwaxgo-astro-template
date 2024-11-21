import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import pictureOgImage from "./og-templates/picture";
import mcSkinOgImage from "./og-templates/mcskin";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForPicture(
  post: CollectionEntry<"pictures">
) {
  const svg = await pictureOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForMcSkin(
  post: CollectionEntry<"mcskins">
) {
  const svg = await mcSkinOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
