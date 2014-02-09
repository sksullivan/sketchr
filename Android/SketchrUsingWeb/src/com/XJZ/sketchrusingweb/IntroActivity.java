package com.XJZ.sketchrusingweb;

import android.R.color;
import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class IntroActivity extends Activity implements OnClickListener {
	
	Context context = this;
	private static String uservalue;
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);
        
        TextView titleView = (TextView)findViewById(R.id.title);
        titleView.setTextSize(40);
        
        Button btnSketch = (Button)findViewById(R.id.btnSketch);
        btnSketch.setOnClickListener(this);
        
        Button btnVoice = (Button)findViewById(R.id.btnVoice);
        btnVoice.setOnClickListener(this);
        
        Button btnCamera = (Button)findViewById(R.id.btnCamera);
        btnCamera.setOnClickListener(this);
        
        Button btnProfile = (Button)findViewById(R.id.btnProfile);
        btnProfile.setOnClickListener(this);
        
        Button btnUpload = (Button)findViewById(R.id.btnUpload);
        btnUpload.setOnClickListener(this);
	}


	@Override
	public void onClick(View v) {
		Intent i;
		
		switch(v.getId()) {
			case R.id.btnSketch:
				i = new Intent(this, SketchActivity.class);
				
				startActivity(i);
				break;
				
			case R.id.btnVoice:
				i = new Intent(this, VoiceActivity.class);
				startActivity(i);
				break;
				
			case R.id.btnCamera:
				i = new Intent(this, CameraActivity.class);
				startActivity(i);
				break;
				
			case R.id.btnProfile:
				i = new Intent(this, ProfileActivity.class);
				startActivity(i);
				break;
				
			case R.id.btnUpload:
				i = new Intent(this, UploadActivity.class);
				
				startActivity(i);
				break;
		}
		
	}
}
