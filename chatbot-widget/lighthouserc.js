module.exports = {
  ci: {
    collect: {
      /* Add configuration for collecting Lighthouse metrics */
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    upload: {
      /* Add configuration for uploading to temporary public storage */
      target: 'temporary-public-storage',
    },
    assert: {
      /* Add performance assertions */
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
}; 