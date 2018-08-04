#!/usr/bin/env bash
#
DB=${1:-$COUCH_DATABASE};
UZR=${2:-$COUCH_USR};
PSS=${3:-$COUCH_PWD};

if [[ -z "$DB" ||  -z "$UZR" ||  -z "$PSS" ]]; then
  echo "Usage: ./RecreateDatabase.sh $COUCH_DATABASE $COUCH_USR $COUCH_PWD";
  exit 1;
fi;

./DropCreateDatabase.sh;
./UploadJsonFile.sh persons;
./UploadJsonFile.sh bottles;
./trialViews/putDesignDocument.sh;
