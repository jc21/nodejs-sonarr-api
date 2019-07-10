# Sonarr API Client

See: https://github.com/Sonarr/Sonarr/wiki/API

### Usage

```javascript
const Sonarr = require('@jc21/sonarr-api').Sonarr;

let s = new Sonarr('https://USER:PASS8@sonarr.example.com', 'APIKEY');

s.shows()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error('ERR:', err);
    });
```


### Compiling

```bash
npm install
tsc --project tsconfig.build.json
```

