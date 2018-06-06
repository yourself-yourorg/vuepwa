metaRanges[INVOICE][COLUMN_TITLES] = null;
metaRanges[INVOICE][BLANKS_FLAG_COLUMN] = null;
//metaRanges[COLUMN_TITLES] = null;
//metaRanges[BLANKS_FLAG_COLUMN] = null;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ testPostSingle ~~~~~~~~~~~~~~~~~~~~ */
var paramsForPostSingle = {
  store: INVOICE,
  mode: POST,
}

var dataForPostSingle = JSON.stringify({
  "nombre": "ZcZXc",
  "tipo": "_05",
  "ruc_cedula": "1234",
  "email": "ZXcZXc@hjh.com",
  "distribuidor": "no",
  "retencion": "no",
  "direccion": "ZXcZXc",
  "permissions": "{ \"Invoice\": 0, \"Example\": 3 }"
//  "ruc_cedula": "0708217086",
//  "nombre": "Scramerty von Flagellate",
//  "direccion": "Garc\u00eda Moreno 215 y Juan Montalvo ",
//  "telefono": "099-803-9999",
//  "email": "ZXcZXc@hjh.com",
//  "distribuidor": "si",
//  "retencion": "si",
//  "tipo": "_05",
//  "scabetti": "333",
//  "tipo_de_documento": "Cedula",
//  "permissions": "{'Invoice': '4', 'Example': '1'}"
});

function getPermissionsByEmail(_email, index) {
  var email = 'dummy';
  var idx = 0;
  while (email.length > 4  &&  idx < index.length) {
    email = index[idx][0];
    LG(TRC, 'getPermissionsByEmail', EMAIL_INDEX_RANGE + '[' + idx + ']', index[idx][0] + ' ==> ' + index[idx][2]);
    if ( email === _email) return { codigo: index[idx][1], permissions: index[idx][2] };
    idx += 1;
  }
//  LG(INF, 'getPermissionsByEmail', EMAIL_INDEX_RANGE + '[' +  + '][' +  + ']', colBlanks[3][2]);
  return null;
}

function getEmailIndex(sheet) {
  var emailIndex = metaRanges[INVOICE][EMAIL_INDEX_RANGE].getValues();
  var r = 3;
  var c = 2;
  LG(TRC, 'getEmailIndex', EMAIL_INDEX_RANGE + '[' + r + '][' + c + ']', emailIndex[r][c]);
  LG(TRC, 'getEmailIndex', EMAIL_INDEX_RANGE, emailIndex.length);
  return emailIndex;
}

function testGetPermissionsByEmail() {
  clearLog();
  var idSheet = PropertiesService.getScriptProperties().getProperty('active');
  var ss = SpreadsheetApp.openById(idSheet);
  var sheet = ss.getSheetByName(INVOICE_SHEET);
  getNamedRanges(sheet, INVOICE);
  clearLog();
  LG(INF, 'testGetPermissionsByEmail', 'Start', 0);
  var permissions = getPermissionsByEmail(TEST_USER, getEmailIndex(sheet));
  LG(INF, 'testGetPermissionsByEmail', 'End.  User ' + permissions.codigo, 'Has permissions: ' + permissions.permissions);
}


function testPostSingle() {
  clearLog();
  var parameters = JSON.stringify(paramsForPostSingle);
  LG(INF, 'testPostSingle', 'parameters', parameters );
  var ciphertext = Tea.encrypt(parameters, PropertiesService.getScriptProperties().getProperty('secret'));
  LG(TRC, 'testPostSingle', 'ciphertext', ciphertext );
  var urltext = encodeURIComponent(ciphertext);
  LG(TRC, 'testPostSingle', 'encoded ciphertext', urltext );

  var pyld = payload;
  pyld.parameter = { q: urltext };
  pyld.postData = { contents: dataForPostSingle };
  pyld.postData.length = 999;

  LG(DBG, 'testPostSingle', 'payload', JSON.stringify(pyld) );
  LG(INF, 'testPostSingle', 'response', doPost(pyld).getContent() );
};


