from pydub import AudioSegment
AudioSegment.converter = "C:\\ffmpeg\\bin\\ffmpeg.exe"
AudioSegment.ffmpeg = "C:\\ffmpeg\\bin\\ffmpeg.exe"
AudioSegment.ffprobe = "C:\\ffmpeg\\bin\\ffprobe.exe"


import argparse

parser = argparse.ArgumentParser(description='Описание программы')
parser.add_argument('my_array', nargs=7, type=int, help='Массив из 7 элементов')

parser.add_argument('my_array2', nargs=2, type=int, help='Массив из 2 элементов')

parser.add_argument('my_array3', nargs=1, type=str, help='тип аудио')


args1 = parser.parse_args().my_array
args2 = parser.parse_args().my_array2
args3 = parser.parse_args().my_array3

print(args1)
print(args2)
print(args3)


def match_target_dBFS(sound, target_dBFS):
    dBFS = target_dBFS - sound.dBFS
    return sound.apply_gain(dBFS)

equalizer = [100, 500, 3000, 5000, 7500, 10000]
# data =      [0,  5,  0,   0,    -50 ,  -50,  -50]

data = args1

file_path = "./python/sound.mp3"
sound = AudioSegment.from_file(file_path, format="mp3")

filter_1 = sound.low_pass_filter(equalizer[0]).high_pass_filter(10)
filter_2 = sound.low_pass_filter(equalizer[1]).high_pass_filter(equalizer[0])
filter_3 = sound.low_pass_filter(equalizer[2]).high_pass_filter(equalizer[1])
filter_4 = sound.low_pass_filter(equalizer[3]).high_pass_filter(equalizer[2])
filter_5 = sound.low_pass_filter(equalizer[4]).high_pass_filter(equalizer[3])
filter_6 = sound.low_pass_filter(equalizer[5]).high_pass_filter(equalizer[4])
filter_7 = sound.high_pass_filter(equalizer[5]).low_pass_filter(16000)

dBFS_before_1 = filter_1.dBFS
dBFS_before_2 = filter_2.dBFS
dBFS_before_3 = filter_3.dBFS
dBFS_before_4 = filter_4.dBFS
dBFS_before_5 = filter_5.dBFS
dBFS_before_6 = filter_6.dBFS
dBFS_before_7 = filter_7.dBFS

filter_1 = match_target_dBFS(filter_1, dBFS_before_1 + data[0])
filter_2 = match_target_dBFS(filter_2, dBFS_before_2 + data[1])
filter_3 = match_target_dBFS(filter_3, dBFS_before_3 + data[2])
filter_4 = match_target_dBFS(filter_4, dBFS_before_4 + data[3])
filter_5 = match_target_dBFS(filter_5, dBFS_before_5 + data[4])
filter_6 = match_target_dBFS(filter_6, dBFS_before_6 + data[5])
filter_7 = match_target_dBFS(filter_7, dBFS_before_7 + data[6])

# filter_1.export("filter_1.mp3", format="mp3")
# filter_2.export("filter_2.mp3", format="mp3")
# filter_3.export("filter_3.mp3", format="mp3")
# filter_4.export("filter_4.mp3", format="mp3")
# filter_5.export("filter_5.mp3", format="mp3")
# filter_6.export("filter_6.mp3", format="mp3")
# filter_7.export("filter_7.mp3", format="mp3")

result = filter_1.overlay(filter_2, 0)
result = result.overlay(filter_3, 0)
result = result.overlay(filter_4, 0)
result = result.overlay(filter_5, 0)
result = result.overlay(filter_6, 0)
result = result.overlay(filter_7, 0)


input_file = "./python/sound.mp3"
output_format = args3[0]



begin_cut = args2[0]
end_cut = args2[1]


result = result[begin_cut * 1000:-end_cut * 1000]


result.export(f"./python/result.{output_format}", format=output_format)


# Loading the Libraries
from scipy.io.wavfile import read
import numpy as np
import matplotlib.pyplot as plt

# Read the Audiofile
samplerate, data = read(f"./python/result.{output_format}")
# Frame rate for the Audio
print(samplerate)

# Duration of the audio in Seconds
duration = len(data)/samplerate
print("Duration of Audio in Seconds", duration)
print("Duration of Audio in Minutes", duration/60)

time = np.arange(0,duration,1/samplerate)

# Plotting the Graph using Matplotlib
plt.plot(time,data)
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.title('6TU5302374.wav')
plt.show()




print('success')
