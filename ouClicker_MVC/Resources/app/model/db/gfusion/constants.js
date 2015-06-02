//
// Auth params
//
app.model.db.gfusion.auth = {};
app.model.db.gfusion.auth.service = 'fusiontables';
app.model.db.gfusion.auth.email = 'tutor.uah';
app.model.db.gfusion.auth.password = 'cimbel77';

//
// Tables
//
app.model.db.gfusion.tableid = {};
app.model.db.gfusion.tableid.questionsOptions = 1226374;
app.model.db.gfusion.tableid.answers = 1100020;
app.model.db.gfusion.tableid.questionnaire = 1099569;
app.model.db.gfusion.tableid.questions = 1093673;
app.model.db.gfusion.tableid.questionTypes = 1099658;
app.model.db.gfusion.tableid.options = 1226446;


//
// Queries
//
app.model.db.gfusion.queries = {};

//
// Select available questions for current location
//
app.model.db.gfusion.queries.available = {};
app.model.db.gfusion.queries.available.sentence = "SELECT 'questionId', 'questionText', 'questionDesc', 'questionTypeId', 'questionPassword', 'questionDate', 'questionAuthorId' FROM {table} WHERE questionLocation LIKE '{param1}' ORDER BY 'questionDate'";
app.model.db.gfusion.queries.available.table = app.model.db.gfusion.tableid.questions;

//
// Select predefined options answers for current question
//
app.model.db.gfusion.queries.question = {};
app.model.db.gfusion.queries.question.sentence = "SELECT 'question', 'questionTypeId', 'optionDesc', 'optionValue', 'order' FROM {table} WHERE questionId = {param1} ORDER BY 'order'";
app.model.db.gfusion.queries.question.table = app.model.db.gfusion.tableid.questionsOptions;


//
// Answer for current question
//
app.model.db.gfusion.queries.answer = {};
app.model.db.gfusion.queries.answer.sentence = "INSERT INTO {table} ('questionId', 'answer', 'personId', 'date') VALUES ('{param1}', '{param2}', 'personx','"+new Date()+"')";
app.model.db.gfusion.queries.answer.table = app.model.db.gfusion.tableid.answers;