var INVOICES_SHEET_NAME = 'ClientesNumericos';
function getInvoicesSheet() {
  var sheetSpec = {};

  var idSheet = PropertiesService.getScriptProperties().getProperty('active');
  var ss = SpreadsheetApp.openById(idSheet);
  var sheet = ss.getSheetByName( INVOICES_SHEET_NAME );
  getNamedRanges(sheet, INVOICE);

  sheetSpec.sheet = sheet;
  sheetSpec.dimensions = dimensionSheet(sheet, INVOICE, 'w');

  return sheetSpec;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Patch Single ~~~~~~~~~~~~~~~~~~~~ */
var paramsForPatchSingle = {
  store: INVOICE,
  mode: PATCH,
}

var dataForPatchSingle = JSON.stringify({
  "codigo": "128",
//  "nombre": "ZcZXc",
//  "tipo": "_05",
//  "ruc_cedula": "1234",
//  "email": "ZXcZXc@hjh.com",
//  "distribuidor": "no",
//  "retencion": "no",
//  "direccion": "ZXcZXc",
  "permissions": "{ \"Invoice\": 1, \"Example\": 1 }"
});

function patchInvoice(_parms) {
  LG(DBG, 'patchInvoice', '_parms', _parms);
  LG(INF, 'patchInvoice', '_parms', _parms.data);
  var spec = getInvoicesSheet();
  var firstDataRow = spec.dimensions.body[0];
  var firstBlankRow = spec.dimensions.firstBlankRow;
  var numberOfColumns = spec.dimensions.body[3];
  var columnsByName = spec.dimensions.meta.columnsByName;
  var columnWithInvoiceId = spec.dimensions.idColumn;
  var dataForNewRow = JSON.parse(_parms.data);
  var invoiceID = dataForNewRow.codigo;
  LG(DBG, 'patchInvoice', 'invoice id', invoiceID);

  LG(DBG, 'patchInvoice', 'meta ruc_cedula', spec.dimensions.meta.columnsByName.ruc_cedula);
  LG(DBG, 'patchInvoice', 'numberOfColumns', numberOfColumns);
  LG(DBG, 'patchInvoice', 'columnsByName', columnsByName);
  LG(DBG, 'patchInvoice', 'dataForNewRow', dataForNewRow);
  LG(DBG, 'patchInvoice', 'firstDataRow', firstDataRow);
  LG(DBG, 'patchInvoice', 'columnWithInvoiceId', columnWithInvoiceId);
  LG(DBG, 'patchInvoice', 'firstBlankRow', firstBlankRow);
  LG(DBG, 'patchInvoice', 'count of data rows', firstBlankRow - firstDataRow);

  var rngInvoiceIDs = spec.sheet.getRange(firstDataRow, columnWithInvoiceId, firstBlankRow - firstDataRow, 1);
  var invoiceIDs = rngInvoiceIDs.getValues();

  var ix = 0;
  while (ix < invoiceIDs.length && invoiceIDs[ix][0] != invoiceID) {
    ix++;
  }
  LG(DBG, 'patchInvoice', 'will patch row # ' + (firstDataRow + ix), ' for invoice ' + invoiceIDs[ix][0] );
  var rngUpdateRow = spec.sheet.getRange(firstDataRow + ix, 1, 1, numberOfColumns);
  var updateRow = rngUpdateRow.getValues();
  LG(DBG, 'patchInvoice', 'will patch user ', updateRow[0][columnsByName.nombre - 1] + '.');
  for (col in dataForNewRow) {
    var cell = spec.sheet.getRange(firstDataRow + ix, [columnsByName[col]], 1, 1);
    var value = cell.getValues();
    LG(DBG, 'patchInvoice', 'Will replace data element : ' + col, 'Old: ' + value + ' ===> New: ' + dataForNewRow[col]);
    value[0][0] = dataForNewRow[col];
    cell.setValues(value);
//    updateRow[0][columnsByName[col] - 1] = dataForNewRow[col]
  }
//  rngUpdateRow.setValues(updateRow);



  return { itemID: invoiceID };
};


function testPatchSingle() {
  clearLog();
  var parameters = JSON.stringify(paramsForPatchSingle);
  LG(INF, 'testPatchSingle', 'parameters', parameters );
  var ciphertext = Tea.encrypt(parameters, PropertiesService.getScriptProperties().getProperty('secret'));
  LG(TRC, 'testPatchSingle', 'ciphertext', ciphertext );
  var urltext = encodeURIComponent(ciphertext);
  LG(TRC, 'testPatchSingle', 'encoded ciphertext', urltext );

  var pyld = payload;
  pyld.parameter = { q: urltext };
  pyld.postData = { contents: dataForPatchSingle };
  pyld.postData.length = 999;

  LG(DBG, 'testPatchSingle', 'payload', JSON.stringify(pyld) );
  LG(INF, 'testPatchSingle', 'response', doPost(pyld).getContent() );
};

function postInvoice(_parms) {
  LG(INF, 'postInvoice', '_parms', _parms);
  var spec = getInvoicesSheet();
  var firstBlankRow = spec.dimensions.firstBlankRow;
  var numberOfColumns = spec.dimensions.body[3];
  var columnsByName = spec.dimensions.meta.columnsByName;
  var columnWithInvoiceId = spec.dimensions.idColumn;
  var dataForNewRow = JSON.parse(_parms.data);

  LG(DBG, 'postInvoice', 'meta ruc_cedula', spec.dimensions.meta.columnsByName.ruc_cedula);
  LG(DBG, 'postInvoice', 'firstBlankRow', firstBlankRow);
  LG(DBG, 'postInvoice', 'numberOfColumns', numberOfColumns);
  LG(DBG, 'postInvoice', 'columnWithInvoiceId', columnWithInvoiceId);
  LG(DBG, 'postInvoice', 'dataForNewRow', dataForNewRow);

  var newRowID = 1 + spec.sheet.getRange(firstBlankRow - 1, 1, 1, numberOfColumns).getValues()[0][columnWithInvoiceId - 1];
  spec.sheet.insertRowAfter(firstBlankRow - 1);
  var newRowRange = spec.sheet.getRange(firstBlankRow, 1, 1, numberOfColumns);
  var newRowRangeValues = newRowRange.getValues();
  var newRow = newRowRangeValues[0];

  for (col in newRow) { newRow[col] = null };

  for (column in columnsByName) {
    LG(DBG, 'postInvoice', 'columnsByName[' + column + ']', columnsByName[column]);
    var mustBeString = ! metaRanges[INVOICE][RIGHT_JUSTIFY].getValues()[0][columnsByName[column] - 1];
    LG(DBG, 'postInvoice', 'mustBeString', mustBeString);
    LG(DBG, 'postInvoice', columnsByName[column], mustBeString + ' :: ' + dataForNewRow[column]);
    LG(TRC, 'postInvoice', column + ' / ' + columnsByName[column], dataForNewRow[column]);
    LG(TRC, 'postInvoice', column, spec.dimensions.meta.columnsByName[column]);
    var newCellVal = '';
    if(dataForNewRow[column]) {
      newCellVal = mustBeString ? "" + dataForNewRow[column].toString() : dataForNewRow[column];
    }
    newRow[ columnsByName[column] - 1 ] = newCellVal;
  };

  newRow[columnWithInvoiceId - 1] = newRowID;

  for (col in newRow) {
    LG(DBG, 'postInvoice', 'newRow col ' + col, newRow[col]);
  };

  newRowRangeValues[0] = newRow;
  newRowRange.setValues(newRowRangeValues);

  return { itemID: newRowID };
};


//var rngTitlesCells = null;
//var firstBlankLineFlagColumn = null;
function listInvoices(_parms) {
  LG(INF, 'listInvoices', '_parms', _parms);
  var idSheet = PropertiesService.getScriptProperties().getProperty('active');
  var ss = SpreadsheetApp.openById(idSheet);
  var sheet = ss.getSheetByName(INVOICE_SHEET);
  getNamedRanges(sheet, INVOICE);
//  LG(INF, 'listInvoices', 'metaRanges', metaRanges[INVOICE][COLUMN_TITLES].getSheet() );
//  rngTitlesCells = metaRanges[INVOICE].COLUMN_TITLES;
//  firstBlankLineFlagColumn = getFirstBlankLineFlagColumn(sheet);
  var dimensions = dimensionSheet(sheet, INVOICE, 'r');
  LG(DBG, 'listInvoices', 'dimensions', JSON.stringify(dimensions) );
//  LG(INF, 'listInvoices', 'data rows', dimensions.body[2] );
//  var paged = validParms(parms, dimensions.body[0], dimensions.firstBlankRow -1);
  var paged = validParms(_parms, dimensions);

  var source_page = sheet.getRange(paged.start, 1, paged.size, sheet.getMaxColumns());
  var source_data = source_page.getValues();

  var ret = new Array();
  var titles = new Array();
  for(var ixr = 0; ixr < source_data.length; ixr += 1 ) {
    var row = new Array();
    for(var ixc = 0; ixc < dimensions.titles.length; ixc += 1 ) {
      if (ixr == 1) titles.push(dimensions.titles[ixc][1]);
      var col = dimensions.titles[ixc][0] - 1;
      var cell = source_data[ixr][col];
//      if( col == 1 ) LG(INF, 'listInvoices', 'col / cell', col + ' / ' + cell );
      row.push(cell);
    }
    ret.push(row);
  }
  var payload = {};
  payload[paged.store] = { data: ret, titles: titles, meta: dimensions.meta.columns, enums: dimensions.meta.enums };

  LG(DBG, 'listInvoices', 'payload', JSON.stringify(payload, null, 2) );
  return payload;
//  return { invoices: { titles: titles, data: ret } };
};


//var rngTitlesCells = null;
//var firstBlankLineFlagColumn = null;
function getInvoice(_parms) {
  LG(DBG, 'getInvoice', '_parms', _parms);
  var idSheet = PropertiesService.getScriptProperties().getProperty('active');
  LG(TRC, 'getInvoice', 'A', 0);
  var ss = SpreadsheetApp.openById(idSheet);
  LG(TRC, 'getInvoice', 'B', 0);
  var sheet = ss.getSheetByName(INVOICE_SHEET);
  LG(TRC, 'getInvoice', 'C', 0);
  getNamedRanges(sheet, INVOICE);
  LG(TRC, 'getInvoice', 'D', 0);
//  LG(INF, 'getInvoice', "metaRanges[INVOICE]['" + COLUMN_TITLES +  "']" , metaRanges[INVOICE][COLUMN_TITLES].getSheet() );
//  rngTitlesCells = metaRanges[INVOICE].COLUMN_TITLES;
//  firstBlankLineFlagColumn = getFirstBlankLineFlagColumn(sheet);
  var dimensions = dimensionSheet(sheet, INVOICE);
  LG(DBG, 'getInvoice', 'dimensions', JSON.stringify(dimensions) );
  LG(DBG, 'getInvoice', 'data rows', dimensions.body[2] );
//  var paged = validParms(parms, dimensions.body[0], dimensions.firstBlankRow -1);
  var paged = validParms(_parms, dimensions);
  var rr = paged.start;
  var sh = dimensions.body[2];
  var sw = sheet.getMaxColumns();
  var source_page = sheet.getRange(rr, 1, sh, sw);

  LG(TRC, 'getInvoice', 'source_page', paged.start );
  var source_data = source_page.getValues();
  LG(TRC, 'getInvoice', 'source_data', 0 );

  var ret = {};
  var titles = new Array();
  loopRows:
  for(var ixr = 0; ixr < source_data.length; ixr += 1 ) {
    var found = source_data[ixr][dimensions.idColumn - 1].toString();
//    LG(INF, 'getInvoice', 'row (' + ixr + ') val ' + _parms.id, found );
    if(found === _parms.id) {
      var row = new Array();
      for(var ixc = 0; ixc < dimensions.titles.length; ixc += 1 ) {
        titles.push(dimensions.titles[ixc][1]);
        var col = dimensions.titles[ixc][0] - 1;
        var cell = source_data[ixr][col];
        //      if( col == 1 ) LG(INF, 'getInvoice', 'col / cell', col + ' / ' + cell );
        row.push(cell);
      }
      ret = row;
      break loopRows;
    }
  }
  LG(TRC, 'getInvoice', 'ret', ret[3] );
  LG(TRC, 'getInvoice', 'titles', titles[3] );
  LG(TRC, 'getInvoice', 'paged.store', _parms.store );
  var payload = {};
  payload[_parms.store] = { data: ret, titles: titles };

  LG(DBG, 'getInvoice', 'payload', JSON.stringify(payload) );
  return payload;
//  return { invoices: { titles: titles, data: ret } };
};


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ testGetList ~~~~~~~~~~~~~~~~~~~~ */
var dataForGetInvoicePrivilege = {
  store: INVOICE,
  mode: GET,
  email: 'water.iridium.blue@gmail.com',
//  email: 'dude.awap@gmail.com',
}


function testGetInvoicePrivileges(_parms) {
  clearLog();
  var parameters = JSON.stringify(dataForGetInvoicePrivilege);
  LG(INF, 'testGetInvoicePrivileges', 'parameters', parameters );
  var ciphertext = Tea.encrypt(parameters, PropertiesService.getScriptProperties().getProperty('secret'));
  LG(TRC, 'testGetInvoicePrivileges', 'ciphertext', ciphertext );
  var urltext = encodeURIComponent(ciphertext);
  LG(TRC, 'testGetInvoicePrivileges', 'encoded ciphertext', urltext );


  var pyld = payload;
  pyld.parameter = { q: urltext };

  LG(DBG, 'testGetList', 'payload', JSON.stringify(pyld) );
  LG(INF, 'testGetList', 'response', doGet(pyld).getContent() );

};

function getInvoicePrivileges(_parms) {
  LG(INF, 'getInvoicePrivileges', '_parms', _parms);
  var idSheet = PropertiesService.getScriptProperties().getProperty('active');
  var ss = SpreadsheetApp.openById(idSheet);
  var sheet = ss.getSheetByName(INVOICE_SHEET);
  getNamedRanges(sheet, INVOICE);

  var result = getPermissionsByEmail( _parms.email, getEmailIndex(sheet));

  if (result) {
    LG(INF, 'getInvoicePrivileges', GET, result);
    LG(INF, 'getInvoicePrivileges', GET, result.permissions);
    return result;
  }
  result = JSON.parse('{"codigo":-1,"permissions":"{\'Example\':0,\'Invoice\':0}"}');
  LG(INF, 'getInvoicePrivileges', GET, result);
  LG(INF, 'getInvoicePrivileges', GET, result.permissions);
  return result;
};



function listInvoices2() {
  var res = 'listInvoice2() NOT IMPLEMENTED';
  LG(INF, 'invoicesMap', LIST, res);
  return res;
};

function dropInvoice() {
  var res = 'dropInvoice() NOT IMPLEMENTED';
  LG(INF, 'invoicesMap', DELETE, res);
  return res;
};

var invoicesMap = {};
invoicesMap[GET] = getInvoicePrivileges;
invoicesMap[PATCH] = patchInvoice;
invoicesMap[POST] = postInvoice;
invoicesMap[LIST] = listInvoices;
invoicesMap[DELETE] = dropInvoice;
