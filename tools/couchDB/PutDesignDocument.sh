#!/usr/bin/env bash
#
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )";

DB=${1:-$COUCH_DATABASE};
UZR=${2:-$COUCH_USR};
PSS=${3:-$COUCH_PWD};

if [[ -z "$DB" ||  -z "$UZR" ||  -z "$PSS" ]]; then
  echo "Usage: ./PutDesignDocument.sh $SPEC_NAME $COUCH_DATABASE $COUCH_USR $COUCH_PWD";
  exit 1;
fi;
HOST="https://${UZR}:${PSS}@yourdb.yourpublic.work";

echo -e "
Putting design doc ${SPEC_NAME}.json";
curl -H "Content-type: application/json" -X PUT "${HOST}/${DB}/_design/${SPEC_NAME}/" -d @${SCRIPT_DIR}/databases/${COUCH_COLLECTION_NAME}/design/${SPEC_NAME}.json;

