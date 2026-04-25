import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

// User-Friendly Translations - No Technical Jargon
const translations = {
  en: {
    welcome: 'Welcome to BUWAD',
    selectLanguage: 'Select your language',
    english: 'English',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Solar Fish Dryer',
    systemActive: 'READY',
    rainDetected: 'RAIN ALERT',
    enclosureSecured: 'COVER IS SAFE',
    environmentalData: 'CURRENT CONDITIONS',
    temperature: 'TEMPERATURE',
    humidity: 'HUMIDITY',
    sunlight: 'SUNLIGHT',
    rainSensor: 'RAIN SENSOR',
    systemState: 'DRYER STATUS',
    phase2ActiveFlipping: 'FLIPPING FISH',
    scheduler: 'TIMING',
    status: 'STATUS',
    nextFlip: 'NEXT FLIP',
    dryingParameters: 'DRYING SETTINGS',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Thick fish · Slower flipping',
    anchoviesSmallMass: 'Small fish · Faster flipping',
    flipMechanism: 'FLIP MECHANISM',
    manualOverride: 'FLIP NOW',
    triggersImmediateFlip: 'Press to flip the fish immediately',
    criticalNotifications: 'ALERTS',
    active: 'ACTIVE',
    dismiss: 'DISMISS',
    noActiveAlerts: 'NO ACTIVE ALERTS',
    allSystemsOperational: 'ALL SYSTEMS GOOD',
    resolved: 'RESOLVED',
    activityFeed: 'ACTIVITY LOG',
    entries: 'RECORDS',
    noActivityRecorded: 'NO ACTIVITY YET',
    systemEventsWillAppear: 'Events will show here',
    dashboard: 'HOME',
    controls: 'CONTROLS',
    alerts: 'ALERTS',
    logs: 'HISTORY'
  },
  tl: {
    welcome: 'Maligayang pagdating sa BUWAD',
    selectLanguage: 'Piliin ang iyong wika',
    english: 'English',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Solar Fish Dryer',
    systemActive: 'HANDA',
    rainDetected: 'ULAN ALERT',
    enclosureSecured: 'LIGTAS ANG TAKIP',
    environmentalData: 'KALAGAYAN NG PANAHON',
    temperature: 'TEMPERATURA',
    humidity: 'HUMIDIDAD',
    sunlight: 'ARAW',
    rainSensor: 'SENSOR NG ULAN',
    systemState: 'STATUS NG PATUYO',
    phase2ActiveFlipping: 'BINABALIKTAD ANG ISDA',
    scheduler: 'ORAS',
    status: 'STATUS',
    nextFlip: 'SUSUNOD NA BALIKTAD',
    dryingParameters: 'SETTING NG PATUYO',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Makapal na isda · Mabagal na baliktad',
    anchoviesSmallMass: 'Maliit na isda · Mabilis na baliktad',
    flipMechanism: 'PAMBALIKTAD NG ISDA',
    manualOverride: 'BALIKTADIN NGAYON',
    triggersImmediateFlip: 'Pindutin para ibaliktad agad ang isda',
    criticalNotifications: 'MGA ALERTS',
    active: 'AKTIBO',
    dismiss: 'ISARA',
    noActiveAlerts: 'WALANG AKTIBONG ALERTS',
    allSystemsOperational: 'MAYOS ANG LAHAT',
    resolved: 'NAYOS NA',
    activityFeed: 'MGA NAITALA',
    entries: 'RECORDS',
    noActivityRecorded: 'WALA PANG NAITALA',
    systemEventsWillAppear: 'Lalabas dito ang mga pangyayari',
    dashboard: 'HOME',
    controls: 'CONTROLS',
    alerts: 'ALERTS',
    logs: 'HISTORY'
  },
  ceb: {
    welcome: 'Maayong pag-abot sa BUWAD',
    selectLanguage: 'Pilia ang imong pinulongan',
    english: 'English',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Solar Fish Dryer',
    systemActive: 'ANDAR',
    rainDetected: 'PAG-ULAN ALERT',
    enclosureSecured: 'SEGURO ANG TAKIP',
    environmentalData: 'KAHIMTANG SA PANAHON',
    temperature: 'TEMPERATURA',
    humidity: 'KABASA',
    sunlight: 'KAINIT SA ADLAW',
    rainSensor: 'SENSOR SA ULAN',
    systemState: 'STATUS SA PAGPAUGA',
    phase2ActiveFlipping: 'GIBALI-BALI ANG ISDA',
    scheduler: 'ORAS',
    status: 'STATUS',
    nextFlip: 'SUNOD NGA BALI',
    dryingParameters: 'SETTING SA PAGPAUGA',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Bag-on nga isda · Hinay nga pagbali',
    anchoviesSmallMass: 'Gamay nga isda · Pas pas nga pagbali',
    flipMechanism: 'PAGBALI SA ISDA',
    manualOverride: 'BALIHA DAYON',
    triggersImmediateFlip: 'Pindota para mubali dayon ang isda',
    criticalNotifications: 'MGA PAHIBALO',
    active: 'AKTIBO',
    dismiss: 'SIRA',
    noActiveAlerts: 'WAY AKTIBONG PAHIBALO',
    allSystemsOperational: 'OKAY RA TANAN',
    resolved: 'NA-AYO NA',
    activityFeed: 'MGA NAHITABO',
    entries: 'MGA RECORD',
    noActivityRecorded: 'WALA PAY NAHITABO',
    systemEventsWillAppear: 'Makita dinhi ang mga nahitabo',
    dashboard: 'KAHIMTANG',
    controls: 'PAGBALI',
    alerts: 'PAHIBALO',
    logs: 'KASAYSAYAN'
  },
  es: {
    welcome: 'Bienvenido a BUWAD',
    selectLanguage: 'Selecciona tu idioma',
    english: 'Inglés',
    tagalog: 'Tagalo',
    cebuano: 'Cebuano',
    systemTitle: 'Secador Solar de Pescado',
    systemActive: 'LISTO',
    rainDetected: 'ALERTA DE LLUVIA',
    enclosureSecured: 'CUBIERTA SEGURA',
    environmentalData: 'CONDICIONES ACTUALES',
    temperature: 'TEMPERATURA',
    humidity: 'HUMEDAD',
    sunlight: 'LUZ SOLAR',
    rainSensor: 'SENSOR DE LLUVIA',
    systemState: 'ESTADO DEL SECADOR',
    phase2ActiveFlipping: 'VOLTEANDO PESCADO',
    scheduler: 'TEMPORIZADOR',
    status: 'ESTADO',
    nextFlip: 'PRÓXIMO VOLTEO',
    dryingParameters: 'CONFIGURACIÓN DE SECADO',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Pescado grueso · Volteo más lento',
    anchoviesSmallMass: 'Pescado pequeño · Volteo más rápido',
    flipMechanism: 'MECANISMO DE VOLTEO',
    manualOverride: 'VOLTEAR AHORA',
    triggersImmediateFlip: 'Presiona para voltear el pescado inmediatamente',
    criticalNotifications: 'ALERTAS',
    active: 'ACTIVO',
    dismiss: 'DESCARTAR',
    noActiveAlerts: 'NO HAY ALERTAS ACTIVAS',
    allSystemsOperational: 'TODO EL SISTEMA FUNCIONA',
    resolved: 'RESUELTO',
    activityFeed: 'REGISTRO DE ACTIVIDAD',
    entries: 'REGISTROS',
    noActivityRecorded: 'SIN ACTIVIDAD AÚN',
    systemEventsWillAppear: 'Los eventos se mostrarán aquí',
    dashboard: 'INICIO',
    controls: 'CONTROLES',
    alerts: 'ALERTAS',
    logs: 'HISTORIAL'
  },
  fr: {
    welcome: 'Bienvenue à BUWAD',
    selectLanguage: 'Choisissez votre langue',
    english: 'Anglais',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Séchoir à Poisson Solaire',
    systemActive: 'PRÊT',
    rainDetected: 'ALERTE PLUIE',
    enclosureSecured: 'COUVERCLE SÉCURISÉ',
    environmentalData: 'CONDITIONS ACTUELLES',
    temperature: 'TEMPÉRATURE',
    humidity: 'HUMIDITÉ',
    sunlight: 'LUMIÈRE SOLAIRE',
    rainSensor: 'CAPTEUR DE PLUIE',
    systemState: 'ÉTAT DU SÉCHOIR',
    phase2ActiveFlipping: 'RETOURNEMENT DU POISSON',
    scheduler: 'MINUTERIE',
    status: 'STATUT',
    nextFlip: 'PROCHAIN RETOURNEMENT',
    dryingParameters: 'PARAMÈTRES DE SÉCHAGE',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Poisson épais · Retournement lent',
    anchoviesSmallMass: 'Petit poisson · Retournement rapide',
    flipMechanism: 'MÉCANISME DE RETOURNEMENT',
    manualOverride: 'RETOURNER MAINTENANT',
    triggersImmediateFlip: 'Appuyez pour retourner le poisson immédiatement',
    criticalNotifications: 'ALERTES',
    active: 'ACTIF',
    dismiss: 'IGNORER',
    noActiveAlerts: 'AUCUNE ALERTE ACTIVE',
    allSystemsOperational: 'TOUT LE SYSTÈME FONCTIONNE',
    resolved: 'RÉSOLU',
    activityFeed: 'JOURNAL D\'ACTIVITÉ',
    entries: 'ENTRÉES',
    noActivityRecorded: 'AUCUNE ACTIVITÉ POUR L\'INSTANT',
    systemEventsWillAppear: 'Les événements apparaîtront ici',
    dashboard: 'ACCUEIL',
    controls: 'COMMANDES',
    alerts: 'ALERTES',
    logs: 'HISTORIQUE'
  },
  de: {
    welcome: 'Willkommen bei BUWAD',
    selectLanguage: 'Wählen Sie Ihre Sprache',
    english: 'Englisch',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Solarer Fischtrockner',
    systemActive: 'BEREIT',
    rainDetected: 'REGENALARM',
    enclosureSecured: 'ABDECKUNG SICHER',
    environmentalData: 'AKTUELLE BEDINGUNGEN',
    temperature: 'TEMPERATUR',
    humidity: 'LUFTFEUCHTIGKEIT',
    sunlight: 'SONNENLICHT',
    rainSensor: 'REGENSENSOR',
    systemState: 'TROCKNERSTATUS',
    phase2ActiveFlipping: 'FISCH WIRD GEWENDET',
    scheduler: 'ZEITGEBER',
    status: 'STATUS',
    nextFlip: 'NÄCHSTES WENDEN',
    dryingParameters: 'TROCKNUNGSEINSTELLUNGEN',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Dicker Fisch · Langsameres Wenden',
    anchoviesSmallMass: 'Kleiner Fisch · Schnelleres Wenden',
    flipMechanism: 'WENDEMECHANISMUS',
    manualOverride: 'JETZT WENDEN',
    triggersImmediateFlip: 'Drücken Sie zum sofortigen Wenden des Fisches',
    criticalNotifications: 'ALARME',
    active: 'AKTIV',
    dismiss: 'SCHLIESSEN',
    noActiveAlerts: 'KEINE AKTIVEN ALARME',
    allSystemsOperational: 'ALLE SYSTEME FUNKTIONIEREN',
    resolved: 'ERLEDIGT',
    activityFeed: 'AKTIVITÄTSPROTOKOLL',
    entries: 'EINTRÄGE',
    noActivityRecorded: 'NOCH KEINE AKTIVITÄT',
    systemEventsWillAppear: 'Ereignisse werden hier angezeigt',
    dashboard: 'STARTSEITE',
    controls: 'STEUERUNG',
    alerts: 'ALARME',
    logs: 'VERLAUF'
  },
  it: {
    welcome: 'Benvenuto su BUWAD',
    selectLanguage: 'Seleziona la tua lingua',
    english: 'Inglese',
    tagalog: 'Tagalog',
    cebuano: 'Cebuano',
    systemTitle: 'Essiccatore Solare per Pesce',
    systemActive: 'PRONTO',
    rainDetected: 'ALLERTA PIOGGIA',
    enclosureSecured: 'COPERCHIO SICURO',
    environmentalData: 'CONDIZIONI ATTUALI',
    temperature: 'TEMPERATURA',
    humidity: 'UMIDITÀ',
    sunlight: 'LUCE SOLARE',
    rainSensor: 'SENSORE DI PIOGGIA',
    systemState: 'STATO ESSICCATORE',
    phase2ActiveFlipping: 'GIRANDO IL PESCE',
    scheduler: 'TIMER',
    status: 'STATO',
    nextFlip: 'PROSSIMO GIRO',
    dryingParameters: 'IMPOSTAZIONI DI ESSICCAZIONE',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Pesce spesso · Giro più lento',
    anchoviesSmallMass: 'Pesce piccolo · Giro più veloce',
    flipMechanism: 'MECCANISMO DI GIRATURA',
    manualOverride: 'GIRA ORA',
    triggersImmediateFlip: 'Premi per girare il pesce immediatamente',
    criticalNotifications: 'ALLERTE',
    active: 'ATTIVO',
    dismiss: 'IGNORA',
    noActiveAlerts: 'NESSUN ALLERTA ATTIVA',
    allSystemsOperational: 'TUTTI I SISTEMI FUNZIONANO',
    resolved: 'RISOLTO',
    activityFeed: 'REGISTRO ATTIVITÀ',
    entries: 'REGISTRAZIONI',
    noActivityRecorded: 'ANCORA NESSUNA ATTIVITÀ',
    systemEventsWillAppear: 'Gli eventi appariranno qui',
    dashboard: 'HOME',
    controls: 'CONTROLLI',
    alerts: 'ALLERTE',
    logs: 'CRONOLOGIA'
  },
  pt: {
    welcome: 'Bem-vindo ao BUWAD',
    selectLanguage: 'Selecione seu idioma',
    english: 'Inglês',
    tagalog: 'Tagalo',
    cebuano: 'Cebuano',
    systemTitle: 'Secador Solar de Peixe',
    systemActive: 'PRONTO',
    rainDetected: 'ALERTA DE CHUVA',
    enclosureSecured: 'COBERTURA SEGURA',
    environmentalData: 'CONDIÇÕES ATUAIS',
    temperature: 'TEMPERATURA',
    humidity: 'UMIDADE',
    sunlight: 'LUZ SOLAR',
    rainSensor: 'SENSOR DE CHUVA',
    systemState: 'ESTADO DO SECADOR',
    phase2ActiveFlipping: 'VIRANDO O PEIXE',
    scheduler: 'TEMPORIZADOR',
    status: 'STATUS',
    nextFlip: 'PRÓXIMA VIRADA',
    dryingParameters: 'CONFIGURAÇÕES DE SECAGEM',
    danggit: 'DANGGIT',
    bolinao: 'BOLINAO',
    rabbitfishThickFillet: 'Peixe grosso · Virada mais lenta',
    anchoviesSmallMass: 'Peixe pequeno · Virada mais rápida',
    flipMechanism: 'MECANISMO DE VIRADA',
    manualOverride: 'VIRAR AGORA',
    triggersImmediateFlip: 'Pressione para virar o peixe imediatamente',
    criticalNotifications: 'ALERTAS',
    active: 'ATIVO',
    dismiss: 'DISPENSAR',
    noActiveAlerts: 'NENHUM ALERTA ATIVO',
    allSystemsOperational: 'TODOS OS SISTEMAS ESTÃO BONS',
    resolved: 'RESOLVIDO',
    activityFeed: 'REGISTRO DE ATIVIDADE',
    entries: 'REGISTROS',
    noActivityRecorded: 'SEM ATIVIDADE AINDA',
    systemEventsWillAppear: 'Eventos aparecerão aqui',
    dashboard: 'INÍCIO',
    controls: 'CONTROLES',
    alerts: 'ALERTAS',
    logs: 'HISTÓRICO'
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [onLanguageSelectedCallback, setOnLanguageSelectedCallback] = useState(null);

  // Load saved language preference on startup - FIXED
  useEffect(() => {
    const savedLang = localStorage.getItem('buwad_language');
    const savedPreference = localStorage.getItem('buwad_save_language');
    
    if (savedLang && savedPreference === 'true') {
      setLanguage(savedLang);
      setHasSelectedLanguage(true); // This was missing - critical!
    }
  }, []);

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const selectLanguage = (lang, save = false) => {
    setLanguage(lang);
    setHasSelectedLanguage(true);
    
    if (save) {
      localStorage.setItem('buwad_language', lang);
      localStorage.setItem('buwad_save_language', 'true');
    } else {
      localStorage.removeItem('buwad_language');
      localStorage.removeItem('buwad_save_language');
    }
    
    if (onLanguageSelectedCallback) {
      onLanguageSelectedCallback();
    }
  };

  const resetLanguage = () => {
    setHasSelectedLanguage(false);
    setLanguage('en');
    localStorage.removeItem('buwad_language');
    localStorage.removeItem('buwad_save_language');
  };

  const registerLanguageCallback = (callback) => {
    setOnLanguageSelectedCallback(() => callback);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      t, 
      selectLanguage, 
      hasSelectedLanguage, 
      resetLanguage,
      registerLanguageCallback
    }}>
      {children}
    </LanguageContext.Provider>
  );
};