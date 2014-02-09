package com.XJZ.sketchrusingweb;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;

public class CameraActivity extends Activity {
	
	static final int REQUEST_IMAGE_CAPTURE = 1;
	static final int REQUEST_TAKE_PHOTO = 1;
	private String path = "Photo";
	String mCurrentPhotoPath;
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        dispatchTakePictureIntent();
        
	}
	
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
	    
	    String filepath = getExternalFilesDir(null).getPath();
	    File file = new File(filepath, path);
	    
	    if (!file.exists()) {
	    	file.mkdirs();
	    }
	    
	    File storageDir = getExternalFilesDir(null);
	    Log.i("camera", storageDir.getAbsolutePath());
	    Log.i("camera", path);
	    Log.i("camera", storageDir.getAbsolutePath() + path);
	    File image = File.createTempFile(
	        imageFileName,  /* prefix */
	        ".jpg",         /* suffix */
	        file
	        //storageDir      /* directory */
	    );

	    // Save a file: path for use with ACTION_VIEW intents
	    mCurrentPhotoPath = "file:" + image.getAbsolutePath();
	    return image;
	}
}
