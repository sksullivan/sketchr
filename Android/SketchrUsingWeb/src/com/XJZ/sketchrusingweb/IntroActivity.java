package com.XJZ.sketchrusingweb;

import android.R.color;
import android.app.ActionBar;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class IntroActivity extends Activity implements OnClickListener {
	
	Context context = this;
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);
        
        TextView titleView = (TextView)findViewById(R.id.title);
        titleView.setTextSize(50);
        
        Button buttonNew = (Button)findViewById(R.id.btnNew);
        //buttonNew.setBackgroundColor(color.holo_purple);
        buttonNew.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		Intent i;
		
		switch (v.getId()) {
			case R.id.btnNew:
				//set new path via dialog
				i = new Intent(this, MainActivity.class);
				//addExtra onto Intent of current path
				startActivity(i);
				break;
				
			case R.id.btnExisting:
				//make listView of existing cases
				
			}
		
	}
}
