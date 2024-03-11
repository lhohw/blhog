import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.resolve("./app/ui/styles")],
  },
};

export default nextConfig;
