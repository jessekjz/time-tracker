# Time Tracker — Admin Guide

A staff time tracking system. Team members tap their RFID card or tag on the reader to clock in and out. Everything is logged automatically to a web dashboard and your Google Sheet.

---

## Table of Contents

- [First-Time Setup](#first-time-setup)
- [Opening the Dashboard](#opening-the-dashboard)
- [The Dashboard](#the-dashboard)
- [The Admin Panel](#the-admin-panel)
- [Managing Staff Tags](#managing-staff-tags)
- [Clocking In and Out](#clocking-in-and-out)
- [Force Closing a Session](#force-closing-a-session)
- [The Display and Lights](#the-display-and-lights)
- [The Button](#the-button)
- [Google Sheets](#google-sheets)
- [Changing Settings](#changing-settings)
- [Clearing Session History](#clearing-session-history)
- [Recovering Admin Access using Google Authenticator](#recovering-admin-access-using-google-authenticator)
- [Troubleshooting](#troubleshooting)

---

## First-Time Setup

### Step 1 — Power on the device

Plug the device in. The small screen will show **TIME TRACKER** followed by a series of startup messages. This takes about 10 seconds.

### Step 2 — Connect to the setup network

On first boot the device does not know your WiFi password. It creates its own temporary network so you can give it your details.

1. On your phone or laptop, open your WiFi settings
2. Connect to the network called **Time-Tracker-Setup**
3. A setup page should open in your browser automatically
4. If it does not open automatically, go to `http://192.168.4.1`
<img width="1179" height="2556" alt="IMG_2027" src="https://github.com/user-attachments/assets/6036d9be-9269-4794-8e95-cb0953c73a87" />


### Step 3 — Enter your WiFi details

1. Select your home or office WiFi network from the dropdown list
2. Type your WiFi password
3. Tap **Save and Connect**

The device will restart and connect to your network. This takes about 15 seconds.

### Step 4 — Find the device on your network

Once connected, the device screen will show the current time and date along with an IP address — something like `192.168.0.122`. Make a note of this.

On your phone or laptop (now back on your normal WiFi), open a browser and go to:

```
http://time-tracker.local
```

If that does not load, use the IP address shown on the device screen:

```
http://192.168.0.122
```

You should see the Time Tracker dashboard. Setup is complete.

> **Your WiFi details are saved on the device.** You will not need to repeat this process unless your WiFi password changes or you move the device to a new network. To reset WiFi: hold the button while plugging in the power cable to force setup mode again.

### Step 5 — Connect to Google Sheets

Before staff can start using the system, you need to connect it to your Google Sheet so sessions are recorded there. See the separate **Google Sheets Setup Guide** for full step-by-step instructions. See [Google Sheets Setup](https://github.com/jessekjz/time-tracker/blob/main/GOOGLE_SHEETS_SETUP.md)

### Step 6 — Register staff tags

Before anyone can clock in, their RFID card or tag must be registered with their name. See [Managing Staff Tags](#managing-staff-tags) below.

### Step 7 – Google Authenticator Setup to Reset Admin Password in case of Accidental Lockout

1. Open your web browser and navigate to the device's admin reset page by going to:

```
http://time-tracker.local/adminreset
```

Or using the IP address shown on the device screen, for example:

```
http://192.168.0.122/adminreset
```
<img width="686" height="894" alt="Screenshot 2026-05-11 at 13 16 02" src="https://github.com/user-attachments/assets/e95f329b-2794-4c15-85ea-0835f951f407" />

2. In the "Set up Google Authenticator" section, enter the current admin password.
   - Default - `admin123` *(change this ASAP — see [Changing Settings](#changing-settings))*
3. Click "Show QR Code" to reveal the QR code and secret key.
<img width="659" height="750" alt="Screenshot 2026-05-11 at 13 17 03" src="https://github.com/user-attachments/assets/64fe6b82-30b5-448e-b906-47faddf31321" />

4. Open the Google Authenticator app on your phone.
5. Tap the "+" icon in the app and select "Scan a QR code".
6. Scan the QR code displayed on the page.
7. The app will add the Time Tracker entry and start generating 6-digit codes every 30 seconds.
8. You will now be able to recover admin access using Google Authenticator.

You only need to set up Google Authenticator once. After setup, you can reset the password anytime using just the authenticator code.
Keep your Google Authenticator app secure, as it provides access to reset the admin password.
If you lose access to your authenticator app, you'll need physical access to the device to reset the password through other means.

---

## Opening the Dashboard

Once the device is set up, open the dashboard on any phone, tablet, or laptop on the same WiFi network:

```
http://time-tracker.local
```

Or using the IP address shown on the device screen, for example:

```
http://192.168.0.122
```

The dashboard works in any modern browser. You do not need to install anything.
<img width="945" height="592" alt="Screenshot 2026-05-11 at 13 12 49" src="https://github.com/user-attachments/assets/1bbd515d-9a50-4159-87a2-0a31cda254d1" />

---

## The Dashboard

The dashboard is the main view for monitoring attendance. It updates in real time — you do not need to refresh the page.

### Current time and date

Shown in large text in the top left. Updates every second.

### Last scan

Shows the most recent tag scan — who it was, whether they clocked in or out, and at what time. Updates instantly when a tag is tapped.

### Session log

A table of every clock-in and clock-out event. Each row shows one complete session:

| Column | What it shows |
|---|---|
| Name | The staff member's name |
| Date | The date of the session |
| In | What time they clocked in |
| Out | What time they clocked out — shows *open* if still clocked in |
| Duration | Time between clock-in and clock-out, calculated automatically |

The newest sessions always appear at the top.

### Filtering the log

Use the three buttons above the table:

- **All** — Shows every session
- **Open** — Only sessions where the person is still clocked in
- **Complete** — Only sessions that have both a clock-in and clock-out time

Type a name in the search box to filter by a specific staff member.

### Dark mode

The dashboard follows your device's dark or light mode setting automatically. You can toggle it manually in the Admin Panel — the choice is saved and remembered across page loads.

---

## The Admin Panel
<img width="946" height="708" alt="Screenshot 2026-05-11 at 13 12 31" src="https://github.com/user-attachments/assets/882581f1-8905-43bf-90b6-b79dc239d126" />

The admin panel is where you manage staff tags, settings, and deal with any session issues.

**Open it at:** `http://time-tracker.local/admin`

You will be prompted to log in:

- **Username:** `admin`
- **Password:** `admin123` *(change this — see [Changing Settings](#changing-settings))*

---

## Managing Staff Tags

Every staff member needs their own RFID card or key fob. These need to be registered in the system before they can be used.

### Registering a new tag

1. Go to the Admin Panel
2. Ask the staff member to tap their card or fob on the reader
<img width="3024" height="4032" alt="IMG_2022" src="https://github.com/user-attachments/assets/f3717277-aa09-44c5-b589-39835e74883a" />

3. The tag will appear at the top of the admin page under **Unregistered Tags**
<img width="944" height="557" alt="Screenshot 2026-05-11 at 13 13 20" src="https://github.com/user-attachments/assets/093149fc-989a-4a5e-8ac8-769a104314e0" />

4. Click **Register** next to it — the tag ID fills in automatically
5. Type the staff member's full name
<img width="942" height="702" alt="Screenshot 2026-05-11 at 13 13 47" src="https://github.com/user-attachments/assets/6d5b00f3-7302-41a0-afd1-0b1eaeebe97f" />

6. Click **Add Tag**

The tag is active immediately. No restart is needed.
<img width="941" height="545" alt="Screenshot 2026-05-11 at 13 14 00" src="https://github.com/user-attachments/assets/fe1d4ead-0660-41d2-bc08-6a973cccccbb" />

> If the Unregistered Tags section does not appear after the card is tapped, refresh the admin page. The section only shows if an unregistered tag has been scanned since the device last started.

### Removing a tag

1. Go to the Admin Panel
2. Find the person in the **Registered Tags** list
3. Click **Remove** and confirm

Removing a tag does not delete their history from the dashboard or Google Sheet. It only stops that card from being used for future scans.

---

## Clocking In and Out

Staff tap their card or fob on the black RFID reader. The system works out automatically whether it is a clock-in or clock-out based on their current status.

- Clocked out → tapping **clocks them in**
- Clocked in → tapping **clocks them out**
<img width="940" height="524" alt="Screenshot 2026-05-11 at 13 14 21" src="https://github.com/user-attachments/assets/9a43db4f-c2d8-40ba-9a91-bb1ee7089572" />

### Feedback when a card is tapped

| Screen shows | Lights | Meaning |
|---|---|---|
| Clock In + name + time | Green flash | Successfully clocked in |
| Clock Out + name + time | Green flash | Successfully clocked out |
| NEW TAG + card ID | Red flash | Card not registered — see an admin |
| MULTI-TAP | Red flash | Tapped too soon — wait 30 seconds |

### Audio cues

| Sound | Meaning |
|---|---|
| Two quick beeps going up in pitch | Successful scan |
| One long low tone | Card is not registered |
| Two low beeps repeated | Too soon — please wait |

---

## Force Closing a Session

If a staff member forgets to clock out, their session stays open until they tap their card again. You can close it manually from the **dashboard** without needing physical access to the device.
<img width="456" height="408" alt="Screenshot 2026-05-11 at 13 14 44" src="https://github.com/user-attachments/assets/91a4dc13-586f-45ad-869f-67beb157dafc" />

### Closing with the current time

1. Open the dashboard
2. Find the open session in the log — it shows *open* in the Out column
3. Click **Close Session** on that row
4. Enter the admin password when prompted
5. Click **Confirm** — the session closes using the current time as the clock-out time
6. The Google Sheet is updated automatically

### Closing with a specific time

If you know what time the person actually left, you can enter that instead:

1. Follow steps 1–3 above
2. When the confirmation dialog opens, switch from **Use current time** to **Enter a time**
3. Type the clock-out time in the field provided
<img width="460" height="519" alt="Screenshot 2026-05-11 at 13 14 55" src="https://github.com/user-attachments/assets/b9f1dffb-13f4-4602-abb3-e22318f31974" />

4. Enter the admin password
5. Click **Confirm**

The entered time is recorded in the dashboard and synced to your Google Sheet.
<img width="946" height="516" alt="Screenshot 2026-05-11 at 13 15 12" src="https://github.com/user-attachments/assets/21b44781-bf8e-4efa-bb23-aa4656ce8c04" />
<img width="828" height="370" alt="Screenshot 2026-05-11 at 13 15 19" src="https://github.com/user-attachments/assets/f65c2d38-4fa8-44e6-b2ac-cca32ed03926" />



> The admin password is required as a safety measure to prevent accidental or unauthorised session changes.

---

## The Display and Lights

### Screen messages

| Screen shows | Meaning |
|---|---|
| Large clock + date | Ready and waiting — no action needed |
| Clock In + name + time | Staff member just clocked in |
| Clock Out + name + time | Staff member just clocked out |
| NEW TAG + card ID | An unregistered card was tapped |
| MULTI-TAP / Please wait | Same card tapped too quickly — 30 second cooldown |
| SETUP + network name | Device is in WiFi setup mode |
| OTA Update | A software update is being installed wirelessly |

The screen turns off automatically after 30 seconds of no activity to protect the display. It wakes up automatically the next time a card is tapped.

### Lights

| Light | Meaning |
|---|---|
| Green flashes | Successful clock-in or clock-out |
| Red flashes | Error — unregistered card or tapped too recently |

---

## The Button

The small button on the device has three uses:

| Action | Result |
|---|---|
| Short press (screen off) | Wakes the screen for 30 seconds |
| Hold 2 seconds | Shows the WiFi network name and device IP address |
| Hold while plugging in power | Forces WiFi setup mode |

---

## Google Sheets

The device sends every clock-in and clock-out event to your Google Sheet automatically as it happens.

### What gets recorded

Each session produces one row with these columns:

| SESSION | DATE | TAG | USER | TIME IN | TIME OUT | DURATION |
|---|---|---|---|---|---|---|
| Unique ID | Date | Card UID | Name | Clock-in | Clock-out | Auto-calculated |

The row is created when someone clocks in, and the TIME OUT and DURATION are filled in when they clock out. Force-closing a session also updates these columns.

### If the connection fails

If the device cannot reach Google at the time of a scan, the data is saved locally on the device and retried automatically in the background. No data is lost.

To trigger an immediate retry, go to the Admin Panel and click **Force Sync**.

### Setting the Google Sheets connection

Go to Admin Panel → Settings and paste your Google Script URL into the field. If you need to set this up from scratch, follow the separate **Google Sheets Setup Guide**.

---

## Changing Settings

Open the Admin Panel and scroll to the **Settings** section.

### Changing the admin password
<img width="628" height="342" alt="Screenshot 2026-05-11 at 13 15 41" src="https://github.com/user-attachments/assets/4b9cd52d-af0f-41b8-860b-0249f1a8afff" />

1. Click the **Change Admin Password** button.
2. Enter and confirm the new password.
3. Click **Update Password**
<img width="450" height="301" alt="Screenshot 2026-05-11 at 13 15 47" src="https://github.com/user-attachments/assets/0c7d4b46-33ee-4bc0-a435-e2f1be6133f0" />


> Write your password down somewhere safe. There is no way to recover a forgotten password. You will need to either reset it via [Recovering Admin Access using Google Authenticator](#recovering-admin-access-using-google-authenticator) or contact the developer to reset it on site.

---

## Clearing Session History

You can wipe the session log from the dashboard without affecting your Google Sheet. Anything already synced to the sheet stays there.

> **This cannot be undone.**

1. Open the Admin Panel
2. Scroll to the **Danger Zone** section at the bottom
3. Click **Clear All Sessions**
4. Read the warning and confirm

Only the local session history on the device is deleted. Your Google Sheet data is unaffected.

---

## Recovering Admin Access using Google Authenticator
<img width="686" height="894" alt="Screenshot 2026-05-11 at 13 16 02" src="https://github.com/user-attachments/assets/850307f0-e1d8-4cd4-8ea7-7b8ff65ead5e" />

1. Open your web browser and navigate to the device's admin reset page by going to:

```
http://time-tracker.local/adminreset
```

Or using the IP address shown on the device screen, for example:

```
http://192.168.0.122/adminreset
```

2. Scroll to the "Reset Admin Password" section.
3. Enter the 6-digit code currently shown in your Google Authenticator app. You will need to be quick, this code changes every 30 seconds. It may be better to wait for a new code if the current code is close to timing out.
4. Enter your new desired admin password.
5. Re-enter the same password in the "Confirm new password" field.
6. Click "Reset Password".
7. If successful, you'll be redirected back to the admin page with the new password active.

---

## Troubleshooting

### The screen is blank

Press the button once to wake it. The screen switches off automatically after 30 seconds of inactivity — this is normal.

### The screen shows "TIME TRACKER / Starting up..." for a long time

Normal boot takes about 10 seconds. If it is stuck longer than 30 seconds, unplug and re-plug the power. If it keeps happening, contact your technical administrator.

### I cannot open the dashboard

- Make sure your phone or laptop is connected to the same WiFi network as the device
- Hold the button for 2 seconds — the screen will show the IP address. Type that directly into your browser, e.g. `http://192.168.0.122`
- If the screen is blank, press the button once first to wake it

### A card scans with the wrong name

The card is registered to a different person. Go to Admin Panel → Registered Tags, click **Remove** next to the wrong name, then re-register the card with the correct name.

### A card does nothing when tapped

- Check the card is registered. Unregistered cards show **NEW TAG** on screen — they do not clock anyone in or out
- Hold the card flat and close to the reader (within a few centimetres)
- If **MULTI-TAP** appears, wait 30 seconds before trying again

### Sessions are not appearing in Google Sheets

- Go to Admin Panel → Settings and confirm the Google Script URL is correct
- Click **Force Sync** in the Admin Panel to retry immediately
- If it still does not work, see the **Google Sheets Setup Guide** to check your Apps Script deployment is still active

### A staff member forgot to clock out

See [Force Closing a Session](#force-closing-a-session) above.

### The device will not connect to WiFi

Hold the button while plugging in the power cable to enter setup mode. Re-enter your WiFi credentials. Make sure your network is 2.4 GHz — the device does not support 5 GHz networks.
