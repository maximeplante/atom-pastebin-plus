'use babel';

export default {
    visibility: {
      type: "string",
      default: "unlisted",
      title: "Paste Visibility",
      description: "Visibility of the created pastes",
      enum: [
        {value: "public", description: "Public"},
        {value: "unlisted", description: "Unlisted"}
      ],
      order: 0,
    },
    expire: {
      type: "string",
      default: "1H",
      title: "Paste Expiration Delay",
      description: "How long should the pastes remain active",
      enum: [
        {value: "N", description: "Never"},
        {value: "10M", description: "10 Minutes"},
        {value: "1H", description: "1 Hour"},
        {value: "1D", description: "1 Day"},
        {value: "1W", description: "1 Week"},
        {value: "2W", description: "2 Weeks"},
        {value: "1M", description: "1 Month"},
        {value: "6M", description: "6 Months"},
        {value: "1Y", description: "1 Year"},
      ],
      order: 1,
    },
    copy_paste_to_clipboard: {
      type: "boolean",
      default: true,
      title: "Copy to Clipboard",
      description: "Copy the URL of the new paste in the clipboard",
      order: 2,
    },
    open_paste_in_web_browser: {
      type: "boolean",
      default: true,
      title: "Open in Web Browser",
      description: "Open the URL of the new paste in the default web browser",
      order: 3,
    }
  };
