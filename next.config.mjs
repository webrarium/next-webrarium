/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        port: "",
      },
    ],
  },
  redirects: () => {
    return [
      {
        source: "/ua",
        destination: "/uk",
        permanent: true,
      },
      // Chatbot service merged into AI Automation
      {
        source: "/services/chatbots-developing",
        destination: "/services/ai-automation",
        permanent: true,
      },
      {
        source: "/en/services/chatbots-developing",
        destination: "/en/services/ai-automation",
        permanent: true,
      },
      // Event websites are no longer offered as a service
      {
        source: "/services/event-websites",
        destination: "/services/company-websites",
        permanent: true,
      },
      {
        source: "/en/services/event-websites",
        destination: "/en/services/company-websites",
        permanent: true,
      },
      {
        source: "/en/ua",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
