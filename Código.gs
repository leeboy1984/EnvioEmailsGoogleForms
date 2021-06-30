function emailOnFormSubmit(e){
  // Recuperamos las respuestas:
  let itemResponses = e.response.getItemResponses();

  // Recuperamos a quien envió el formulario:
  let submitter = e.response.getRespondentEmail();

  // Definimos la información del sender
  let senderName = "GForm Vitaminado";
  let senderEmail = "EmailDiferenteAlPersonal";

  // Definimos el asunto del email
  let mailSubject = "[Confirmación] Se ha recibido una respuesta";

  // Definimos los cuerpos del email (plano y html)
  let mailPlainBody = "";
  let mailHtmlBody = "";

  // Creamos las variables que necesitemos en base a las respuestas:
  let comoTeLlamas = "";
  let desdeDondeAccedes = "";

  // Procesamos las respuestas y nos quedamos con las que nos interesan
  // TIP IMPORTANTE: buscar por título, que sea el mismo que en el formulario
  for (var i = 0; i < itemResponses.length; i++) {
    var itemTitle = itemResponses[i].getItem().getTitle();
    //Es importante limpiar el itemResponse ya que viene entrecomillado de ahí el replace del final
    var itemResponse = JSON.stringify(itemResponses[i].getResponse()).replace(/['"]+/g, '');;
    
    switch (itemTitle){
      case "¿Cómo te llamas?":
        comoTeLlamas = itemResponse;
        break;
      case "¿Desde dónde accedes?":
        desdeDondeAccedes = itemResponse;
        break;
    }
  }

  // Vamos a tener un email en texto plano muy sencillo:
  mailPlainBody = "Hola,\n\n  " + sumitter + " ha enviado las siguientes respuestas a tu formulario: \n\n";
  mailPlainBody += "  - ¿Cómo te llamas?: " + comoTeLlamas + "\n";
  mailPlainBody += "  - ¿Desde dónde accedes?: " + desdeDondeAccedes + "\n";

  // Indicamos que el html lo obtenga de nuestro fichero:
  mailHtmlBody = HtmlService.createHtmlOutputFromFile("email_body").getContent();
  
  // Vamos a realizar los reemplazos
  mailHtmlBody = mailHtmlBody.replace("SUBMITTER_EMAIL_1", submitter);
  mailHtmlBody = mailHtmlBody.replace("SUBMITTER_EMAIL_2", submitter);
  mailHtmlBody = mailHtmlBody.replace("COMO_TE_LLAMAS", comoTeLlamas);
  mailHtmlBody = mailHtmlBody.replace("DESDE_DONDE_ACCEDES", desdeDondeAccedes);

  /*
  // Objeto con los identificadores de las banderas almacenadas en GDrive y la variable con la bandera
  let banderas = {
    "España": "1xQI04PQVdPw5DDXMNIsEPnRFFP3nQgHI",
    "México": "15Zxn8lu4pWN8M0OoN-0fR_luiUQJ-kIG",
    "Perú": "1U5iPdjeDGB067gYAAsynUf7WftHUou14",
    "Colombia": "1_liHkzRVjO9FXwGmI_UsXtDiG2OYPTE_",
    "Otro": "1f8CAwcnR13-GGLh5Fry2EYrx-zA9RVlO"
  };
  let banderaImagen = DriveApp.getFileById(banderas[desdeDondeAccedes]).getBlob().setName("bandera");
  */

  // Creamos la configuración:
  let advancedOpts = {
      name: senderName,
      htmlBody: mailHtmlBody,
      // from: senderEmail,
  }

  /* Configuración para el envío de imágenes, comentado a propósito para el taller
  let advancedOpts = {
    name: senderName,
    htmlBody: mailHtmlBody,
    inlineImages:{
      bandera: banderaImagen
    }
  }
  */

  // GmailApp(destinatario, asunto, email, opcionesAvanzadas):
  GmailApp.sendEmail("DESTINATARIO", mailSubject, mailPlainBody, advancedOpts);
}


function testMail(){
  let mailPlainBody = "Test Mail";
  let mailSubject = "Email de prueba del taller Ninja";
  let mailHtmlBody = HtmlService.createHtmlOutputFromFile("email_body").getContent();;

  let advancedOpts = {
        name: "Nombre Pruebas",
        htmlBody: mailHtmlBody,
    };

  GmailApp.sendEmail("DESTINATARIO_PRUEBAS", mailSubject, mailPlainBody, advancedOpts);
}
