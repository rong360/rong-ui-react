rm -rf release

npm run build

mkdir release

gulp

cp -r ./es/ ./release/es/

cp -r ./lib/ ./release/lib/

cp -r ./pkg-readme.md ./release/README.md

version=$(grep "version" package.json | head -n 1 | awk -F'"' '{print $4}')

s=`cat <<EOF
{
  "name": "rong-ui-react",
  "version": "$version",
  "description": "A React UI Toolkit for mobile.",
  "author": "zyx",
  "keywords": [
    "rong-ui-react"
  ],
  "bugs": {
    "url": "https://github.com/rong360/rong-ui-react/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rong360/rong-ui-react.git"
  },
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
  ],
  "main": "lib/index.js",
  "module": "es/index.js",
  "dependencies": {
    "async-validator": "^4.0.3",
    "better-picker": "^1.1.3",
    "react-transition-group": "^4.4.2",
    "memoize-one": "^6.0.0"
  },
  "contributors": [
    {
      "name": "List of Acorn contributors. Updated before every release."
    }, {
      "name": "zyx"
    }
  ],
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "last 10 Chrome versions",
    "last 5 Firefox versions",
    "Safari >= 6",
    "not ie <= 8"
  ],
  "license": "MIT"
}


EOF`
echo "$s" > release/package.json

rm -rf es
rm -rf lib

cd release
npm publish
