import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { LocalNotifications } from '@capacitor/local-notifications';

// Función para solicitar permisos al usuario
const requestPermission = async () => {
  const permission = await LocalNotifications.requestPermissions();
  if (permission.display === "granted") {
    console.log("Permiso para notificaciones concedido");
  } else {
    console.error("Permiso para notificaciones denegado");
  }
};

// Función para programar una notificación
const scheduleNotification = async () => {
  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1, // Identificador único
        title: "¡Recordatorio de hábitos!",
        body: "No olvides completar tus tareas de hoy.",
        schedule: { at: new Date(Date.now() + 1000 * 60) }, // Notificación en 1 minuto
        sound: "beep.wav",
        smallIcon: "ic_stat_icon_config_sample",
        actionTypeId: "",
        extra: null,
      },
    ],
  });
};

// Llamar a las funciones necesarias
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Solicitar permisos al cargar la app
requestPermission();

// Ejemplo: Programar una notificación al iniciar la app
scheduleNotification();
