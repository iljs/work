import requests
import pyautogui
import time
import os
import clipboard
import vk_api
import urllib.request

vk_session = vk_api.VkApi(token='8c546de0819da95731ebe881113cc7d9f20f4acc1f7ce479ac79fca3638495e8aec5000693015ddd70035')
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.utils import get_random_id
longpoll = VkLongPoll(vk_session)
vk = vk_session.get_api()

def copy(text):
    command = 'echo | set /p nul=' + text.strip() + '| clip'
    os.system(command)
 
def clicker(image):
	time.sleep(2)
	pyautogui.moveTo(664, 923)
	pyautogui.click()

	time.sleep(5)
	pyautogui.moveTo(353, 48)
	pyautogui.click()

	time.sleep(2)
	copy('C:\\Python\\images\\start')
	pyautogui.hotkey('ctrl', 'v')
	pyautogui.hotkey('enter')

	time.sleep(2)
	pyautogui.moveTo(310, 451)
	pyautogui.click()

	time.sleep(2)
	copy(image)
	pyautogui.hotkey('ctrl', 'v')
	pyautogui.hotkey('enter')

	time.sleep(2)
	pyautogui.moveTo(648, 921)
	pyautogui.click()

	time.sleep(60)
	pyautogui.moveTo(657, 919)
	pyautogui.click()

	time.sleep(5)
	pyautogui.moveTo(655, 502)
	pyautogui.click(button='right')

	time.sleep(2)
	pyautogui.moveTo(721, 509)
	pyautogui.click()

	time.sleep(5)
	pyautogui.moveTo(353, 48)
	pyautogui.click()

	time.sleep(2)
	copy('C:\\inetpub\\wwwroot\\images')
	pyautogui.hotkey('ctrl', 'v')
	pyautogui.hotkey('enter')

	time.sleep(2)
	pyautogui.moveTo(310, 411)
	pyautogui.click()

	time.sleep(2)
	copy(image)
	pyautogui.hotkey('ctrl', 'v')
	pyautogui.hotkey('enter')

	time.sleep(2)
	pyautogui.moveTo(653, 47)
	pyautogui.click()

	time.sleep(2)
	pyautogui.hotkey('ctrl', 'c')
	pyautogui.typewrite('http://deepnude.to')
	pyautogui.hotkey('enter')

	text = clipboard.paste()

	userid = image.split('_')


	vk.messages.send( #Отправляем сообщение
        user_id=userid[0],
        random_id=get_random_id(),
        message='Ваше фото готово: http://45.8.228.112/photo.html#http://45.8.228.112/images/' + str(image) + ".jpg"
        )





while True:
	try:
		f = open('C:\\Python\\wait.txt', 'r')
		fileread = f.read()
		f.close()
		l = len(fileread)
		if(l == 3):
			time.sleep(5)
		else:
			arg = fileread.split(';')
			d = arg[2].split('.')
			clicker(d[0])



			f2 = open('C:\\Python\\wait.txt', 'r')
			fileread2 = f2.read()
			f2.close()
			arg2 = fileread2.split(';')
			print(fileread2)

			res = '1;1'

			for i in range(len(arg2)):
				print(arg2[i])
				if((arg2[i] == arg2[0]) or (arg2[i] == arg2[1]) or (arg2[i] == arg2[2])):
					time.sleep(1)
				else:
					res = res + ';' + arg2[i]
					print(arg2[i])

			print(res)	

			w = open('C:\\Python\\wait.txt', 'w')	
			w.write(res)
			w.close()

			time.sleep(5)
	
	except Exception as e:
		time.sleep(2)




			

