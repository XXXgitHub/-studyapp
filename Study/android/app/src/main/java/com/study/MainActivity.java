package com.study;

import android.os.Bundle;
import android.view.KeyEvent;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Study";
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(BuildConfig.dev_mode){
            if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN){
                getReactInstanceManager().showDevOptionsDialog();
                return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }
}
