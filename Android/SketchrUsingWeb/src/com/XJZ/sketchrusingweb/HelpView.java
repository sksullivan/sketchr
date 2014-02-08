package com.XJZ.sketchrusingweb;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class HelpView extends Activity {
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_help);
        
        TextView tv = (TextView)findViewById(R.id.textView1);
        tv.setText("You are being helped");    
        

	}
}
