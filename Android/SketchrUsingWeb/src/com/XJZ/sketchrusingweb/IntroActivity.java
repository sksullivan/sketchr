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
import android.graphics.drawable.Drawable;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class IntroActivity extends Activity implements OnClickListener {
	
	Context context = this;
	private static String uservalue;
	static Intent i;
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);
        
        //Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.);
        
        //String pathToPic = "/res/drawable/chicago.jpg";
        //Drawable pic = Drawable.createFromPath(pathToPic);
        
        TextView titleView = (TextView)findViewById(R.id.title);
        titleView.setTextSize(40);
        
        Button buttonNew = (Button)findViewById(R.id.btnNew);
        //buttonNew.setBackgroundColor(color.holo_purple);
        buttonNew.setOnClickListener(this);
        
        Button buttonExisting = (Button)findViewById(R.id.btnExisting);
        
        ImageView background = (ImageView)findViewById(R.id.background);
        
        titleView.bringToFront();
        buttonNew.bringToFront();
        buttonExisting.bringToFront();
	}

	@Override
	public void onClick(View v) {
		
		switch (v.getId()) {
			case R.id.btnNew:
				AlertDialog.Builder alert = new AlertDialog.Builder(this);
				i = new Intent(this, MainActivity.class);

				Log.i("dialog", "hello!");
				
				alert.setTitle("New Case");
				alert.setMessage("Please name the case:");

				// Set an EditText view to get user input
				final EditText input = new EditText(this);
				alert.setView(input);

				alert.setPositiveButton("Enter", new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int whichButton) {
						uservalue = input.getText().toString();	
						i.putExtra("path", "" + uservalue);
						Log.i("dialog", uservalue);
						startActivity(i);
					}
				});

				alert.setNegativeButton("Cancel",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog, int whichButton) {
								// Canceled.
							}
						});

				alert.show();
				
				/*i = new Intent(this, MainActivity.class);
				
				getInputViaDialog();

				//addExtra onto Intent of current path
				//startActivity(i);*/
				break;
				
			case R.id.btnExisting:
				//make listView of existing cases
				
			}
		
	}
	
	private void getInputViaDialog() {
		AlertDialog.Builder alert = new AlertDialog.Builder(this);
		final String value;

		Log.i("dialog", "hello!");
		
		alert.setTitle("New Case");
		alert.setMessage("Please name the case:");

		// Set an EditText view to get user input
		final EditText input = new EditText(this);
		alert.setView(input);

		alert.setPositiveButton("Enter", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int whichButton) {
				//uservalue = input.getText().toString();
				
			}
		});

		alert.setNegativeButton("Cancel",
				new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int whichButton) {
						// Canceled.
					}
				});

		alert.show();
	}
}
