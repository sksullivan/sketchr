package com.XJZ.sketchrusingweb;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class SketchActivity extends Activity {
	
	WebView wv;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		 
		setContentView(R.layout.activity_web);

		WebView webview = (WebView) findViewById(R.id.webView);

		webview.setWebViewClient(new WebViewClient());
		WebSettings websettings = webview.getSettings();
		websettings.setJavaScriptEnabled(true);
		websettings.setBuiltInZoomControls(false);
		websettings.setSupportZoom(false);
		websettings.setAllowFileAccess(true);
		websettings.setDomStorageEnabled(true);

		webview.loadUrl("http://sketchr.herokuapp.com");
	}
}
