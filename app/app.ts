import { Application } from '@nativescript/core';

// Configure the app to show in the menu bar
if (global.isMacOS) {
  Application.setSystemAppearance('dark');
  Application.run({ 
    moduleName: 'app-root',
    windowOptions: {
      frame: 'menu-bar',
      width: 300,
      height: 400
    }
  });
} else {
  Application.run({ moduleName: 'app-root' });
}