// KJZ Time Tracker -- Google Apps Script
// Sheet columns: SESSION | DATE | TAG | USER | TIME IN | TIME OUT | DURATION
// Deploy: Web App, Execute as Me, Access: Anyone

function doGet(e) {
  var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var uid     = (e.parameter.uid     || "").trim();
  var user    = (e.parameter.user    || "").trim();
  var type    = (e.parameter.type    || "").trim().toUpperCase();
  var session = (e.parameter.session || "").trim();
  var date    = (e.parameter.date    || "").trim();
  var time    = (e.parameter.time    || "").trim();

  if (!uid || !session || !type) {
    return ContentService.createTextOutput("ERROR: missing uid, session, or type");
  }

  var data = sheet.getDataRange().getValues();

  // Find existing row by session UUID (column A)
  var existingRow = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === session) {
      existingRow = i + 1;
      break;
    }
  }

  if (type === "IN") {
    if (existingRow !== -1) {
      // Idempotent resend -- update TIME IN
      sheet.getRange(existingRow, 5).setValue(time);
      return ContentService.createTextOutput("IN_UPDATED");
    }
    sheet.appendRow([session, date, uid, user, time, "", ""]);
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 7).setFormula(
      '=IF(OR(F' + newRow + '="",E' + newRow + '=""),"",TEXT(F' + newRow + '-E' + newRow + ',"h:mm"))'
    );
    return ContentService.createTextOutput("IN");
  }

  if (type === "OUT") {
    if (existingRow === -1) {
      // No matching session -- create partial row
      sheet.appendRow([session, date, uid, user, "", time, ""]);
      return ContentService.createTextOutput("OUT_NO_SESSION");
    }
    // Idempotent resend -- update TIME OUT
    sheet.getRange(existingRow, 6).setValue(time);
    sheet.getRange(existingRow, 7).setFormula(
      '=IF(OR(F' + existingRow + '="",E' + existingRow + '=""),"",TEXT(F' + existingRow + '-E' + existingRow + ',"h:mm"))'
    );
    return ContentService.createTextOutput("OUT");
  }

  return ContentService.createTextOutput("ERROR: unknown type " + type);
}
