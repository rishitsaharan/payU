/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  env : {
    NEXTAUTH_URL:"http://13.60.57.102:3000",
  }
};
