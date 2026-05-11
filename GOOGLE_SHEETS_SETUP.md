# Google Sheets Setup Guide

This guide walks you through connecting the Time Tracker to Google Sheets so that every clock-in and clock-out is recorded automatically.

You will need a Google account. The whole process takes about 10 minutes.

---

## Table of Contents

- [Step 1 — Create the Google Sheet](#step-1--create-the-google-sheet)
- [Step 2 — Open Apps Script](#step-2--open-apps-script)
- [Step 3 — Paste the Script](#step-3--paste-the-script)
- [Step 4 — Deploy the Script](#step-4--deploy-the-script)
- [Step 5 — Copy the Deployment URL](#step-5--copy-the-deployment-url)
- [Step 6 — Paste the URL into the Device](#step-6--paste-the-url-into-the-device)
- [Step 7 — Test the Connection](#step-7--test-the-connection)
- [Understanding Your Sheet](#understanding-your-sheet)
- [Redeploying After Changes](#redeploying-after-changes)
- [Troubleshooting](#troubleshooting)

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and sign in with your Google account
2. Click the large **+** button to create a new blank spreadsheet
3. Give it a name — something like **Time Tracker** — by clicking on "Untitled spreadsheet" at the top left

### Set up the column headers

Click on cell **A1** and type the following headers across the first row, one per cell:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| SESSION | DATE | TAG | USER | TIME IN | TIME OUT | DURATION |

These column names must be exactly as shown. The script uses the column positions to fill in data correctly.

Your sheet should look like this when the headers are in place:

```
A1: SESSION
B1: DATE
C1: TAG
D1: USER
E1: TIME IN
F1: TIME OUT
G1: DURATION
```

> **Important:** Make sure the sheet tab at the bottom is called **Sheet1**. If it says something else (like "Sheet2"), either rename it by double-clicking the tab, or you will need to update the script in Step 3.

---

## Step 2 — Open Apps Script

Apps Script is Google's built-in scripting tool. It runs on Google's servers and acts as a bridge between the Time Tracker device and your sheet.

1. With your sheet open, click **Extensions** in the top menu bar
2. Click **Apps Script**

A new browser tab opens showing the Apps Script editor. You will see a function called `myFunction` — you can ignore or delete this.

---

## Step 3 — Paste the Script

1. Select all the existing code in the editor (click inside it and press **Ctrl+A** on Windows or **Cmd+A** on Mac)
2. Delete it
3. Open the file called `google_script.js` that came with your Time Tracker. [Latest version available here](https://raw.githubusercontent.com/jessekjz/time-tracker/refs/heads/main/google_script.js)
4. Copy the entire contents of that file
5. Paste it into the Apps Script editor

The script will look something like this when pasted:

```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  // ... rest of the script
}
```

6. Click the **Save** icon (or press **Ctrl+S** / **Cmd+S**)

The script is now saved but not yet active. You need to deploy it in the next step.

---

## Step 4 — Deploy the Script

This step makes the script accessible over the internet so the device can send data to it.

1. In the Apps Script editor, click the blue **Deploy** button in the top right corner
2. Select **New deployment** from the dropdown

A dialog box opens.

3. Click the gear icon next to **Select type** and choose **Web app**

You will see two settings to configure:

**Execute as:** Select **Me** (your Google account). This means the script runs with your permissions and can write to your sheet.

**Who has access:** Select **Anyone**. This allows the Time Tracker device to send data without needing to log in. The URL is long and not publicly listed, so this is safe.

4. Click **Deploy**

5. Google will ask you to authorise the script the first time. Click **Authorise access**.

6. A window appears asking you to choose a Google account — select the account you are using for this sheet.

7. You may see a warning that says **"Google hasn't verified this app"**. This is normal for personal scripts. Click **Advanced** at the bottom left, then click **Go to [your project name] (unsafe)**. It is safe — this is your own script.

8. Click **Allow** to grant the script permission to edit your spreadsheet.

---

## Step 5 — Copy the Deployment URL

After authorising, a confirmation screen appears showing your deployment details.

Under **Web app**, there is a **URL** that looks something like:

```
https://script.google.com/macros/s/AKfycb.../exec
```

**Copy this URL.** You will need it in the next step.

> **Save this URL somewhere safe** — in a notes app, email it to yourself, or write it down. If you lose it you can find it again by going to Deploy → Manage deployments in the Apps Script editor.

Click **Done** to close the dialog.

---

## Step 6 — Paste the URL into the Device

Now tell the Time Tracker device where to send its data.

1. Open the Admin Panel at `http://time-tracker.local/admin` (or your device IP)
2. Log in with your admin password
3. Scroll to the **Settings** section
4. Paste the URL into the **Google Script URL** field
5. Click **Save Settings**

A confirmation message will appear. The device is now connected to your Google Sheet.

---

## Step 7 — Test the Connection

To confirm everything is working:

1. Tap a registered RFID card on the reader to clock someone in
2. Wait a few seconds
3. Open your Google Sheet

You should see a new row appear with the session ID, date, tag UID, name, and clock-in time. The TIME OUT and DURATION columns will be empty until the person clocks out.

Tap the same card again to clock out. The sheet should update that row with the clock-out time and a calculated duration.

If nothing appears, see [Troubleshooting](#troubleshooting) below.

---

## Understanding Your Sheet

### Each row is one session

Every clock-in creates a new row. The clock-out fills in the same row. The system uses the **SESSION** column (a unique ID) to match them together.

| Column | When it is filled in |
|---|---|
| SESSION | At clock-in |
| DATE | At clock-in |
| TAG | At clock-in |
| USER | At clock-in |
| TIME IN | At clock-in |
| TIME OUT | At clock-out or force-close |
| DURATION | At clock-out or force-close |

### Duration formula

The DURATION column uses a formula that calculates the time between TIME IN and TIME OUT. It displays the result as hours and minutes (e.g. `2:30` for two and a half hours).

If a row shows no duration, it either means the session is still open (the person is still clocked in), or the clock-out has not yet synced.

### Duplicate prevention

If the same event is sent twice (for example, because the device retried after a connection failure), the script checks the SESSION ID first. If a row with that ID already exists, it updates the existing row rather than adding a duplicate. You will not end up with two rows for the same session.

### Force-closed sessions

When you force-close a session from the dashboard, the script fills in the TIME OUT column on the existing row, the same as a normal clock-out. The SESSION ID ensures it updates the correct row.

---

## Redeploying After Changes

If you ever need to update the Apps Script (for example, if you receive an updated `google_script.js` file), you must redeploy it as a **new version** — otherwise Google continues running the old version.

1. Open the Apps Script editor (Extensions → Apps Script in your sheet)
2. Delete the old code and paste the new code
3. Click **Save**
4. Click **Deploy → Manage deployments**
5. Click the pencil (edit) icon next to your existing deployment
6. Under **Version**, select **New version** from the dropdown
7. Click **Deploy**

The URL stays the same — you do not need to update the device.

> **This is the most common reason the sheet stops receiving data after an update.** Always redeploy as a new version, not just save the script.

---

## Troubleshooting

### Nothing appears in the sheet after a scan

**Check the URL is saved on the device:**
Go to Admin Panel → Settings and confirm the Google Script URL field is filled in. If it is empty, paste your deployment URL and click Save Settings.

**Check the deployment is active:**
In Apps Script, go to Deploy → Manage deployments. Check that your deployment shows as active and the access is set to "Anyone".

**Check your sheet name:**
The script looks for a sheet tab called **Sheet1**. If your tab has a different name, open Apps Script, find the line that says `getSheetByName("Sheet1")`, and change `Sheet1` to match your actual tab name. Then redeploy.

**Try forcing a sync:**
Go to Admin Panel → Force Sync. This tells the device to retry any pending events immediately.

### The sheet shows data in the wrong columns

The script fills columns in order: A through G. If your headers are in the wrong order or you have extra columns, the data will land in the wrong place. Double-check your headers match exactly:

```
A=SESSION  B=DATE  C=TAG  D=USER  E=TIME IN  F=TIME OUT  G=DURATION
```

### I see "Google hasn't verified this app" and cannot proceed

This is expected for personal scripts. Click **Advanced** (bottom left of the warning), then **Go to [project name] (unsafe)**. This is your own script and is safe to authorise.

### The script stopped working after I edited it

You may have saved the changes but not redeployed. In Apps Script, go to Deploy → Manage deployments, edit the existing deployment, select **New version**, and click Deploy. See [Redeploying After Changes](#redeploying-after-changes) above.

### I lost the deployment URL

In the Apps Script editor, go to **Deploy → Manage deployments**. Your URL is listed there under the Web App section. Copy it and paste it back into the device settings.

### The DURATION column shows an error or is blank

If a session was force-closed or if the TIME IN or TIME OUT values are in an unexpected format, the formula may not calculate correctly. You can manually type a duration, or delete the cell and re-enter it as a plain number (hours as a decimal, e.g. `2.5` for two and a half hours).

### I want to use a different Google account

The script runs under whichever account was used to authorise it in Step 4. If you need to change accounts, go to Apps Script, click **Deploy → Manage deployments**, delete the existing deployment, and create a new one while signed in to the correct account. Copy the new URL and update it in the device settings.
