'use babel';

import { CompositeDisposable } from 'atom';
import https from 'https';
import querystring from 'querystring';
import url from 'url';
import shell from 'shell';

import config from './config.js';
import keys from './keys.js';

export default {

  subscriptions: null,
  config: config,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command to create pastes
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-pastebin-plus:upload-to-pastebin': () => this.createPaste()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  createPaste() {
    var text = this.getText();
    if (text === null) {
      atom.notifications.addError("Pastebin upload can only be done on an active text buffer.");
      return;
    }

    this.uploadToPastebin(text).then(function(u) {
      var detail = "";
      if (atom.config.get("atom-pastebin-plus.copy_paste_to_clipboard")) {
        detail += "Copied to clipboard\n";
        atom.clipboard.write(u);
      }
      if (atom.config.get("atom-pastebin-plus.open_paste_in_web_browser")) {
        detail += "Opened in web browser";
        shell.openExternal(u);
      }
      atom.notifications.addSuccess("Paste Created", { detail : detail });
    }, function(e) {
      atom.notifications.addError("Atom Pastebin Plus Error", { detail : e.message });
    });
  },

  // Get the content of a selection if the user made one.
  // Give the content of the active buffer otherwise.
  getText() {
    var editor = atom.workspace.getActiveTextEditor();
    if (editor === undefined) {
      return null;
    }
    var selections = editor.getSelections();
    var text = editor.getText();
    if (selections.length != 0 && !selections[0].isEmpty()) {
      text = selections[0].getText();
    }
    return text;
  },

  uploadToPastebin(content) {
    var postData = querystring.stringify({
      api_dev_key: keys.pastebin_dev_key,
      api_option: "paste",
      api_paste_code: content,
      api_paste_private: (atom.config.get("atom-pastebin-plus.visibility") === "public") ? 0 : 1,
      api_paste_expire_date: atom.config.get("atom-pastebin-plus.expire"),
    });

    var options = {
      hostname: 'pastebin.com',
      path: '/api/api_post.php',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postData.length
         }
    };

    return new Promise(function(resolve, reject) {
      const req = https.request(options, (res) => {
        res.setEncoding("utf8");
        res.on('data', (d) => {
          if (url.parse(d).hostname === null) {
            reject(Error(d));
          } else {
            resolve(d);
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });
      req.write(postData);
      req.end();
    });

  },

};
