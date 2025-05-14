import os
import eel
import sqlite3
import time
import webbrowser
import socket
import sys
import random
import wolframalpha
from bs4 import BeautifulSoup
import requests
from goose3 import Goose
from googlesearch import search
from typing import Union, Optional
import yt_dlp
import vlc
import time
import pyttsx3
import threading
from flask import jsonify

engine = pyttsx3.init()
stop_signal = False


wolframalpha_app_id = "93R9HQ-5LXXHQR9HY"
class YouTubePlayer:
    def __init__(self, url):
        self.url = url.replace("\\u0026", "&")
        self.instance = vlc.Instance()
        self.player = self.instance.media_player_new()
        
        # Get the direct audio URL and title
        self.audio_url, self.title = self.get_audio_url()
        if not self.audio_url:
            print("Error: Could not retrieve audio URL.")
            return

        # Load and play the audio
        media = self.instance.media_new(self.audio_url)
        self.player.set_media(media)
        self.is_paused = False

        print(f"🎵 Now Playing: {self.title}")

    def get_audio_url(self):
        ydl_opts = {'format': 'bestaudio'}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(self.url, download=False)
                return info['url'], info.get('title', 'Unknown Title')  # Get title
            except Exception as e:
                print(f"Error: {e}")
                return None, 'Unknown Title'

    def play(self):
        print(f"▶️ Playing: {self.title}")
        self.player.play()
        self.is_paused = False

    def pause(self):
        if self.player.is_playing():
            self.player.pause()
            self.is_paused = True
            print("⏸️ Paused")
        elif self.is_paused:
            self.player.play()
            self.is_paused = False
            print(f"▶️ Resumed: {self.title}")

    def stop(self):
        self.player.stop()
        print(f"⏹️ Stopped: {self.title}")

def speak_text(text):
    global stop_signal
    stop_signal = False  # Reset stop signal before speaking
    words = text.split()  # Split text into words

    for word in words:
        if stop_signal:  # Stop speaking if the flag is set
            break
        engine.say(word)
        engine.runAndWait()


def speak(data):
    print(data)
    engine = pyttsx3.init()
    engine.say(data)
    engine.runAndWait()

def get_first_bing_result(query):
    search_url = f"https://www.bing.com/search?q={query.replace(' ', '+')}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        first_result = soup.find("li", {"class": "b_algo"}).find("a")["href"]
        return first_result if first_result else "No results found."

    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

def youtube(topic: str, use_api: bool = False, open_video: bool = True) -> Union[str, None]:
        if use_api:
            response = requests.get(
                f"https://pywhatkit.herokuapp.com/playonyt?topic={topic}")
            if open_video:
                data = response.content.decode('ascii')
            return response.content.decode('ascii')
        else:
            url = 'https://www.youtube.com/results?q=' + topic
            count = 0
            cont = requests.get(url)
            data = cont.content
            data = str(data)
            lst = data.split('"')
            for i in lst:
                count += 1
                if i == 'WEB_PAGE_TYPE_WATCH':
                    break
            if lst[count - 5] == "/results":
                raise Exception("No video found.")
            if open_video:
                data = "https://www.youtube.com" + lst[count - 5]
            return "https://www.youtube.com" + lst[count - 5]
        
def internet_data(command):
        try:
            
            url = get_first_bing_result(command)
            print(url)
            article = g.extract(url=url)
            answer = article.cleaned_text
            answer = answer.replace("• None ","• ")
            if "Something went wrong" in answer:
                g = Goose()
                url = 'https://www.google.com/search?q='+command
                article = g.extract(url=url)
                answer = article.cleaned_text
                answer = answer.replace("• None ","• ")
                return answer
            elif len(answer) <= 200:
                g = Goose()
                url = 'https://www.google.com/search?q='+command
                article = g.extract(url=url)
                answer = article.cleaned_text
                answer = answer.replace("• None ","• ")
                return answer
            else:
                return answer
        except:
            try:
                g = Goose()
                url = 'https://www.bing.com/search?q='+command
                article = g.extract(url=url)
                answer = article.cleaned_text
                answer = answer.replace("• None ","• ")
                return answer
            except:
                return "Data Not Found"
            
# Initialize Eel
eel.init('Speech_Server')
wolframalpha_client = wolframalpha.Client(wolframalpha_app_id)

@eel.expose
def say_hello_py(speech_data):
    global player  # Ensure 'player' is accessible across function calls

    if "play" in speech_data:
        speak("Playing")

        # Stop the previous song before playing the next one
        if 'player' in globals() and player is not None:
            player.stop()

        # Get the new song URL
        url = youtube(speech_data)

        # Create a new player instance and start playing
        player = YouTubePlayer(url)
        player.play()

        # Speak and display the song title
        if player.title:
            print(f"🎶 Now Playing: {player.title}")
            speak(f"Now playing {player.title}")

    elif "stop" in speech_data:
        if 'player' in globals() and player is not None:
            player.stop()

    elif "pause" in speech_data or "hold on" in speech_data:
        if 'player' in globals() and player is not None:
            player.pause()

    elif "continue" in speech_data:
        if 'player' in globals() and player is not None:
            player.play()


    else:
        
        try:
            speech_data = speech_data.strip().lower()
            print(f"Received Speech: {speech_data}")
            try:
                client = wolframalpha.Client(wolframalpha_app_id) 
                res = client.query(speech_data) 
                results = next(res.results).text
                speak(results)
            except:
                URL = 'https://www.google.com/search?q=' + speech_data
                page = requests.get(URL)
                try:
                    soup = BeautifulSoup(page.content, 'html.parser')
                except:
                    with io.open(fname, "w", encoding="utf-8") as f:
                        (page.content, 'html.parser')
                links = soup.find_all("a")
                all_links = []
                for link in links:
                    link_href = link.get('href')
                    if "url?q=" in link_href and not "webcache" in link_href:
                        all_links.append((link.get('href').split("?q=")[1].split("&sa=U")[0]))
                flag= False
                for link in all_links:
                    if 'https://en.wikipedia.org/wiki/' in link:
                        wiki = link
                        flag = True
                        break
                div1 = soup.find_all("div", class_="Ap5OSd")
                div2 = soup.find_all("div", class_="nGphre")
                div3 = soup.find_all("div", class_="quora")
                div4 = soup.find_all("div", class_="BNeawe s3v9rd AP7Wnd")
                if len(div1) != 0:
                    answer = div1[0].text+"\n"+div1[0].find_next_sibling("div").text
                elif len(div2) != 0:
                    answer = div2[0].find_next("span").text+"\n"+div2[0].find_next("div",class_="kCrYT").text
                elif len(div3) != 0:
                    answer = div3[0].find_next("span").text+"\n"+div3[0].find_next("div",class_="stylelistrow").text
                elif len(div4) != 0:
                    answer = div4[0].find_next("span").text+"\n"+div4[0].find_next("div").text               
                else:
                    speak("Searching please wait")
                    answer = internet_data(speech_data)
                speak(answer)
                
        except Exception as e:
            print(f"Error processing speech: {e}")



try:
    eel.start("index.html", size=(600, 450))
except Exception as e:
    print(f"Eel failed to start: {e}")
