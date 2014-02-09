package com.XJZ.sketchrusingweb;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Activity;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class VoiceActivity extends Activity implements OnClickListener {
	
	Button btnStart;
	Button btnStop;
	
	static final String AUDIO_RECORDER_FILE_EXT_3GP = ".3gp";
	static final String AUDIO_RECORDER_FOLDER = "Audio";	
	private MediaRecorder recorder = null;
	
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recorder);
        
        btnStart = (Button)findViewById(R.id.btnStart);
        btnStop = (Button)findViewById(R.id.btnStop);
        
        btnStart.setOnClickListener(this);
        btnStop.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
			case R.id.btnStart:
				enableButtons(true);
				startRecording();
				break;
				
			case R.id.btnStop:
				enableButtons(false);
				stopRecording();
				break;
		}
	}
	
	private void enableButtons(boolean isRecording) {
		enableButton(R.id.btnStart, !isRecording);
		enableButton(R.id.btnStop, isRecording);
	}
	
	private void enableButton(int id, boolean isEnable) {
		((Button)findViewById(id)).setEnabled(isEnable);
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
	
	private String getFilename() {
		String filepath = getExternalFilesDir(null).getPath();
		File file = new File(filepath, AUDIO_RECORDER_FOLDER);

		if (!file.exists()) {
			file.mkdirs();
		}
		
		String timeStamp = new SimpleDateFormat("yyyyMMdd").format(new Date());

		return (file.getAbsolutePath() + "/" + timeStamp + "_"+ System.currentTimeMillis() + ".3gp");
	}
	
	private MediaRecorder.OnErrorListener errorListener = new MediaRecorder.OnErrorListener() {
		@Override
		public void onError(MediaRecorder mr, int what, int extra) {
			Log.i("Voice Recorder", "Error: " + what + ", " + extra);
		}
	};

	private MediaRecorder.OnInfoListener infoListener = new MediaRecorder.OnInfoListener() {
		@Override
		public void onInfo(MediaRecorder mr, int what, int extra) {
			Log.i("Voice Recorder", "Warning: " + what + ", " + extra);
		}
	};
}
