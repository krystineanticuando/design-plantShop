import { NativeScriptConfig } from '@nativescript/core';

export default {
  //id: 'org.nativescript.plantshop',
  id: 'com.plantshop.design_proj',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;