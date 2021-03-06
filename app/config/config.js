export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    // idiomas soportados por la aplicación
    available_locales:["es", "en"],
    // locale fuerza el idioma a emplear: en para inglés, es para castellano
    locale:"es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    // numero de preguntas maximas a mostrar
    n:20,
    InitialScreen:true,
    // modo de juego: examen o repaso
    modo:"examen",
    /*
    *************************************************************************************
    xml: "assets/<CUESTIONARIO>.xml",
    <CUESTIONARIO> en castellano: pasos, antideportivas, violaciones, faltas
    <CUESTIONARIO> en inglés: pasos_en, antideportivas_en, violaciones_en, faltas_en
    *************************************************************************************
    */
    xml:"assets/pasos.xml",

        // tiempo para completar la partida --> modo examen
    secondsRemaining:600,
    repeticiones:10,


  },
  production:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["es", "en"],
    locale:"es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:10,
    InitialScreen:true,
    modo:"examen",
    /*
    *************************************************************************************
    xml: "assets/<CUESTIONARIO>.xml",
    <CUESTIONARIO> en castellano: pasos, antideportivas, violaciones, faltas y examenfinal
    <CUESTIONARIO> en inglés: ingles
    *************************************************************************************
    */
    xml:"assets/pasos.xml",
    secondsRemaining:360,
    repeticiones:10,
  },
};

let processConfig = (function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();
