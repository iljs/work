import requests
import json
import time
import datetime

token_qiwi = '1eef43c71d666137ba96fb878121ac37' # токен можно получить здесь https://qiwi.com/api
login_qiwi = '+79258228930' # номер QIWI Кошелька в формате +79991112233

# Перевод на QIWI Кошелек
def send(my_login,api_access_token,to_qw,comment,sum_p2p):
    s = requests.Session()
    s.headers = {'content-type': 'application/json'}
    s.headers['authorization'] = 'Bearer ' + api_access_token
    s.headers['User-Agent'] = 'Android v3.2.0 MKT'
    s.headers['Accept']= 'application/json'
    postjson = json.loads('{"id":"","sum":{"amount":"","currency":""},"paymentMethod":{"type":"Account","accountId":"643"},"comment":"'+comment+'","fields":{"account":""}}')
    postjson['id']=str(int(time.time() * 1000))
    postjson['sum']['amount']=sum_p2p
    postjson['sum']['currency']='643'
    postjson['fields']['account']=to_qw
    res = s.post('https://edge.qiwi.com/sinap/api/v2/terms/99/payments',json=postjson)
    print(res)
    return json.loads(res.text)

def balance(login, api_access_token):
    s = requests.Session()
    s.headers['Accept']= 'application/json'
    s.headers['authorization'] = 'Bearer ' + api_access_token  
    b = s.get('https://edge.qiwi.com/funding-sources/v2/persons/' + login + '/accounts')
    return json.loads(b.text)





while True:
    time.sleep(30)
    d = datetime.datetime(2019, 12, 31, 6, 00, 00)
    now = datetime.datetime.now()
    if(d.hour == now.hour):
        if(d.minute == now.minute):
            bal = balance(login_qiwi, token_qiwi)
            real = int(bal['accounts'][0]['balance']['amount'])

            if(real > 5):

                my = round(real/100*70) - 1
                sergey = round(real/100*30) - 1
                #savka = round(real/100*0) - 1

                send(login_qiwi, token_qiwi, '+79169997652', 'Donat', my)
                #send(login_qiwi, token_qiwi, '+79269319584', 'Donat', savka)
                send(login_qiwi, token_qiwi, '+79166612944', 'Donat', sergey)
        