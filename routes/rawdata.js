const instituteData = {
    "name": "Gamma",
    "password": "321321dsf",
    "address": ["indhra gandhi nagar", "nagpur", "440017"],
    "social_links": [
        {
            "type_link": "youtube", "description": "this is my link"
        }
    ],


}

const teacherData = {
    "institude_id": "644bcd9694cc355ab53f3433",
    "teacher_name": "Aditya chandure",
    "age": 21,
    "contact_number": "9011125561",
    "email": "chandure@gamil.com",
    "achivements": ["UI", "UX", "FRONted"]
}

const formQuizeData = {
    "institude_id": "",
    "title": "The Goal",
    "description": "the description",
    "formMakerEmail": "hariah@gamil.com",
    "questions": [
        {
            "queMsg": "what is the Ai ?",
            "answers":
                [
                    { "value": "machine", "correct": false },
                    { "value": "human", "correct": false },
                    { "value": "computer", "correct": false },
                    { "value": "Artificial Intallignce", "correct": true }
                ]
        },

        {
            "queMsg": "What is full form of OK ?",
            "answers":
                [
                    { "value": "O cool", "correct": false },
                    { "value": "all Right", "correct": true },
                    { "value": "o noo", "correct": false },
                    { "value": "O yaa", "correct": false }
                ]
        },

        {
            "queMsg": "where you from ?",
            "answers":
                [
                    { "value": "home", "correct": true },
                    { "value": "school", "correct": false },
                    { "value": "college", "correct": false },
                    { "value": "room", "correct": false }
                ]
        }

    ]
}

// For answer of the Form :user login required
// formId -- passes to the paramas ,
// userId -- passes to the header
const QuizeAnswer = {
    "user_id": "", //from headers occured
    "formId" :"644c0eb42ffed811a293ed49" ,
    "solved": [
        { "question_id": "644c0eb42ffed811a293ed4a", "choose_id": "644c0eb42ffed811a293ed4e" },
        { "question_id": "644c0eb42ffed811a293ed54", "choose_id": "644c0eb42ffed811a293ed57" },
        { "question_id": "644c0eb42ffed811a293ed4f", "choose_id": "644c0eb42ffed811a293ed51" },
    ],
    "score": 2,

}