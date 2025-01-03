import {withPayload} from '@payloadcms/next/withPayload'


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.midlomark.com',
                port: '',
            },
        ]
    },
}

export default withPayload(nextConfig)
