import requests
import vk_api
import random
import json
import time
import datetime
import urllib.request
import os
import shutil

token = '8c546de0819da95731ebe881113cc7d9f20f4acc1f7ce479ac79fca3638495e8aec5000693015ddd70035'
token_qiwi = '1eef43c71d666137ba96fb878121ac37' # токен можно получить здесь https://qiwi.com/api
login_qiwi = '+79258228930' # номер QIWI Кошелька в формате +79991112233

Paykeyboard = {
    "one_time": None,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Подтвердить оплату!"
        },
        "color": "positive"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Выйти"
        },
        "color": "negative"

      }]

    ]
  }

Pay = {
    "one_time": None,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Пополнить"
        },
        "color": "positive"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Выйти"
        },
        "color": "negative"

      }]

    ]
  }  

Exit = {
    "one_time": None,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Выйти"
        },
        "color": "negative"

      }]

    ]
  }  

Start = {
    "one_time": None,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Раздеть"
        },
        "color": "primary"

      },
      {
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Баланс"
        },
        "color": "default"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Пополнить"
        },
        "color": "positive"

      }]

    ]
  } 

Razdet = {
    "one_time": None,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Раздeть"
        },
        "color": "positive"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Баланс"
        },
        "color": "negative"

      },
      {
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Пополнить"
        },
        "color": "negative"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Замена лиц в порно"
        },
        "color": "positive"

      }],
      [{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"2\"}",
          "label": "Безлимит"
        },
        "color": "default"

      }],

    ]
  }      


def get_random_id():
    """ Get random int32 number (signed) """
    return random.getrandbits(31) * random.choice([-1, 1])
    

def message(mes, keyboards, userid):
  try:

    arg = mes.split(';')
    if(arg[1] == 'None'):

      vk.messages.send( #Отправляем сообщение
        user_id=userid,
        random_id=get_random_id(),
        keyboard = json.dumps(keyboards,ensure_ascii=False),
        message=arg[0]
        )

    else:
      vk.messages.send( #Отправляем сообщение
        user_id=userid,
        random_id=get_random_id(),
        keyboard = json.dumps(keyboards,ensure_ascii=False),
        attachment=arg[1],
        message=arg[0]
        )

  except Exception as e:
    print('Ошибка: ' + e)




def wait(namefile, userid):
   	w = open('C:\\Python\\wait.txt', 'a')	
   	w.write(';' + namefile)
   	w.close 	
    	





def usedpay():
	f = open('C:\\Python\\usedpay.txt', 'r')
	fileread = f.read()
	f.close

	return fileread




def usedpayadd(id):
	w = open('C:\\Python\\usedpay.txt', 'a')
	w.write(';' + str(id))
	w.close





def newuser(userid):
  try:
    f = open('C:\\Python\\users.txt', 'r')
    fileread = f.read()
    f.close

    result = 'false'

    users = fileread.split(';')

    for number in range(len(users)):
      user = users[number].split('=')
      if(str(userid) == str(user[0])):
        result = 'true'

    if(result == 'false'):
      w = open('C:\\Python\\users.txt', 'a')
      w.write(';' + str(userid) + '=0')
      w.close
  except Exception as e:
    print('Ошибка ' + str(e) + ' newuser, пожалуйста начните заного или обратитесь в поддержку!')






def checkuser(userid):
  try:
    f = open('C:\\Python\\users.txt', 'r')
    fileread = f.read()
    f.close

    users = fileread.split(';')

    for number in range(len(users)):
      user = users[number].split('=')
      if(str(userid) == str(user[0])):
        return user[1]

  except Exception as e:
    print('Ошибка ' + str(e) + ' newuser, пожалуйста начните заного или обратитесь в поддержку!')






def editbal(newbal, userid):
  try:
    f = open('C:\\Python\\users.txt', 'r')
    fileread = f.read()
    f.close

    res=''

    users = fileread.split(';')

    for number in range(len(users)):
      user = users[number].split('=')
      if(str(userid) == str(user[0])):
        user[1] = newbal
        users[number] = str(user[0]) + '=' + str(user[1])
      res = res + users[number] + ';'
      
    sim = list(res)
    countsim = len(sim)
    newres = ''
    
    for q in range(len(sim)):
        if(q == countsim - 1):
            time.sleep(1)
        else:
            newres = newres + sim[q]       
    
    w = open('C:\\Python\\users.txt', 'w')
    w.write(newres)
    w.close    

  except Exception as e:
    print('Ошибка ' + str(e) + ' newuser, пожалуйста начните заного или обратитесь в поддержку!')	





def qiwi(api_access_token, my_login, account, userid):
	s = requests.Session()
	s.headers['authorization'] = 'Bearer ' + api_access_token  
	parameters = {'rows': '50'}
	h = s.get('https://edge.qiwi.com/payment-history/v1/persons/'+my_login+'/payments', params = parameters)
	data = json.loads(h.text)
	for i in range(len(data['data'])):
		if(str(data['data'][i]['type']) == 'IN'):
			if(str(data['data'][i]['account']) == account):
				used = usedpay()
				usedarr = used.split(';')
				count = 0

				for x in range(len(usedarr)):
					if(str(usedarr[x]) == str(data['data'][i]['txnId'])):
						count = 1

				if(count == 0):
					balance = checkuser(userid)
					editbal((int(balance) + int(data['data'][i]['sum']['amount'])), userid)
					usedpayadd(data['data'][i]['txnId'])
					message('На ваш баланс было зачислено: ' + str(data['data'][i]['sum']['amount']) + 'руб.;None', Exit, userid)

	message('Ваш баланс: '+ checkuser(userid) +'руб.(Если зачислений не произошло, то в последнее время платежей не было!);None', Paykeyboard, userid)				





