app.model = {};

Ti.include("./db/db.js");
Ti.include("./location/location.js");
Ti.include("./session/session.js");



app.model.MyModel = function() {

   return {
   	  //
   	  // Session
   	  //
      setSelectedQuestionnaire: function(item) {

		app.model.session.questionnaire.questionid = item['questionId'];
		app.model.session.questionnaire.questiontext = item['questionText'];
		app.model.session.questionnaire.questiondesc = item['questionDesc'];
		app.model.session.questionnaire.questiontypeid = item['questionTypeId'];		
		app.model.session.questionnaire.questionpassword = item['questionPassword'];
		app.model.session.questionnaire.questiondate = item['questionDate'];
		app.model.session.questionnaire.questionauthor = item['questionAuthorId'];		
		Ti.API.debug("setSelectedQuestionnaire ["+item['questionId']+"]["+item['questionText']+"]["+item['questionTypeId']+"]["+item['questionPassword']+"]["+item['questionDate']+"]");

      },
      setSelectedOption: function(item) {

		app.model.session.option.question = item['question'];
		app.model.session.option.questionTypeId = item['questionTypeId'];
		app.model.session.option.optionDesc = item['optionDesc'];
		app.model.session.option.optionValue = item['optionValue'];
		app.model.session.option.order = item['order'];								

		Ti.API.debug("setSelectedOption ["+item['question']+"]["+item['questionTypeId']+"]["+item['optionDesc']+"]["+item['optionValue']+"]["+item['order']+"]");

      },              	
      getPassword: function() {
      	Ti.API.debug("getPassword ["+app.model.session.questionnaire.questionpassword+"]");
      	return app.model.session.questionnaire.questionpassword;
      },
      getQuestionnaireDescription: function() {
      	Ti.API.debug("getQuestionnaireDescription ["+app.model.session.questionnaire.questiontext+"]");
      	return app.model.session.questionnaire.questiontext;
      },
      getQuestionnaireLongDescription: function() {
      	Ti.API.debug("getQuestionnaireLongDescription ["+app.model.session.questionnaire.questiondesc+"]");
      	return app.model.session.questionnaire.questiondesc;
      },
      getUserId: function() {
      	Ti.API.debug("getUserId ["+app.model.session.user.id+"]");
      	return app.model.session.user.id;      	
      },
      getLocation: function() {
      	Ti.API.debug("getLocation ["+app.model.session.location.city+"]");
      	return app.model.session.location.city;
      },
      
            
      //
      // Database
      //            
      getQuestionnairesSentence: function(city) {
      	var sqlSentence;
      	//Ti.API.debug("getQuestionnairesSentence ["+city+"]");
      	var auxSqlSentence = app.model.db.gfusion.queries.available.sentence.replace('{table}', app.model.db.gfusion.queries.available.table);
      	var sqlSentence = auxSqlSentence.replace('{param1}', city)
      	Ti.API.debug(sqlSentence);
      	
      	return sqlSentence;
      },
      getOptionsSentence: function() {
      	var sqlSentence;

      	var auxSqlSentence = app.model.db.gfusion.queries.question.sentence.replace('{table}', app.model.db.gfusion.queries.question.table);
      	var sqlSentence = auxSqlSentence.replace('{param1}', app.model.session.questionnaire.questionid)
      	Ti.API.debug(sqlSentence);
      	
      	return sqlSentence;
      },
      getAnswerSentence: function() {
      	var sqlSentence;
      	var aux1SqlSentence = app.model.db.gfusion.queries.answer.sentence.replace('{param1}', app.model.session.option.question);   	
      	var aux2SqlSentence = aux1SqlSentence.replace('{param2}', app.model.session.option.optionValue);
      	var sqlSentence = aux2SqlSentence.replace('{table}', app.model.db.gfusion.queries.answer.table);
      	//Ti.API.debug(sqlSentence);
      	
      	return sqlSentence;
      },              	
      getDBAuthParams: function() {
      	Ti.API.debug("getDBAuthParams ["+app.model.db.gfusion.auth+"]");
      	return app.model.db.gfusion.auth;
      }

   }
   
}