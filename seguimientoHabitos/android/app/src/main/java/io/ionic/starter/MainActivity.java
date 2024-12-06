package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.plugin.notification.LocalNotificationsPlugin;

public class MainActivity extends BridgeActivity {
  // Agregar plugins aquí
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Registrar el plugin de LocalNotifications
    registerPlugin(LocalNotificationsPlugin.class);
  }
}