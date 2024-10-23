import { Observable, Application, Utils } from '@nativescript/core';

export class ClipboardHistoryModel extends Observable {
  private _clipboardHistory: string[] = [];
  private _maxHistoryItems = 20;

  constructor() {
    super();
    this.startClipboardMonitoring();
  }

  private startClipboardMonitoring() {
    if (global.isIOS || global.isMacOS) {
      const pasteboard = Utils.ios.getter(UIPasteboard, UIPasteboard.generalPasteboard);
      
      Application.on(Application.resumeEvent, () => {
        const text = pasteboard.string;
        if (text && !this._clipboardHistory.includes(text)) {
          this._clipboardHistory.unshift(text);
          if (this._clipboardHistory.length > this._maxHistoryItems) {
            this._clipboardHistory.pop();
          }
          this.notifyPropertyChange('clipboardHistory', this._clipboardHistory);
        }
      });
    }
  }

  get clipboardHistory(): string[] {
    return this._clipboardHistory;
  }

  copyToClipboard(text: string) {
    if (global.isIOS || global.isMacOS) {
      const pasteboard = Utils.ios.getter(UIPasteboard, UIPasteboard.generalPasteboard);
      pasteboard.string = text;
    }
  }

  clearHistory() {
    this._clipboardHistory = [];
    this.notifyPropertyChange('clipboardHistory', this._clipboardHistory);
  }
}