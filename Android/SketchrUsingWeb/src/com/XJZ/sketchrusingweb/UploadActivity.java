package com.XJZ.sketchrusingweb;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class UploadActivity extends Activity implements OnClickListener {
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);
        
        Button btnViewSketch = (Button)findViewById(R.id.btnViewSketch);
        btnViewSketch.setOnClickListener(this);
        
        Button btnViewVoice = (Button)findViewById(R.id.btnViewVoice);
        btnViewVoice.setOnClickListener(this);
        
        Button btnViewImage = (Button)findViewById(R.id.btnViewImage);
        btnViewImage.setOnClickListener(this);        
	}

	@Override
	public void onClick(View v) {
		Intent i;
		
		switch (v.getId()) {
			case R.id.btnViewSketch:
				i = new Intent(this, SketchActivity.class);

				startActivity(i);
				break;
				
			case R.id.btnViewVoice:
				
				break;
				
			case R.id.btnViewImage:
				
				break;
		}		
	}
}
