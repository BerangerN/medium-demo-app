const functions = require('firebase-functions')

const messagesInf = [
  'You might not have it... but run to the hospital!',
  'You are cooling the planet, thanks!',
  'Stop drinking ice tea!',
  'Cold showers help nourish the skin',
  'So what? Do you think I have any clue?',
  'Call 112 or 911, or your mom!',
  'Call your friends and tell them you love them!',
  'To covid or not to covid...',
  'What do you call panic-buying of sausage and cheese in Germany? The wurst-kase scenario.',
  'Yeah, I have plans tonight. I’ll probably hit the living room around 8 or 9.',
]

const messagesMiddle = [
  'Who cares if you have it or not? Stay home!',
  'You should be fine... But stay home!',
  'You are okay... for now!',
  'Enjoy life!',
  'Do you know what asymptomatic means?',
  'So what? Do you think I have any clue?',
  'To covid or not to covid...',
  'What should you do if you don’t understand a coronavirus joke? Be patient.',
  'What types of jokes are allowed during quarantine? Inside jokes!',
  'Yeah, I have plans tonight. I’ll probably hit the living room around 8 or 9.',
]

const messagesSup = [
  'I guess you have it...',
  'So hoooooooot!',
  'Mamaaaaaaaaa! Not you!',
  'Do you still breath?',
  'How many times did you use the app to get this one?',
  'Call 112 or 911, or your mom!',
  'Call your friends and tell them you love them!',
  'To covid or not to covid...',
  'Why do they call it the novel coronavirus? It’s a long story...',
  'If there’s a baby boom nine months from now, what will happen in 2033? There will be a whole bunch of quaranteens.',
]

exports.checkTemperature = functions.https.onRequest((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const temperature = req.query.temperature
  let message = ''

  randSelection = Math.floor(Math.random() * Math.floor(10))

  if (temperature > 38) {
    message = messagesSup[randSelection]
  } else if (temperature < 36) {
    message = messagesInf[randSelection]
  } else {
    message = messagesMiddle[randSelection]
  }

  const response = {
    status: 200,
    message,
  }

  res.send(response)
})
