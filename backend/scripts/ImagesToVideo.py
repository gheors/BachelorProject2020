import os
import sys
# script that build a video from images
# -r specifies how many frames per seconds  
class ImagesToVideo():
    def __init__(self, inputPath, outputPath, outputName):
        os.chdir(inputPath)
        os.system(' ffmpeg -r 10 -f image2 -s 1920x1080 -i %04d.jpg -vcodec libx264 -crf 25  -pix_fmt yuv420p ' + outputPath + outputName+'.mp4')

# ImagesToVideo(sys.argv[1],sys.argv[2])
ImagesToVideo("media/frames/test/", "../../", "shrekIMGStoVIDEO_test")
