const { execSync } = require('child_process');

const baseUrl = process.env.BASE_URL || 'https://www.digitalcare.site';
const key = process.env.INDEXNOW_KEY;
const before = process.env.BEFORE || 'HEAD^';
const after = process.env.AFTER || 'HEAD';

if (!key) {
  console.error('Missing INDEXNOW_KEY environment variable');
  process.exit(1);
}

let changed;
try {
  changed = execSync(`git diff --name-only ${before} ${after}`, { encoding: 'utf8' });
} catch (err) {
  changed = '';
}

const htmlFiles = changed.split('\n').filter(f => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.log('No HTML changes to notify.');
  process.exit(0);
}

const urls = htmlFiles.map(f => baseUrl.replace(/\/$/, '') + '/' + f.replace(/^\.\//, ''));

const payload = {
  host: baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  key,
  keyLocation: `${baseUrl.replace(/\/$/, '')}/${key}.txt`,
  urlList: urls
};

(async () => {
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('IndexNow response status:', response.status);
    console.log(await response.text());
  } catch (err) {
    console.error('Failed to notify IndexNow:', err.message);
    process.exit(1);
  }
})();
