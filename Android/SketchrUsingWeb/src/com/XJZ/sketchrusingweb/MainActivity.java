package com.XJZ.sketchrusingweb;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebView webview = new WebView(this);
        webview.setWebViewClient(new WebViewClient());
        WebSettings websettings = webview.getSettings();
        websettings.setJavaScriptEnabled(true);
        
        setContentView(webview);
        
        webview.loadUrl("http://google.com");
    }
    
    //private 


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
}