def newmessage(text, userid):
  #try:
    if(text == 'Подтвердить оплату!'):
      message('Укажите ваш логин в QIWI(с +7 (пример:+79999999999)) для подтверждения оплаты!;None', Exit, userid)
    elif(text == 'Начать'):
      message('Бот разденет твою однокласницу в купальнике! \n\nПросто напишите "Раздеть";None', Razdet, userid)
      newuser(userid)
    elif(text == 'Раздеть' or text == 'Выйти'):
      newuser(userid)
      message('Отправь мне фото и я раздену ее)\n\nСтоимость раздевания - 24руб.\nБезлимит - 120руб.\nЗамена лиц в порно - 50руб.;photo-185719632_457239510', Razdet, userid)
    elif(text == 'Пополнить'):
      newuser(userid)
      message('Пополни баланс через Qiwi: https://qiwi.me/sexyskhola-bezlimit2\n\nСтоимость раздевания - 24руб.\nБезлмит - 300руб.\nЗамена лиц в порно - 50руб.;None', Paykeyboard, userid)  
    elif(text == 'Баланс'):
      newuser(userid)
      message('Ваш баланс: '+ checkuser(userid) +'руб.;None', Pay, userid)
    elif(text == 'Раздeть'):
      if(int(checkuser(userid)) >= 19):
        message('Отправь мне фото и я раздену ее)\n\nСтоимость раздевания - 24руб.;photo-185719632_457239510', Exit, userid)
      else:
        message('Недостаточно средств\n\nСтоимость раздевания - 24руб.\n Пополнить - https://qiwi.me/sexyskhola-razdety;photo-185719632_457239510', Pay, userid)
    elif(text == 'Безлимит'):
      if(int(checkuser(userid)) >= 120):
        message('В разработке...;None', Exit, userid)
      else:
        message('Недостаточно средств\n\nСтоимость безлимита - 120руб.\n Пополнить - https://qiwi.me/sexyskhola-bezlimit1;None', Pay, userid)  
    elif(text == 'Замена лиц в порно'):
      if(int(checkuser(userid)) >= 50):
        message('В разработке...;None', Exit, userid)
      else:
        message('Недостаточно средств\n\nСтоимость раздевания - 50руб.\n Пополнить - https://qiwi.me/sexyckhola_face_pron;None', Pay, userid)    
    else:
      if((len(text) == 11) or (len(text) == 12)):
      	newuser(userid)
      	qiwi(token_qiwi,login_qiwi,text,userid) 

  #except Exception as e:
  #  print('Ошибка: ' + str(e))    





def checkphoto(arg):
  try:
    if(arg['attach1_type'] == 'photo'):
      return 'true'
  except Exception as e:
    return 'false'



vk_session = vk_api.VkApi(token='8c546de0819da95731ebe881113cc7d9f20f4acc1f7ce479ac79fca3638495e8aec5000693015ddd70035')
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.utils import get_random_id
longpoll = VkLongPoll(vk_session)
vk = vk_session.get_api()
try:
  for event in longpoll.listen():
    try:
      if event.type == VkEventType.MESSAGE_NEW and event.to_me:
        if(checkphoto(event.attachments) == 'false'):
          newmessage(event.text, event.user_id)
        else:
          if(int(checkuser(event.user_id)) >= 24):
              e = vk.messages.getHistoryAttachments(peer_id=event.user_id, media_type="photo", count=1, v=5.101)
              editbal(int(checkuser(event.user_id))-24, event.user_id)

              for i in range(len(e['items'][0]['attachment']['photo']['sizes'])):
                  if(e['items'][0]['attachment']['photo']['sizes'][i]['type'] == 'z'):
                      url = e['items'][0]['attachment']['photo']['sizes'][i]['url']

                      millis = int(round(time.time() * 1000))
                      urllib.request.urlretrieve(url, "C:\\Python\\images\\start\\" + str(event.user_id) + "_" + str(millis) + ".jpg")
                      wait(str(event.user_id) + "_" + str(millis) + ".jpg", event.user_id)
                      message('Ваше фото успешно загружено и добавлено в очередь!;None', Exit, event.user_id)
          else:
            message('Недостаточно средств: ' + str(checkuser(event.user_id)) + ', пополните баланс!;None', Start, event.user_id)

    except Exception as e:
      print(e)   

except Exception as e:
      vk()  


def vk():
  try:
    for event in longpoll.listen():
      if event.type == VkEventType.MESSAGE_NEW and event.to_me:
        if(checkphoto(event.attachments) == 'false'):
          newmessage(event.text, event.user_id)
        else:
          if(int(checkuser(event.user_id)) >= 24):
              e = vk.messages.getHistoryAttachments(peer_id=event.user_id, media_type="photo", count=1, v=5.101)
              editbal(int(checkuser(event.user_id))-24, event.user_id)

              for i in range(len(e['items'][0]['attachment']['photo']['sizes'])):
                  if(e['items'][0]['attachment']['photo']['sizes'][i]['type'] == 'z'):
                      url = e['items'][0]['attachment']['photo']['sizes'][i]['url']

                      millis = int(round(time.time() * 1000))
                      urllib.request.urlretrieve(url, "C:\\Python\\images\\start\\" + str(event.user_id) + "_" + str(millis) + ".jpg")
                      wait(str(event.user_id) + "_" + str(millis) + ".jpg", event.user_id)
                      message('Ваше фото успешно загружено и добавлено в очередь!;None', Exit, event.user_id)
          else:
              message('Недостаточно средств: ' + str(checkuser(event.user_id)) + ', пополните баланс!;None', Start, event.user_id)

  except Exception as e:
    vk()


