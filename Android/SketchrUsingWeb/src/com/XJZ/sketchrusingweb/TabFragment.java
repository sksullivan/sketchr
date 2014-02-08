package com.XJZ.sketchrusingweb;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Fragment;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

public class TabFragment extends Fragment {
	
	private int index;
	static final int REQUEST_IMAGE_CAPTURE = 1;
	static final int REQUEST_TAKE_PHOTO = 1;
	String mCurrentPhotoPath;
	
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
			dispatchTakePictureIntent();
			v = inflater.inflate(R.layout.fragment_camera, null);
			
			/*File storageDir = getActivity().getExternalFilesDir(null);
			String dir = storageDir.getAbsolutePath();
			TextView tv = (TextView)v.findViewById(R.id.msg);
			tv.setText(dir);*/
		}
        
        return v;
	}
	
	/*private void dispatchTakePictureIntent() {
	    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	    startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
	}*/
	
	private void dispatchTakePictureIntent() {
	    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	    // Create the File where the photo should go
	    File photoFile = null;
	    
	    try {
	    	photoFile = createImageFile();
	    } catch (IOException ex) {
	            // Error occurred while creating the File
	            System.exit(1);
	    }
	        // Continue only if the File was successfully created
	    if (photoFile != null) {
	    	takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,
	    	Uri.fromFile(photoFile));
	        startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
	    }	    
	}
	
	private File createImageFile() throws IOException {
	    // Create an image file name
	    String timeStamp = new SimpleDateFormat("yyyyMMdd").format(new Date());
	    String imageFileName = "JPEG_" + timeStamp + "_";
	    File storageDir = getActivity().getExternalFilesDir(null);
	    File image = File.createTempFile(
	        imageFileName,  /* prefix */
	        ".jpg",         /* suffix */
	        storageDir      /* directory */
	    );

	    // Save a file: path for use with ACTION_VIEW intents
	    mCurrentPhotoPath = "file:" + image.getAbsolutePath();
	    return image;
	}

}
