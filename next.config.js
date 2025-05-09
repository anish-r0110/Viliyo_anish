/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler:{
    styledComponents:{
      ssr:false
    }
  },
  images: {
    domains: ['vtt-ahom.s3.amazonaws.com', 'cdn.pixabay.com' ,'img.youtube.com' ,'localhost'],
  },
  eslint: {
    // Disable ESLint during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore type errors during build process
    ignoreBuildErrors: true,
  },
}


module.exports = nextConfig
