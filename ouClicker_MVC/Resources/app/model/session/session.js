app.model.session = {};

// Navigation status
app.model.session.navigation = {};
app.model.session.navigation.current;
app.model.session.navigation.previous;

// Location status
app.model.session.location = {};
app.model.session.location.city = "Heerlen";

// User data
app.model.session.user = {};
app.model.session.user.id = "btb";
app.model.session.user.name = "Bernardo Tabuenca";

// Selected questionnaire
app.model.session.questionnaire = {};
app.model.session.questionnaire.questionid;
app.model.session.questionnaire.questiontext;
app.model.session.questionnaire.questiondesc;
app.model.session.questionnaire.questiontypeid;
app.model.session.questionnaire.questionpassword;
app.model.session.questionnaire.questiondate;
app.model.session.questionnaire.questionauthorid;

// 'questionId', 'questionText', 'questionDesc', 'questionTypeId', 'questionPassword', 'questionDate'
		
// Selected option in questionnaire
app.model.session.option = {};
app.model.session.option.question;
app.model.session.option.questionTypeId;
app.model.session.option.optionDesc;
app.model.session.option.optionValue;
app.model.session.option.order;

