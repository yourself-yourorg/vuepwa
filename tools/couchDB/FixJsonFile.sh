#!/usr/bin/env bash
#
EXPORTED_FILE=${1};
FILE=${2}.json;
#
cat StartBracket.txt ${EXPORTED_FILE} EndBracket.txt > ${FILE};
sed -i '/"{/s//    {/' ${FILE};
sed -i '/"  ]/s//\
  ]/' ${FILE};
sed -i '/"$/s//,/' ${FILE};
sed -i 's/"/,/g' ${FILE};
sed -i "s/'/\"/g" ${FILE};

head -n 4 ${FILE};
echo "              :";
echo "              :";
tail -n 4 ${FILE};
