package com.XJZ.sketchrusingweb;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Fragment;
import android.content.Intent;
import android.media.MediaRecorder;
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
import android.widget.Button;
import android.widget.TextView;
import android.view.View.OnClickListener;

public class TabFragment extends Fragment {
	
	private int index;
	static final int REQUEST_IMAGE_CAPTURE = 1;
	static final int REQUEST_TAKE_PHOTO = 1;
	static final String AUDIO_RECORDER_FILE_EXT_3GP = ".3gp";
	static final String AUDIO_RECORDER_FOLDER = "Audio";
	
	private MediaRecorder recorder = null;
	private int currentFormat = 0;
	
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
			//dispatchTakePictureIntent();
			
			v = inflater.inflate(R.layout.fragment_camera, null);
		} else if (index == 2) {
			//voice recorder be here
			v = inflater.inflate(R.layout.fragment_recorder, null);
			
			((Button)v.findViewById(R.id.btnStart)).setOnClickListener(btnClick);
			((Button)v.findViewById(R.id.btnStop)).setOnClickListener(btnClick);
			
			//enableButtons(false);
		}
        
        return v;
	}
	
	private void enableButton(int id, boolean isEnable) {
		((Button)getView().findViewById(id)).setEnabled(isEnable);
	}

	private void enableButtons(boolean isRecording) {
		enableButton(R.id.btnStart, !isRecording);
		enableButton(R.id.btnStop, isRecording);
	}
	
	private String getFilename() {
		String filepath = getActivity().getExternalFilesDir(null).getPath();
		File file = new File(filepath, AUDIO_RECORDER_FOLDER);

		if (!file.exists()) {
			file.mkdirs();
		}

		return (file.getAbsolutePath() + "/" + System.currentTimeMillis() + ".3gp");
	}
	
	private void startRecording() {
		recorder = new MediaRecorder();

		recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
		recorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
		recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
		recorder.setOutputFile(getFilename());

		recorder.setOnErrorListener(errorListener);
		recorder.setOnInfoListener(infoListener);

		try {
			recorder.prepare();
			recorder.start();
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void stopRecording() {
		if (null != recorder) {
			recorder.stop();
			recorder.reset();
			recorder.release();

			recorder = null;
		}
	}
	
	private MediaRecorder.OnErrorListener errorListener = new MediaRecorder.OnErrorListener() {
		@Override
		public void onError(MediaRecorder mr, int what, int extra) {
			//AppLog.logString("Error: " + what + ", " + extra);
		}
	};

	private MediaRecorder.OnInfoListener infoListener = new MediaRecorder.OnInfoListener() {
		@Override
		public void onInfo(MediaRecorder mr, int what, int extra) {
			//AppLog.logString("Warning: " + what + ", " + extra);
		}
	};
	
	private OnClickListener btnClick = new OnClickListener() {
		@Override
		public void onClick(View v) {
			switch (v.getId()) {
			case R.id.btnStart: {
				//AppLog.logString("Start Recording");

				enableButtons(true);
				startRecording();

				break;
			}
			case R.id.btnStop: {
				//AppLog.logString("Start Recording");

				enableButtons(false);
				stopRecording();

				break;
			}
			}
		}
	};
	
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
