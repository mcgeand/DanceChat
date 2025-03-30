module.exports = {
  files: [
    {
      path: 'build/static/js/*.js',
      maxSize: '100 kB',
    },
    {
      path: 'build/static/css/*.css',
      maxSize: '20 kB',
    },
    {
      path: 'build/static/media/*',
      maxSize: '50 kB',
    },
  ],
  ci: {
    trackBranches: ['main', 'development'],
  },
}; 