import { Switch } from '@/shared/ui/handcrafted/switch/Switch';
import styles from './SettingsPage.module.css';
import { useSettings } from '@/app/context/hooks/useSettings';

export function SettingsPage() {
  const { settings, handleSettingChange } = useSettings();

  return (
    <div className={styles.settingsPage}>
      <Switch
        checked={settings.virtualization}
        onChange={() =>
          handleSettingChange('virtualization', !settings.virtualization)
        }
        label="Virtualización de Tabla"
        labels={{ on: 'ON', off: 'OFF' }}
        overwriteContainerClassName={styles.switchContainer}
      />
      <Switch
        checked={settings.theme === 'light' ? true : false}
        onChange={() =>
          handleSettingChange(
            'theme',
            settings.theme === 'light' ? 'dark' : 'light',
          )
        }
        label="Tema de la Aplicación"
        labels={{ on: 'Light', off: 'Dark' }}
        overwriteContainerClassName={styles.switchContainer}
      />
      <Switch
        checked={settings.dataSource === 'jsonplaceholder' ? true : false}
        onChange={() =>
          handleSettingChange(
            'dataSource',
            settings.dataSource === 'jsonplaceholder'
              ? 'dummyjson'
              : 'jsonplaceholder',
          )
        }
        label="Origen de Datos"
        labels={{ on: 'JSONPlaceholder.com', off: 'DummyJSON.com' }}
        overwriteContainerClassName={styles.switchContainer}
      />
      <div className={styles.motionSetting}>
        <Switch
          checked={settings.motion === 'on' ? true : false}
          onChange={() =>
            handleSettingChange(
              'motion',
              settings.motion === 'on' ? 'off' : 'on',
            )
          }
          label="Animaciones y Movimientos"
          labels={{ on: 'ON', off: 'OFF' }}
          overwriteContainerClassName={styles.switchContainer}
        />
        <p className={styles.motionInfo}>
          Aún cuando se haya seleccionado un modo de animación, por defecto
          usaremos la del sistema operativo. Para mayor información{' '}
          <a
            className={styles.extrenalLink}
            target="__blank"
            rel="noopener"
            href='https://www.google.com?q="activar animaciones en mi sistema operativo"'
          >
            clic aquí
          </a>
        </p>
      </div>
    </div>
  );
}
