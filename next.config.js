const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ru',
                permanent: true,
            },
        ]
    },
}

module.exports = withMDX(nextConfig)