// Script that deploys to Github Pages

const ghPages = require('gh-pages');
const fs = require('fs');
const path = require('path');

ghPages.publish('dist', { dotfiles: true }, (err) => {
  if (err) {
    console.error('deploy error', err);
  } else {
    console.log('successfully deployed.');
  }
});
