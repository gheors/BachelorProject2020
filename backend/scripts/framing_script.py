import os
import cv2
import matplotlib.pyplot as plt
import sys

# arg 1 = videopath
# arg 2 = framerate
# arg 3 = outputpath

class Fragm():
    def __init__(self, video_path, frameRate, output_path):
        self.video_path = video_path
        self.frameRate = float(frameRate)
        self.output_path = output_path
        self.start_fragmentation()

    def start_fragmentation(self):
        if not (os.path.isdir(self.output_path)):
            os.mkdir(self.output_path)
            
        self.count = 1
        self.sec = 0

        vidcap = cv2.VideoCapture(self.video_path)
        success = True
        while success:
            success = self.getFrame(vidcap, self.count, self.output_path)
            self.count = self.count + 1
            self.sec = self.sec + self.frameRate
            self.sec = round(self.sec, 2)



    def getFrame(self, vidcap, count, output_path):
        vidcap.set(cv2.CAP_PROP_POS_MSEC, self.sec*1000)
        hasFrames, image = vidcap.read()
        if hasFrames:
            count = str(count)
#             count = count.zfill(4)
            filename = count + ".jpg"
            cv2.imwrite(output_path + '/' + filename, image)
        return hasFrames


Fragm(video_path=sys.argv[1], frameRate=sys.argv[2], output_path=sys.argv[3])
