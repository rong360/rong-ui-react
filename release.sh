rm -rf release

npm run build

mkdir release

gulp

cp -r ./es/ ./release/es/

cp -r ./lib/ ./release/lib/

cp -r ./pkg-package.json ./release/package.json
cp -r ./pkg-readme.md ./release/README.md

rm -rf es
rm -rf lib
