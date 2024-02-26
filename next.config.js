/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects: async () => {
        return [
            {
                source: "/:slug(\\d{8})",
                destination: "/play/:slug",
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
