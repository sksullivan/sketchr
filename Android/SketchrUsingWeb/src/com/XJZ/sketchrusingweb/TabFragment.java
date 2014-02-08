package com.XJZ.sketchrusingweb;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class TabFragment extends Fragment {
	
	private int index;
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		Bundle data = getArguments();
		
		index = data.getInt("idx");
	}
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
					Bundle savedInstanceState) {
		
		View v = null;
		
		if (index == 0) {
			v = inflater.inflate(R.layout.fragment_web, null);
		
			WebView webview = (WebView)v.findViewById(R.id.webView);
	
			webview.setWebViewClient(new WebViewClient());
			WebSettings websettings = webview.getSettings();
			websettings.setJavaScriptEnabled(true);
			websettings.setBuiltInZoomControls(false);
			websettings.setSupportZoom(false);
			websettings.setAllowFileAccess(true);
			websettings.setDomStorageEnabled(true);
        
			webview.loadUrl("http://google.com");
		} else if (index == 1) {
			v = inflater.inflate(R.layout.fragment_camera, null);
		}
        
        return v;
	}

}
