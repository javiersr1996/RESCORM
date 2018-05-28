export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["es", "en"],
    //locale fuerza el idioma
    locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    // numero de preguntas maximas a mostrar
    n:1,
    // modo de juego: examen o repaso
    modo:"examen",
    feedback:true,
    /*
    ****************************************************************************
    xml: "assets/<CUESTIONARIO>.xml",
    <CUESTIONARIO> en castellano: examen1, examen2, repaso1, repaso2
    <CUESTIONARIO> en inglés: examen1_en, examen2_en, repaso1_en, repaso2_en
    ****************************************************************************
    */
    xml:"assets/prueba.xml",

        // tiempo para completar la partida --> modo examen
    secondsRemaining: 600,
    repeticiones: 10,

        // textos pantalla inicial
        // castellano modo examen1_en

        // castellano modo repaso1

        // ingles modo examen1_en

        // ingles modo repaso1

    },
    production: {
        debug: true,
        debug_scorm_api: false,
        debug_scorm_api_window: false,
        available_locales: ["es", "en"],
        locale: "es",
        adaptive: true,
        finish_screen: true,
        scorm: {
            completion_threshold: 0.5,
            score_threshold: 0.6,
        },
        n: 10,
        modo: "examen",
        xml: "assets/examen_pasos.xml",
        secondsRemaining: 360,
        repeticiones: 10,
    },
}

let processConfig = (function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();
