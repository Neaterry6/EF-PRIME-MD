import fs from 'fs';

const disableFile = './disable-react.json';

const interceptor = {
  name: 'autoreact-guard',
  description: 'Intercept messages and block reactions if disabled',
  category: 'Hidden',
  async execute(m, sock) {
    // If disable file exists and is true, skip reacting
    if (fs.existsSync(disableFile)) {
      const state = JSON.parse(fs.readFileSync(disableFile));
      if (state.disabled) {
        return; // skip any reaction
      }
    }

    // if not disabled — optionally do nothing or leave blank
  }
};

export default interceptor
