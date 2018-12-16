PACKAGE_VERSION=$(cat api/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

docker build --rm -f "Dockerfile" -t arasksgl/simple-json-api:$PACKAGE_VERSION .
docker run --rm -d -p 3000:3000/tcp arasksgl/simple-json-api:$PACKAGE_VERSION
