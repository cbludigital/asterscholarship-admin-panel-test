const fs = require('fs');
const DATA_FILE = '/tmp/admin-data.json';

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

exports.main = async (args) => {
  let items = readData();
  const method = (args.__ow_method || 'get').toLowerCase();

  if (method === 'post') {
    let body = {};
    if (typeof args.body === 'string') {
      try { body = JSON.parse(args.body); } catch (e) { body = {}; }
    } else if (typeof args.body === 'object') {
      body = args.body;
    }
    if (body.name) {
      items.push({ id: Date.now(), name: body.name });
      writeData(items);
    }
    return {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };
  }

  return {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(items)
  };
};

if (process.env.TEST) exports.main({});
