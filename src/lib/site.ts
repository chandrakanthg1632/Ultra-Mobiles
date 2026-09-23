// "||" (not "??") deliberately — an env var present in Vercel but left
// blank is an empty string, which "??" would NOT fall back on (it only
// catches null/undefined), and new URL("") throws and fails the build.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ultramobiles-fnzh.vercel.app";

export const BUSINESS = {
  name: "Ultra Mobiles Training Institute",
  email: "ultramobiles07@gmail.com",
  phone: "+919994141075",
  address: {
    streetAddress: "19 East, S Car St",
    addressLocality: "Sulur",
    addressRegion: "Tamil Nadu",
    postalCode: "641402",
    addressCountry: "IN",
  },
};
