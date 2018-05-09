export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    /*
    para jugar la partida en inglés, cambiar el orden de es/en
      available_locales:["en", "es"],
    */
    available_locales:["es", "en"],
    // locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    //numero de preguntas maximas a mostrar
    n:10,
    //modo de juego: examen o repaso
    modo:"examen",
    /*
    ****************************************************************************
    xml: "http://localhost:8080/config/<CUESTIONARIO>.xml",
    <CUESTIONARIO> en castellano: examen1, examen2, repaso1, repaso2
    <CUESTIONARIO> en inglés: examen1_en, examen2_en, repaso1_en, repaso2_en
    ****************************************************************************
    */
    xml: "http://localhost:8080/config/examen1.xml",


    //tiempo para completar la partida --> modo examen
    secondsRemaining:300,
  },
  production:{
    debug:false,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:undefined,
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
