
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.13f4a8b1777844faad745fe536796c8a',
  appName: 'TapJournal',
  webDir: 'dist',
  server: {
    url: 'https://13f4a8b1-7778-44fa-ad74-5fe536796c8a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
