package com.XJZ.sketchrusingweb;

import java.util.ArrayList;
import java.util.List;

import android.os.Bundle;
import android.app.ActionBar;
import android.app.ActionBar.Tab;
import android.app.ActionBar.TabListener;
import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity implements TabListener {

	List<Fragment> fragList = new ArrayList<Fragment>();
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        ActionBar bar = getActionBar();
        bar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        
        Tab tab = bar.newTab();
        tab.setText("Sketch");
        tab.setTabListener(this);
        bar.addTab(tab);
        
        tab = bar.newTab();
        tab.setText("Camera");
        tab.setTabListener(this);
        bar.addTab(tab);
        
        
        tab = bar.newTab();
        tab.setText("Voice Recorder");
        tab.setTabListener(this);
        bar.addTab(tab);
        
        //should be removed
        tab = bar.newTab();
        tab.setText("GPS Tester");
        tab.setTabListener(this);
        bar.addTab(tab);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    public void onTabReselected(Tab tab, FragmentTransaction ft) {
    	
    }
    
    public void onTabSelected(Tab tab, FragmentTransaction ft) {
    	Fragment f = null;
    	TabFragment tf = null;
    	
    	if (fragList.size() > tab.getPosition()) {
    		fragList.get(tab.getPosition());
    	}
    	
    	if (f == null) {
    		tf = new TabFragment();
    		Bundle data = new Bundle();
    		data.putInt("idx", tab.getPosition());
    		tf.setArguments(data);
     	} else {
     		tf = (TabFragment)f;
     	}
    	
    	ft.replace(android.R.id.content, tf);
    }
    
    public void onTabUnselected(Tab tab, FragmentTransaction ft) {
    	if (fragList.size() > tab.getPosition()) {
    		ft.remove(fragList.get(tab.getPosition()));
    	}
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
    	Intent i;
    	
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.action_send:
                //blah
                return true;
            case R.id.action_save:
                //blah
                return true;
            case R.id.action_help:
            	i = new Intent(this, HelpView.class);
            	startActivity(i);
            	return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    
}
