#!/usr/bin/env bash
#

export VERSION="6";
export DOWNLOADS_DIR="${HOME}/Downloads";
export SAFE_DIR="backup";
export SOURCE_FILES_DIR="${DOWNLOADS_DIR}/${SAFE_DIR}";

export COUCH_DATABASE_NAME='iriblu';
export COUCH_DATABASE="${COUCH_DATABASE_NAME}_${VERSION}";

if [[ 1 == 0 ]]; then
  ./CleanSheetsFilenames.sh &>/dev/null;
  pushd ${HOME}/Downloads;
    mkdir -p backup;
    mv FactElec2018_dev_*.csv ./backup &>/dev/null;
  popd;

  if [[ -f ${SOURCE_FILES_DIR}/FactElec2018_dev_Envases_JSON.csv ]]; then
    ./FixJsonFile.sh ${SOURCE_FILES_DIR}/FactElec2018_dev_Envases_JSON.csv ./databases/bottles/bottles;
  fi;
  if [[ -f ${SOURCE_FILES_DIR}/FactElec2018_dev_Persons_JSON.csv ]]; then
    ./FixJsonFile.sh ${SOURCE_FILES_DIR}/FactElec2018_dev_Persons_JSON.csv ./databases/persons/persons;
  fi;
fi;


if [[ 1 == 1 ]]; then
  ./DropCreateDatabase.sh;
  ./PutSecurity.sh;
  ./PutUsers.sh;

  export COUCH_COLLECTION_NAME='persons';
  ./UploadJsonFile.sh databases/${COUCH_COLLECTION_NAME}/${COUCH_COLLECTION_NAME};
  # export SPEC_NAME='persons';
  # ./PutDesignDocument.sh;

  export COUCH_COLLECTION_NAME='bottles';
  ./UploadJsonFile.sh databases/${COUCH_COLLECTION_NAME}/${COUCH_COLLECTION_NAME};
  export SPEC_NAME='full_range';
  ./PutDesignDocument.sh;
  # export SPEC_NAME='bottles';
  # ./PutDesignDocument.sh;

  export COUCH_COLLECTION_NAME='bottle_movements';
  ./UploadJsonFile.sh databases/${COUCH_COLLECTION_NAME}/movements;
  export SPEC_NAME='user_specific';
  ./PutDesignDocument.sh;

  export SPEC_NAME='visible';
  ./PutViewsDocument.sh;

fi;

# if [[ 1 == 0 ]]; then
#   export COUCH_DATABASE_NAME='persons';
#   export COUCH_DATABASE="${COUCH_DATABASE_NAME}_${VERSION}";
#   export SPEC_NAME='persons';
#   ./DropCreateDatabase.sh;
#   ./PutDesignDocument.sh;
#   ./PutSecurity.sh;
#   ./UploadJsonFile.sh databases/${COUCH_DATABASE_NAME}/${COUCH_DATABASE_NAME};
# fi;

# if [[ 1 == 0 ]]; then
#   export COUCH_DATABASE_NAME='bottles';
#   export COUCH_DATABASE="${COUCH_DATABASE_NAME}_${VERSION}";
#   ./DropCreateDatabase.sh;
#   ./PutSecurity.sh;
#   ./UploadJsonFile.sh databases/${COUCH_DATABASE_NAME}/${COUCH_DATABASE_NAME};
# fi;

# if [[ 1 == 0 ]]; then
#   export COUCH_DATABASE_NAME='bottle_movements';
#   export COUCH_DATABASE="${COUCH_DATABASE_NAME}_${VERSION}";
#   export SPEC_NAME='user_specific';
#   ./DropCreateDatabase.sh;
#   ./PutDesignDocument.sh;
#   ./PutSecurity.sh;
#   ./UploadJsonFile.sh databases/${COUCH_DATABASE_NAME}/movements;

# fi;

if [[ 1 == 1 ]]; then
  ./TestGet.sh;
fi;
