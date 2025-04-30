import type { NextConfig } from 'next';
import unTypiaNext from '@ryoppippi/unplugin-typia/next';

const nextConfig: NextConfig = {
	/* config options here */
	i18n: {
		defaultLocale: 'en_US',
		locales: ['en_US'],
	},
};

export default unTypiaNext(nextConfig, {});
