cd ../applications || exit 1

TOKEN="squ_50b8292e07415f8627f0b6c95a1faa0e3b177bfc"

dir=$(ls)

for project in $dir; do
  cd $project || return
    docker run --rm \
      -v "$(pwd):/usr/src" \
      --network="host" \
      -e SONAR_HOST_URL="http://localhost:9000" \
      -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=$project" \
      -e SONAR_TOKEN=$TOKEN \
      sonarsource/sonar-scanner-cli
  cd ..
done