package com.XJZ.sketchrusingweb;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

//import com.XJZ.sketchrusingweb.GetCurrentLocation.MyLocationListener;

import android.app.Fragment;
import android.content.Context;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.media.MediaRecorder;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View.OnClickListener;

public class TabFragment extends Fragment {
	
	private int index;
	private String path;
	
	static final int REQUEST_IMAGE_CAPTURE = 1;
	static final int REQUEST_TAKE_PHOTO = 1;
	String mCurrentPhotoPath;
	
	static final String AUDIO_RECORDER_FILE_EXT_3GP = ".3gp";
	static final String AUDIO_RECORDER_FOLDER = "Audio";	
	private MediaRecorder recorder = null;
	
	private LocationManager locationMangaer=null;
	private LocationListener locationListener=null; 
	EditText editLocation;
	Button btnGetLocation;
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		Bundle data = getArguments();
		
		index = data.getInt("idx");
		path = data.getString("path");
	}
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {		
		View v = null;
		
		//WebView
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
        
			webview.loadUrl("http://sketchr.herokuapp.com");
			
		//Camera
		} else if (index == 1) {
			dispatchTakePictureIntent();
			
			v = inflater.inflate(R.layout.fragment_camera, null);
			
		//Voice Record
		} else if (index == 2) {
			v = inflater.inflate(R.layout.fragment_recorder, null);
			
			((Button)v.findViewById(R.id.btnStart)).setOnClickListener(btnClick);
			((Button)v.findViewById(R.id.btnStop)).setOnClickListener(btnClick);
		} else if (index == 3) {
			//GPS Tester here
			v = inflater.inflate(R.layout.fragment_gps, null);
			
			editLocation = (EditText) v.findViewById(R.id.editTextLocation);
			btnGetLocation = (Button) v.findViewById(R.id.btnLocation);
			btnGetLocation.setOnClickListener(btnClick);
			
			locationMangaer = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
		}
        
        return v;
	}
	
	//START VOICE RECORD SECTION
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
					enableButtons(true);
					startRecording();
					break;
				}
				
				case R.id.btnStop: {
					enableButtons(false);
					stopRecording();
					break;
				}
				
				case R.id.btnLocation: {
					editLocation.setText("Please!! move your device to"+
							   " see the changes in coordinates."+"\nWait..");
					
					locationListener = new MyLocationListener();
					locationMangaer.requestLocationUpdates(LocationManager
							   .GPS_PROVIDER, 5000, 10,locationListener);
				}
			}
		}
	};
	//END VOICE RECORD SECTION
	
	private class MyLocationListener implements LocationListener {
		@Override
		public void onLocationChanged(Location loc) {

			editLocation.setText("");
			Toast.makeText(
					getActivity().getBaseContext(),
					"Location changed : Lat: " + loc.getLatitude() + " Lng: "
							+ loc.getLongitude(), Toast.LENGTH_SHORT).show();
			String longitude = "Longitude: " + loc.getLongitude();
			String latitude = "Latitude: " + loc.getLatitude();

			/*----------to get City-Name from coordinates ------------- */
			String cityName = null;
			Geocoder gcd = new Geocoder(getActivity().getBaseContext(), Locale.getDefault());
			List<Address> addresses;
			try {
				addresses = gcd.getFromLocation(loc.getLatitude(),
						loc.getLongitude(), 1);
				if (addresses.size() > 0)
					System.out.println(addresses.get(0).getLocality());
				cityName = addresses.get(0).getLocality();
			} catch (IOException e) {
				e.printStackTrace();
			}

			String s = longitude + "\n" + latitude
					+ "\n\nMy Currrent City is: " + cityName;
			editLocation.setText(s);
		}

		@Override
		public void onProviderDisabled(String provider) {
			// TODO Auto-generated method stub
		}

		@Override
		public void onProviderEnabled(String provider) {
			// TODO Auto-generated method stub
		}

		@Override
		public void onStatusChanged(String provider, int status, Bundle extras) {
			// TODO Auto-generated method stub
		}
	}
	
	//START CAMERA SECTION
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
	    
	    String filepath = getActivity().getExternalFilesDir(null).getPath();
	    File file = new File(filepath, path);
	    
	    if (!file.exists()) {
	    	file.mkdirs();
	    }
	    
	    File storageDir = getActivity().getExternalFilesDir(null);
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
	//END CAMERA SECTION

}
