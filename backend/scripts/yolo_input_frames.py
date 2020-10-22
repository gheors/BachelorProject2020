import os
import natsort


class YoloInputOutput():
    def __init__(self, inputDir,outputDir):
        self.inputDir = inputDir

        outputDir = outputDir
        if not (os.path.isdir(outputDir)):
            os.mkdir(outputDir)

        # total number  of predictions
        counter = 1 + len(os.listdir(outputDir))

        # change current position to darknet directory
        os.chdir('../darknet')

        # take frames'directory and sort it
        frames_list = os.listdir(self.inputDir)
        frames_list = natsort.natsorted(frames_list, reverse=False)

        for image in frames_list:
            number = str(counter)
            number = number.zfill(4)
            os.system(
                "./darknet detect cfg/yolov4.cfg yolov4.weights " + inputDir + '/' + image)
            img_predicted = 'prediction' + number + '.jpg'

            if os.path.isfile('predictions.jpg'):
                os.rename('predictions.jpg', img_predicted)

                os.system('mv ' + img_predicted + ' ' + outputDir)
                counter += 1


YoloInputOutput("../scripts/media/frames/test",'../scripts/media/predictions/test')
