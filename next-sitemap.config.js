/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bestformy.com',
  generateRobotsTxt: true,
  outDir: './out',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
