#!/usr/bin/env bash
#
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )";

DB=${1:-$COUCH_DATABASE};
UZR=${2:-$COUCH_USR};
PSS=${3:-$COUCH_PWD};

if [[ -z "$DB" ||  -z "$UZR" ||  -z "$PSS" ]]; then
  echo "Usage: ./putDesignDocument.sh $COUCH_DATABASE $COUCH_USR $COUCH_PWD";
  exit 1;
fi;
HOST="https://${UZR}:${PSS}@yourdb.yourpublic.work";

echo -e "
Putting 'trialViews' design doc";
curl -H "Content-type: application/json" -X PUT "${HOST}/${DB}/_design/trialViews/" -d @${SCRIPT_DIR}/trialViews.json;

# curl -H "Content-type: application/json" -X PUT "${HOST}/${DB}/_design/trialViews/" \
#   -d '{"views":{"trial1":{"map":"function (doc) { if (doc.type == \"person\") { emit(doc._id, {codigo: doc.codigo, nombre: doc.nombre});}}"}}}';

#curl "${HOST}/${DB}/_design/trialViews/_view/trial1";


# {"views":{"trial1":{"map":"function (doc) { if (doc.type == \"person\") { emit(doc._id, {codigo: doc.codigo, nombre: doc.nombre});}}"}}}
# {"views":{"trial1":{"map":"function (doc) { if (doc.type == \"person\") { emit(doc._id, {codigo: doc.codigo, nombre: doc.nombre});}}"}}}
