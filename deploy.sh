PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

docker container kill json-api

docker build --rm -f "Dockerfile" -t arasksgl/simple-json-api:$PACKAGE_VERSION .
docker run --rm -d -p 3000:3000/tcp --name=json-api arasksgl/simple-json-api:$PACKAGE_VERSION
